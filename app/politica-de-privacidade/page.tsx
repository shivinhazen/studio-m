import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Política de Privacidade | Studio M",
  description:
    "Saiba como o Studio M coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
  alternates: {
    canonical: "https://studio-m-pearl.vercel.app/politica-de-privacidade",
  },
};

const sections = [
  {
    title: "Dados que coletamos",
    content: [
      "Informações enviadas voluntariamente pelo formulário de contato: nome, e-mail, telefone, empresa, tipo de projeto, orçamento, prazo estimado e mensagem.",
      "Dados de navegação coletados por ferramentas de analytics (quando habilitadas), como endereço IP, dispositivo e páginas acessadas. Utilizamos essas informações apenas de forma agregada para compreender o uso do site.",
    ],
  },
  {
    title: "Como utilizamos os dados",
    content: [
      "Responder às solicitações enviadas pelo site e preparar propostas comerciais.",
      "Manter um histórico interno de atendimentos e oportunidades para melhorar a qualidade do serviço.",
      "Enviar comunicações pontuais sobre novidades do Studio M, sempre com a opção de descadastrar.",
    ],
  },
  {
    title: "Compartilhamento e armazenamento",
    content: [
      "Não vendemos nem compartilhamos dados pessoais com terceiros para fins de marketing.",
      "Utilizamos provedores confiáveis para hospedagem, e-mail e analytics. Esses parceiros tratam os dados apenas conforme as nossas instruções e em conformidade com a LGPD.",
      "Os dados ficam armazenados enquanto houver relacionamento ativo ou interesse legítimo. Você pode solicitar a exclusão a qualquer momento.",
    ],
  },
  {
    title: "Seus direitos",
    content: [
      "Confirmar se realizamos o tratamento dos seus dados pessoais.",
      "Solicitar acesso, correção ou exclusão das informações armazenadas.",
      "Revogar consentimentos e limitar o uso dos dados para finalidades específicas.",
      "Registrar uma manifestação pelo e-mail contato@studiom.design para exercer qualquer um desses direitos.",
    ],
  },
  {
    title: "Proteção das informações",
    content: [
      "Adotamos boas práticas de segurança, como acesso restrito, autenticação em dois fatores e backups periódicos.",
      "Apesar dos esforços, nenhum ambiente digital é 100% livre de riscos. Em caso de incidentes, notificaremos os envolvidos conforme a legislação vigente.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <SectionTitle subtitle="Política de Privacidade">Como cuidamos dos seus dados</SectionTitle>
        <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Esta política descreve como o Studio M — Soluções Visuais coleta, utiliza e protege dados pessoais em nossos
          canais digitais. Se tiver qualquer dúvida, escreva para contato@studiom.design.
        </p>
        <p className="text-xs text-muted-foreground">Última atualização: outubro de 2025.</p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h3 className="heading-sm text-foreground">{section.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              {section.content.map((paragraph) => (
                <li key={paragraph} className="list-disc pl-5">
                  {paragraph}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h3 className="heading-sm text-foreground">Contato sobre privacidade</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Para solicitações relacionadas aos seus dados pessoais, envie uma mensagem para{" "}
          <a
            href="mailto:contato@studiom.design"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            contato@studiom.design
          </a>
          . Responderemos em até 5 dias úteis.
        </p>
      </section>
    </div>
  );
}
