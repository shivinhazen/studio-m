import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-zinc-200 bg-white text-zinc-900 dark:border-white/10 dark:bg-[var(--brand-black)] dark:text-zinc-50">
      <div className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-70" aria-hidden>
        <div className="absolute inset-x-0 -top-16 h-36 bg-[radial-gradient(circle_at_top,rgba(233,30,99,0.18),transparent_60%)] blur-3xl dark:bg-[radial-gradient(circle_at_top,rgba(233,30,99,0.35),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.8)_45%,rgba(255,255,255,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(13,13,14,0.05)_0%,rgba(13,13,14,0.82)_45%,rgba(13,13,14,0.98)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-white/60">
              Pronto para o próximo passo?
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-white/80">
              Guiamos identidades, produtos digitais e materiais impressos que alinham estratégia, estética e consistência em cada ponto de contato da marca.
            </p>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-white/60">
              Contato
            </p>
            <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-white/80">
              <li>
                <Link
                  href="mailto:contato@studiom.design"
                  className="transition-colors hover:text-[var(--brand-cyan)] dark:hover:text-[var(--brand-cyan)]"
                >
                  contato@studiom.design
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/5511988884455"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--brand-cyan)] dark:hover:text-[var(--brand-cyan)]"
                >
                  +55 (11) 98888-4455
                </Link>
              </li>
              <li className="text-zinc-500 dark:text-white/60">
                Rio de Janeiro • Atendimento remoto e encontros presenciais sob agendamento
              </li>
            </ul>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-white/60">
              Acompanhe
            </p>
            <div className="flex justify-center gap-3 sm:justify-start">
              <Link
                href="https://wa.me/5511988884455"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[var(--brand-cyan)] hover:text-[var(--brand-cyan)] dark:border-white/10 dark:text-white/70"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link
                href="mailto:contato@studiom.design"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[var(--brand-cyan)] hover:text-[var(--brand-cyan)] dark:border-white/10 dark:text-white/70"
              >
                <Mail className="h-4 w-4" aria-hidden />
                <span className="sr-only">E-mail</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-zinc-200 pt-3 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-white/60">
          <p>&copy; {currentYear} Studio M — Soluções Visuais.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-[var(--brand-cyan)] dark:hover:text-[var(--brand-cyan)]"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-de-uso"
              className="transition-colors hover:text-[var(--brand-cyan)] dark:hover:text-[var(--brand-cyan)]"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
