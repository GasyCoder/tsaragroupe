"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactActivityOptions, type ContactActivity } from "@/lib/data/activities";
import { validateContact, type ContactErrors, type ContactField, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const empty = (activity: ContactActivity): ContactInput => ({
  name: "",
  organization: "",
  email: "",
  phone: "",
  activity,
  subject: "",
  message: "",
});

const FIELD_ORDER: ContactField[] = ["name", "email", "phone", "subject", "message"];

export function ContactForm({ defaultActivity = "Tsara Groupe" }: { defaultActivity?: ContactActivity }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(() => empty(defaultActivity));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const fid = (k: ContactField) => `${uid}-${k}`;

  const update = (k: ContactField, v: string) => {
    const next = { ...values, [k]: v } as ContactInput;
    setValues(next);
    if (submitted) setErrors(validateContact(next));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(e.target.name as ContactField, e.target.value);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setSubmitted(true);
    const errs = validateContact(values);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fid(first))}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const firstName = values.name.trim().split(" ")[0];
    return (
      <div role="status" className="flex flex-col gap-3.5 rounded-xl border border-[#cfe3d0] bg-[#f1f7f1] p-9">
        <p className="flex items-center gap-2 text-eyebrow font-semibold tracking-[0.08em] text-success uppercase">
          <CheckCircle2 className="size-4" aria-hidden /> Message envoyé
        </p>
        <p className="font-heading text-[22px] leading-snug font-semibold">Merci {firstName}, votre message a bien été transmis.</p>
        <p className="text-base leading-relaxed text-muted-foreground">
          Notre équipe vous répondra à l&apos;adresse {values.email} dans les meilleurs délais.
        </p>
        <div>
          <Button
            variant="link"
            className="mt-2 underline"
            onClick={() => {
              setValues(empty(defaultActivity));
              setErrors({});
              setSubmitted(false);
              setStatus("idle");
            }}
          >
            Envoyer un autre message
          </Button>
        </div>
      </div>
    );
  }

  const field = (k: ContactField, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string } = {}) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={fid(k)}>
        {label}{" "}
        {opts.required ? <span className="text-destructive">*</span> : <span className="font-normal text-subtle-foreground">(facultatif)</span>}
      </Label>
      <Input
        id={fid(k)}
        name={k}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={(values[k] as string) ?? ""}
        onChange={onChange}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${fid(k)}-err` : undefined}
      />
      <FieldError id={`${fid(k)}-err`} message={errors[k]} />
    </div>
  );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {field("name", "Nom et prénom", { required: true, autoComplete: "name" })}
      {field("organization", "Organisation", { autoComplete: "organization" })}
      {field("email", "E-mail", { required: true, type: "email", autoComplete: "email" })}
      {field("phone", "Téléphone", { type: "tel", autoComplete: "tel", placeholder: "+261 …" })}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={fid("activity")}>Activité concernée</Label>
        <Select name="activity" value={values.activity} onValueChange={(v) => update("activity", v)}>
          <SelectTrigger id={fid("activity")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contactActivityOptions.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {field("subject", "Objet", { required: true })}

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor={fid("message")}>
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={fid("message")}
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${fid("message")}-err` : undefined}
        />
        <FieldError id={`${fid("message")}-err`} message={errors.message} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:col-span-2">
          L&apos;envoi n&apos;a pas abouti. Vérifiez votre connexion et réessayez, ou écrivez-nous directement à contact@tsaragroupe.com.
        </p>
      )}

      <div className="flex flex-wrap-reverse items-center justify-between gap-x-6 gap-y-4 border-t pt-5 sm:col-span-2">
        <p className="max-w-[360px] text-[13.5px] leading-normal text-subtle-foreground">
          * Champs obligatoires. Vos données servent uniquement à traiter votre demande.
        </p>
        <Button type="submit" size="lg" disabled={status === "loading"} aria-live="polite">
          {status === "loading" && <Loader2 className="animate-spin" aria-hidden />}
          {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
          {status !== "loading" && <Send aria-hidden />}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={cn("flex items-start gap-1.5 text-[13.5px] leading-snug text-destructive")}>
      <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
