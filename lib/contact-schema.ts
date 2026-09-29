import { z } from "zod";
import { contactActivityOptions } from "@/lib/data/activities";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Merci d'indiquer votre nom et prénom."),
  organization: z.string().trim().optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "Nous avons besoin de votre adresse e-mail pour vous répondre.")
    .email("Cette adresse e-mail ne semble pas valide. Vérifiez le format, par exemple nom@domaine.com."),
  phone: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine(
      (v) => v === "" || /^[+\d\s().-]{6,20}$/.test(v),
      "Ce numéro contient des caractères inattendus. Utilisez uniquement des chiffres, espaces et le signe +.",
    ),
  activity: z.enum(contactActivityOptions),
  subject: z.string().trim().min(1, "Précisez en quelques mots l'objet de votre demande."),
  message: z
    .string()
    .trim()
    .min(1, "Écrivez votre message ici.")
    .min(10, "Votre message est un peu court. Ajoutez quelques détails pour que nous puissions vous orienter."),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContact(data: ContactInput): ContactErrors {
  const result = contactSchema.safeParse(data);
  if (result.success) return {};
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
