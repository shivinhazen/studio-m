import { SectionTitle } from "@/components/section-title";

const services = [
  {
    title: "Branding & Identidade",
    description:
      "Criamos sistemas de identidade visual sólidos, elegantes e duradouros — capazes de sustentar sua marca em qualquer contexto, do impresso ao digital.",
    deliverables: [
      "Plataforma de marca (valores, tom, diferenciais)",
      "Naming e narrativa verbal",
      "Logotipo e sistema visual completo",
      "Diretrizes para materiais impressos, digitais e aplicações vivas",
    ],
    accent: "from-[var(--brand-cyan)]/30 via-[var(--brand-magenta)]/20 to-transparent",
  },
  {
    title: "Experiências Digitais Completas",
    description:
      "Desenvolvemos experiências digitais completas, com design autoral e implementação técnica — de sites institucionais a plataformas e apps.",
    deliverables: [
      "Arquitetura da informação, fluxos e UX",
      "Design responsivo com foco em usabilidade e direção visual",
      "Desenvolvimento front-end e back-end (web, apps e plataformas)",
      "Integrações, sistemas de conteúdo, testes e deploy",
      "Acompanhamento técnico e atualizações evolutivas",
    ],
    accent: "from-[var(--brand-magenta)]/30 via-[var(--brand-yellow)]/20 to-transparent",
  },
  {
    title: "Produção Gráfica & Impressos",
    description:
      "Cuidamos da produção de peças físicas com excelência técnica e sensibilidade estética — da escolha do papel ao acabamento final.",
    deliverables: [
      "Catálogos, cartões, embalagens, cardápios e folders",
      "Curadoria de materiais, cores e acabamentos",
      "Provas físicas, mockups e validação técnica",
      "Acompanhamento de fornecedores e cronograma",
    ],
    accent: "from-[var(--brand-yellow)]/30 via-[var(--brand-cyan)]/20 to-transparent",
  },
  {
    title: "Direção Criativa & Suporte Contínuo",
    description:
      "Acompanhamos marcas que precisam manter sua comunicação viva e coerente, em ciclos criativos ou em regime contínuo.",
    deliverables: [
      "Direção de arte para campanhas e ações pontuais",
      "Design de peças para redes sociais, mídia impressa e editorial",
      "Sprints criativos ou acompanhamento mensal",
      "Relatórios e reuniões de alinhamento",
    ],
    accent: "from-[var(--brand-cyan)]/25 via-[var(--brand-magenta)]/15 to-transparent",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <SectionTitle subtitle="Serviços">Soluções sob medida</SectionTitle>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
          Cada projeto nasce de escuta. Entregamos sistemas completos — da identidade ao impresso, do site ao aplicativo — sempre com acompanhamento próximo, método e excelência técnica. Seja no papel, na tela ou na percepção, o que sua marca transmite importa.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-8 backdrop-blur"
          >
            <div
              className={`pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${service.accent}`}
            />
            <div className="relative space-y-4">
              <h3 className="heading-sm text-balance text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/70 px-3 py-1 bg-background/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
