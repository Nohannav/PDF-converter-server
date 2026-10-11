import { handleFormSubmission } from "@/lib/form-handler";
import { callbackSchema } from "@/lib/schemas";
import { callbackEmailForAgency } from "@/lib/email/templates";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: callbackSchema,
    scope: "rappel",
    build: (data, config) => ({
      agency: { to: config.to, ...callbackEmailForAgency(data) },
    }),
  });
}
