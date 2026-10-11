import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as quotePOST } from "@/app/api/quote/route";
import { POST as callbackPOST } from "@/app/api/callback/route";
import { resetRateLimit } from "@/lib/antispam";
import { escapeHtml } from "@/lib/email/templates";
import { validQuote } from "./fixtures";

const ENV_KEYS = ["EMAIL_PROVIDER", "RESEND_API_KEY", "EMAIL_FROM", "CONTACT_TO_EMAIL", "SEND_CLIENT_CONFIRMATION", "SMTP_HOST", "TURNSTILE_SECRET_KEY"];

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/quote", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function configureResend() {
  process.env.EMAIL_PROVIDER = "resend";
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.EMAIL_FROM = "Site <devis@example.com>";
  process.env.CONTACT_TO_EMAIL = "agence@example.com";
}

beforeEach(() => {
  for (const k of ENV_KEYS) delete process.env[k];
  resetRateLimit();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("POST /api/quote", () => {
  it("renvoie une erreur explicite (503) si l'envoi d'e-mail n'est pas configuré — jamais de faux succès", async () => {
    const res = await quotePOST(request(validQuote()));
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.code).toBe("EMAIL_NOT_CONFIGURED");
  });

  it("valide les champs côté serveur (422 + erreurs par champ)", async () => {
    configureResend();
    const res = await quotePOST(request({ ...validQuote(), email: "faux" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.errors.email).toBeDefined();
  });

  it("refuse un envoi trop rapide (robot)", async () => {
    configureResend();
    const res = await quotePOST(request({ ...validQuote(), startedAt: Date.now() }));
    expect(res.status).toBe(400);
    expect((await res.json()).code).toBe("TOO_FAST");
  });

  it("refuse le pot de miel rempli", async () => {
    configureResend();
    const res = await quotePOST(request({ ...validQuote(), website: "spam" }));
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  it("refuse une requête d'une autre origine", async () => {
    configureResend();
    const res = await quotePOST(request(validQuote(), { origin: "https://malveillant.example" }));
    expect(res.status).toBe(403);
  });

  it("refuse un JSON invalide", async () => {
    configureResend();
    const res = await quotePOST(request("{pas du json"));
    expect(res.status).toBe(400);
  });

  it("envoie l'e-mail à l'agence via Resend et confirme seulement après acceptation", async () => {
    configureResend();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "abc" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await quotePOST(request({ ...validQuote(), message: "Projet <script>alert(1)</script> en plein air" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test_key");
    const payload = JSON.parse(init.body);
    expect(payload.to).toEqual(["agence@example.com"]);
    expect(payload.reply_to).toBe("camille@example.com");
    expect(payload.subject).toContain("Demande de devis");
    expect(payload.html).not.toContain("<script>");
    expect(payload.html).toContain("&lt;script&gt;");
  });

  it("envoie l'accusé de réception au client si activé et demandé", async () => {
    configureResend();
    process.env.SEND_CLIENT_CONFIRMATION = "true";
    const fetchMock = vi.fn().mockImplementation(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await quotePOST(request({ ...validQuote(), sendCopy: true }));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).to).toEqual(["camille@example.com"]);
  });

  it("signale l'échec si le fournisseur refuse l'envoi (502)", async () => {
    configureResend();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("invalid key", { status: 401 })));
    const res = await quotePOST(request(validQuote()));
    expect(res.status).toBe(502);
    expect((await res.json()).code).toBe("SEND_FAILED");
  });

  it("limite le nombre d'envois par IP", async () => {
    configureResend();
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response("{}", { status: 200 })));
    for (let i = 0; i < 5; i++) expect((await quotePOST(request(validQuote()))).status).toBe(200);
    const blocked = await quotePOST(request(validQuote()));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });

  it("exige un jeton Turnstile valide quand la protection est activée", async () => {
    configureResend();
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await quotePOST(request({ ...validQuote(), turnstileToken: "bad" }));
    expect(res.status).toBe(400);
    expect((await res.json()).code).toBe("CAPTCHA");
  });
});

describe("POST /api/callback", () => {
  it("transmet une demande de rappel valide", async () => {
    configureResend();
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const res = await callbackPOST(
      request({
        name: "Alex",
        phone: "06 12 34 56 78",
        preferredDay: d.toISOString().slice(0, 10),
        timeSlot: "apres-midi",
        reason: "disponibilite",
        details: "",
        privacyAccepted: true,
        website: "",
        startedAt: Date.now() - 30_000,
      }),
    );
    expect(res.status).toBe(200);
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.subject).toContain("Demande de rappel");
    expect(payload.html).toContain("pas un rendez-vous confirmé");
  });
});

describe("escapeHtml", () => {
  it("échappe les caractères HTML", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});
