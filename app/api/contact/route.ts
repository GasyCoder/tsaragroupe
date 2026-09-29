import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  // Intégration à brancher : envoi vers contact@tsaragroupe.com (SMTP, Resend, Brevo…)
  // en utilisant parsed.data. Aucune donnée n'est stockée par défaut.
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] message reçu", { activity: parsed.data.activity, subject: parsed.data.subject });
  }

  return NextResponse.json({ ok: true });
}
