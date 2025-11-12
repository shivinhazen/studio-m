import type { Metadata } from "next";

import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "Portfólio | Studio M — Soluções Visuais",
  description:
    "Seleção de projetos em identidade visual, sites institucionais e materiais impressos produzidos pelo Studio M.",
  alternates: {
    canonical: "https://studio-m-pearl.vercel.app/portfolio",
  },
  openGraph: {
    title: "Portfólio Studio M",
    description:
      "Identidades, impressos e experiências digitais assinadas pelo Studio M — Soluções Visuais.",
    url: "https://studio-m-pearl.vercel.app/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
