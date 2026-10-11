import { describe, expect, it } from "vitest";
import { callbackSchema, fieldErrors, quoteSchema } from "@/lib/schemas";
import { future, validQuote } from "./fixtures";

describe("quoteSchema", () => {
  it("accepte une demande complète", () => {
    expect(quoteSchema.safeParse(validQuote()).success).toBe(true);
  });

  it("refuse une adresse e-mail invalide", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), email: "pas-un-email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).email).toBeDefined();
  });

  it("exige une date ou la case « date non fixée »", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), eventDate: "", dateUnknown: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).eventDate).toMatch(/date/i);
    expect(quoteSchema.safeParse({ ...validQuote(), eventDate: "", dateUnknown: true }).success).toBe(true);
  });

  it("refuse une date passée", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), eventDate: "2001-01-01" });
    expect(r.success).toBe(false);
  });

  it("exige le téléphone si le contact préféré est le téléphone", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), phone: "", contactPreference: "telephone" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).phone).toBeDefined();
  });

  it("exige l'acceptation de la politique de confidentialité", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), privacyAccepted: false });
    expect(r.success).toBe(false);
  });

  it("rejette le champ pot de miel rempli", () => {
    const r = quoteSchema.safeParse({ ...validQuote(), website: "http://spam.example" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).website).toBeDefined();
  });

  it("refuse une valeur hors liste", () => {
    expect(quoteSchema.safeParse({ ...validQuote(), concept: "limousine" }).success).toBe(false);
  });
});

describe("callbackSchema", () => {
  const valid = () => ({
    name: "Alex",
    phone: "+33 6 12 34 56 78",
    preferredDay: future(),
    timeSlot: "matin",
    reason: "devis",
    details: "",
    privacyAccepted: true,
    website: "",
    startedAt: Date.now() - 60_000,
  });

  it("accepte une demande valide", () => {
    expect(callbackSchema.safeParse(valid()).success).toBe(true);
  });

  it("refuse un numéro invalide", () => {
    expect(callbackSchema.safeParse({ ...valid(), phone: "12" }).success).toBe(false);
    expect(callbackSchema.safeParse({ ...valid(), phone: "abc def ghi" }).success).toBe(false);
  });

  it("refuse un jour passé", () => {
    expect(callbackSchema.safeParse({ ...valid(), preferredDay: "2001-01-01" }).success).toBe(false);
  });
});
