import type { LucideIcon } from "lucide-react";
import { Globe2, MonitorSmartphone, PenTool, Printer, Sparkles } from "lucide-react";

export const HERO_EXPERTISE: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: PenTool,
    title: "Identidade Visual",
    description:
      "Sistemas consistentes que criam reconhecimento e desdobramento com propósito — do logotipo à papelaria, da cor ao tom visual.",
  },
  {
    icon: MonitorSmartphone,
    title: "Web Design Institucional",
    description:
      "Sites sob medida com direção de arte, usabilidade e leveza — projetados para transmitir valor e gerar confiança.",
  },
  {
    icon: Printer,
    title: "Produção Gráfica",
    description:
      "Materiais que encantam ao toque: papéis, acabamentos e processos técnicos conduzidos com curadoria e precisão.",
  },
];

export const SERVICES: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    icon: Printer,
    title: "Impressos Premium",
    description:
      "Cartões, catálogos, embalagens e publicações com direção de arte, testes físicos e acabamento de alto padrão.",
    accent: "text-yellow-400",
  },
  {
    icon: PenTool,
    title: "Design de Identidade",
    description:
      "Criação de marcas com vocabulário visual forte, aplicações versáteis e posicionamento claro.",
    accent: "text-cyan-400",
  },
  {
    icon: Globe2,
    title: "Experiências Digitais",
    description:
      "Websites institucionais e landing pages alinhadas à identidade, com arquitetura fluida e navegação intuitiva.",
    accent: "text-magenta-400",
  },
];

export const REASONS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: PenTool,
    title: "Expressão com intenção",
    text: "Tradução visual da essência, do momento e da ambição da marca, com escolhas que sustentam a narrativa.",
  },
  {
    icon: Printer,
    title: "Produção que comunica",
    text: "Materiais com valor tátil e estético, pensados para criar presença — não apenas cumprir função.",
  },
  {
    icon: Globe2,
    title: "Presença digital com direção",
    text: "Sites institucionais que alinham clareza, visual e propósito para fortalecer relações de confiança.",
  },
  {
    icon: Sparkles,
    title: "Nenhuma escolha é por acaso",
    text: "Cada etapa recebe critério e acabamento. Sem modismos ou fórmulas genéricas — apenas design consistente.",
  },
];

export const SHOWCASE_PROJECTS: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}> = [
  {
    icon: PenTool,
    title: "Identidade visual para negócio local",
    description:
      "Criação de logotipo e papelaria personalizada para fortalecer presença de marca com consistência e afeto.",
    tags: ["Identidade", "Papelaria", "Impressos"],
  },
  {
    icon: MonitorSmartphone,
    title: "Website institucional responsivo",
    description: "Site moderno com navegação fluida e conteúdo alinhado à estratégia da marca.",
    tags: ["Web", "UX", "Conteúdo"],
  },
  {
    icon: Printer,
    title: "Catálogo impresso de produtos",
    description: "Layout editorial, fotografia e preparação técnica completos para gráfica.",
    tags: ["Editorial", "Produção gráfica", "Fotografia"],
  },
  {
    icon: Sparkles,
    title: "Landing page promocional",
    description: "Design visual para campanhas sazonais com narrativa clara e chamada de ação precisa.",
    tags: ["Campanhas", "Landing page", "Motion"],
  },
];

export const PROCESS_STEPS = [
  {
    title: "Diagnóstico",
    description: "Mapeamos história, desafio e contexto para entender o momento da marca.",
  },
  {
    title: "Direção criativa",
    description: "Definimos território visual, critérios técnicos e referências que guiam o caminho.",
  },
  {
    title: "Desenvolvimento",
    description: "Criamos, refinamos, testamos — sempre em diálogo para garantir autoria em cada entrega.",
  },
  {
    title: "Entrega",
    description: "Implementamos no papel e no digital, com qualidade, coesão e documentação completa.",
  },
];
