'use client';

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, Paperclip, X } from "lucide-react";

import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAX_REFERENCE_FILE_SIZE } from "@/lib/constants";

const directChannels: {
  label: string;
  href: string;
  icon: LucideIcon;
  ariaLabel: string;
}[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5511988884455",
    icon: MessageCircle,
    ariaLabel: "Abrir conversa no WhatsApp",
  },
  {
    label: "E-mail",
    href: "mailto:contato@studiom.design",
    icon: Mail,
    ariaLabel: "Enviar e-mail para contato@studiom.design",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  brandMoment: string;
  collaborationGoal: string;
  references: string;
  message: string;
  websiteTrap: string;
  referenceFile: File | null;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;
type TextFieldKey = Exclude<keyof FormState, "referenceFile">;

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  brandMoment: "",
  collaborationGoal: "",
  references: "",
  message: "",
  websiteTrap: "",
  referenceFile: null,
};

export default function ContactContent() {
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>(
    {
      type: "idle",
    }
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  function updateField<T extends TextFieldKey>(field: T) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    };
  }

  function handleReferenceFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setForm((prev) => ({ ...prev, referenceFile: null }));
      setErrors((prev) => {
        if (!prev.referenceFile) return prev;
        const updated = { ...prev };
        delete updated.referenceFile;
        return updated;
      });
      return;
    }

    if (file.size > MAX_REFERENCE_FILE_SIZE) {
      setForm((prev) => ({ ...prev, referenceFile: null }));
      setErrors((prev) => ({
        ...prev,
        referenceFile: "O arquivo deve ter no máximo 20 MB.",
      }));
      event.target.value = "";
      return;
    }

    setForm((prev) => ({ ...prev, referenceFile: file }));
    setErrors((prev) => {
      if (!prev.referenceFile) return prev;
      const updated = { ...prev };
      delete updated.referenceFile;
      return updated;
    });
  }

  function clearReferenceFile() {
    setForm((prev) => ({ ...prev, referenceFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors((prev) => {
      if (!prev.referenceFile) return prev;
      const updated = { ...prev };
      delete updated.referenceFile;
      return updated;
    });
  }

  function validate(values: FormState) {
    const nextErrors: FieldErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Informe um e-mail para contato.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Formato de e-mail inválido.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatus({
        type: "error",
        message: "Revise os campos destacados para concluir o envio.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Enviando mensagem..." });

    try {
      const submission = new FormData();
      const { referenceFile, ...textValues } = form;

      Object.entries(textValues).forEach(([key, value]) => {
        submission.append(key, value ?? "");
      });

      if (referenceFile) {
        submission.append("referenceFile", referenceFile, referenceFile.name);
      }

      const response = await fetch("/api/contato", {
        method: "POST",
        body: submission,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, ...(result.errors ?? {}) }));
        setStatus({
          type: "error",
          message: result.message ?? "Não foi possível concluir o envio. Tente novamente em instantes.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: result.message ?? "Mensagem enviada com sucesso. Em breve entraremos em contato.",
      });
      setErrors({});
      setForm({ ...initialForm });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Não foi possível concluir o envio. Tente novamente em instantes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <SectionTitle subtitle="Contato">Vamos conversar?</SectionTitle>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
          Toda marca tem algo essencial a ser revelado. Nosso trabalho começa ouvindo com atenção o que precisa nascer, ser refinado ou ganhar corpo visual. Conte o momento da sua marca, onde deseja chegar e o que não pode faltar — quanto mais clareza no início, mais direção ao longo do caminho.
        </p>
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <form
          className="space-y-5 rounded-3xl border border-neutral-200 bg-[#FAFAFA] p-8 shadow-[0_22px_60px_-48px_rgba(15,23,42,0.45)] transition-colors sm:p-10 dark:border-white/12 dark:bg-neutral-950"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Nome completo"
              id="name"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={updateField("name")}
              error={errors.name}
              autoComplete="name"
              required
            />
            <Field
              label="E-mail profissional"
              id="email"
              type="email"
              placeholder="voce@empresa.com"
              value={form.email}
              onChange={updateField("email")}
              error={errors.email}
              autoComplete="email"
              required
            />
            <Field
              label="Telefone ou WhatsApp"
              id="phone"
              type="tel"
              placeholder="+55 (11) 98888-4455"
              value={form.phone}
              onChange={updateField("phone")}
              autoComplete="tel"
            />
            <Field
              label="Nome da marca ou organização"
              id="company"
              placeholder="Ex: Estúdio Aurora, Lúmina Cursos, etc."
              value={form.company}
              onChange={updateField("company")}
              autoComplete="organization"
            />
          </fieldset>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Qual o momento da sua marca?"
              id="brandMoment"
              placeholder="Início, reposicionamento, crescimento..."
              value={form.brandMoment}
              onChange={updateField("brandMoment")}
            />
            <Field
              label="O que você gostaria de criar com a gente?"
              id="collaborationGoal"
              placeholder="Identidade visual, site, sistema, materiais..."
              value={form.collaborationGoal}
              onChange={updateField("collaborationGoal")}
            />
          </fieldset>
          <div className="relative">
            <Field
              label="Já existe alguma referência ou material em andamento?"
              id="references"
              as="textarea"
              placeholder="Pode nos contar se já existe algo construído"
              value={form.references}
              onChange={updateField("references")}
              error={errors.references}
              inputClassName="pr-16"
            />
            <input
              ref={fileInputRef}
              id="referenceFile"
              name="referenceFile"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.svg,.zip,.ai,.psd,.fig"
              className="sr-only"
              onChange={handleReferenceFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="peer absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-[#999] transition hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:text-neutral-400 dark:hover:text-neutral-100"
              aria-label="Anexar referência visual (opcional) — até 20 MB"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="pointer-events-none absolute bottom-14 right-0 z-10 w-60 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 opacity-0 shadow-lg transition-opacity duration-200 peer-hover:opacity-100 peer-focus-visible:opacity-100 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100">
              Anexar referência visual (opcional) — até 20 MB
            </div>
            {form.referenceFile ? (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-white/80 px-3 py-2 text-xs text-muted-foreground dark:border-white/20 dark:bg-white/5">
                <span className="truncate">
                  {form.referenceFile.name} ({(form.referenceFile.size / (1024 * 1024)).toFixed(1)} MB)
                </span>
                <button
                  type="button"
                  onClick={clearReferenceFile}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-neutral-200 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:hover:bg-white/10 dark:hover:text-neutral-50"
                  aria-label="Remover arquivo anexado"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null}
            {errors.referenceFile ? (
              <p className="mt-2 text-xs font-medium text-destructive">{errors.referenceFile}</p>
            ) : null}
          </div>
          <Field
            label="Algo mais que devemos saber?"
            id="message"
            as="textarea"
            placeholder="Público-alvo, expectativas, restrições, etc."
            value={form.message}
            onChange={updateField("message")}
            error={errors.message}
            inputClassName="min-h-[110px]"
          />
          <div className="sr-only" aria-hidden>
            <label htmlFor="websiteTrap">
              Não preencha este campo
              <input
                id="websiteTrap"
                name="websiteTrap"
                tabIndex={-1}
                autoComplete="off"
                value={form.websiteTrap}
                onChange={(event) => updateField("websiteTrap")(event.target.value)}
              />
            </label>
          </div>
          {status.type !== "idle" && status.message ? (
            <p
              role="status"
              aria-live={status.type === "error" ? "assertive" : "polite"}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm leading-relaxed",
                status.type === "success"
                  ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200"
                  : status.type === "loading"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-destructive/50 bg-destructive/10 text-destructive"
              )}
            >
              {status.message}
            </p>
          ) : null}
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Suas informações serão utilizadas apenas para responder à sua solicitação, conforme nossa Política de Privacidade.
            <br />
            Não há compromisso financeiro ao preencher esse formulário — apenas o início de uma boa conversa.
          </p>
        </form>

        <section className="rounded-2xl border border-neutral-200 bg-[#F6F6F6] p-5 shadow-[0_16px_52px_-44px_rgba(15,23,42,0.35)] transition-colors dark:border-white/10 dark:bg-neutral-950/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Canais diretos
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Preferiu algo imediato? Estamos a um clique — escolha o canal ao lado e seguimos a conversa.
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              {directChannels.map((channel) => {
                const Icon = channel.icon;
                const isExternal = channel.href.startsWith("http");
                const baseClasses =
                  "flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white/90 text-neutral-500 transition hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/15 dark:bg-white/10 dark:text-neutral-300 dark:hover:border-white/25 dark:hover:text-neutral-100";

                const content = <Icon className="h-5 w-5" aria-hidden />;

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    aria-label={channel.ariaLabel}
                    className={baseClasses}
                    title={channel.ariaLabel}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  id: TextFieldKey;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  inputClassName?: string;
};

function Field({
  label,
  id,
  placeholder,
  type = "text",
  as = "input",
  value,
  onChange,
  error,
  autoComplete,
  required,
  inputClassName,
}: FieldProps) {
  const InputComponent = as === "textarea" ? "textarea" : "input";
  const shouldApplyDefaultTextareaHeight = as === "textarea" && !(inputClassName?.includes("min-h"));
  const errorId = error ? `${id}-error` : undefined;

  return (
    <label className="flex flex-col gap-2 text-xs font-medium text-muted-foreground" htmlFor={id}>
      {label}
      <InputComponent
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
        className={cn(
          "rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm text-foreground shadow-[0_12px_28px_-24px_rgba(15,23,42,0.4)] transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:placeholder:text-neutral-400",
          error && "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20",
          shouldApplyDefaultTextareaHeight && "min-h-[140px]",
          inputClassName
        )}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        type={as === "textarea" ? undefined : type}
      />
      {error ? (
        <span id={errorId} className="text-xs font-normal text-destructive">
          {error}
        </span>
      ) : null}
    </label>
  );
}
