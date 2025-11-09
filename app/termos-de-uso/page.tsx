import { SectionTitle } from "@/components/section-title";

const clauses = [
  {
    title: "Uso do site",
    content: [
      "O conteúdo disponível em studiom.design é voltado para apresentar os serviços e projetos do Studio M — Soluções Visuais.",
      "Você concorda em utilizar o site apenas para finalidades lícitas e em conformidade com estes Termos.",
      "É proibido tentar acessar áreas restritas, comprometer a segurança do site ou interferir em sua operação.",
    ],
  },
  {
    title: "Propriedade intelectual",
    content: [
      "Todos os textos, imagens, vídeos, ilustrações e marcas exibidos pertencem ao Studio M ou a seus parceiros e clientes, e são protegidos por direitos autorais.",
      "É vedado copiar, reproduzir ou distribuir qualquer conteúdo sem autorização prévia por escrito.",
    ],
  },
  {
    title: "Serviços oferecidos",
    content: [
      "Os serviços descritos no site podem sofrer ajustes conforme a necessidade de cada projeto.",
      "Uma proposta formal será apresentada após análise do briefing enviado.",
    ],
  },
  {
    title: "Links externos",
    content: [
      "Podemos mencionar sites de terceiros para complementar informações. O Studio M não se responsabiliza por políticas ou conteúdos dessas páginas.",
    ],
  },
  {
    title: "Limitação de responsabilidade",
    content: [
      "Nos esforçamos para manter o site sempre disponível e atualizado, mas não garantimos operação ininterrupta ou isenta de erros.",
      "O Studio M não se responsabiliza por quaisquer danos resultantes do uso do site ou de links externos.",
    ],
  },
  {
    title: "Alterações",
    content: [
      "Podemos atualizar estes Termos periodicamente. A versão vigente será sempre a publicada nesta página, com a data de revisão indicada abaixo.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <SectionTitle subtitle="Termos de Uso">Condições gerais</SectionTitle>
        <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Ao navegar pelo site do Studio M, você concorda com os termos descritos abaixo. Recomendamos a leitura atenta
          antes de utilizar nossos canais.
        </p>
        <p className="text-xs text-muted-foreground">Última atualização: outubro de 2025.</p>
      </header>

      <div className="space-y-8">
        {clauses.map((clause) => (
          <section key={clause.title} className="space-y-3">
            <h3 className="heading-sm text-foreground">{clause.title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              {clause.content.map((paragraph) => (
                <li key={paragraph} className="list-disc pl-5">
                  {paragraph}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur">
        <h3 className="heading-sm text-foreground">Fale conosco</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Para dúvidas sobre estes Termos de Uso, escreva para{" "}
          <a
            href="mailto:contato@studiom.design"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            contato@studiom.design
          </a>
          .
        </p>
      </section>
    </div>
  );
}
