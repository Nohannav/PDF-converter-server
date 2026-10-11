import { handleFormSubmission } from "@/lib/form-handler";
import { quoteSchema } from "@/lib/schemas";
import { quoteEmailForAgency, quoteEmailForClient } from "@/lib/email/templates";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: quoteSchema,
    scope: "devis",
    build: (data, config) => ({
      agency: { to: config.to, replyTo: data.email, ...quoteEmailForAgency(data) },
      client:
        config.sendClientConfirmation && data.sendCopy
          ? { to: [data.email], ...quoteEmailForClient(data) }
          : undefined,
    }),
  });
}
