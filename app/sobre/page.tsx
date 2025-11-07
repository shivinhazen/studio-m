import { SectionTitle } from "@/components/section-title";

const values = [
  {
    title: "Profundidade em cada entrega",
    text: "Conceito, expressão e execução caminham juntos — nada é entregue pela metade ou sem contexto.",
  },
  {
    title: "Parcerias que se expandem",
    text: "Trabalhamos com times internos, parceiros e fornecedores, ajustando a formação ideal para cada desafio.",
  },
  {
    title: "Método com sensibilidade",
    text: "Cada etapa é acompanhada com método, atenção artesanal e precisão técnica.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-border/60 bg-card/70 p-10 backdrop-blur">
        <div className="space-y-5">
          <SectionTitle subtitle="Sobre">Studio M — Soluções Visuais</SectionTitle>
          <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Design como construção de presença. Somos um estúdio de identidade, direção criativa e produção visual que
            acredita no poder de marcas bem desenhadas — aquelas que comunicam com intenção, beleza e estrutura.
          </p>
          <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Combinamos o olhar autoral de um estúdio boutique com a solidez técnica de quem executa. Atuamos em naming,
            identidade visual, sites, interfaces e materiais impressos, sempre com pensamento estratégico. Nosso trabalho
            cruza o artesanal com o digital, o visual com o verbal, o físico com o simbólico — traduzindo essência em forma,
            com ritmo, textura e direção. Queremos ser seu estúdio de confiança para o que precisa nascer, crescer ou ganhar
            corpo visual.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground md:text-2xl">
            Valores que conduzem nosso trabalho
          </h3>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            Pilares que orientam equipes, parceiros e entregas — do briefing ao acabamento final.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="h-full rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-colors hover:border-border"
            >
              <p className="heading-xs text-foreground">{value.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
