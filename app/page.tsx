import type { Metadata } from "next";

import { Hero } from "./(site)/components/hero";
import { WhatWeDoSection } from "./(site)/components/what-we-do-section";
import { WhyChooseSection } from "./(site)/components/why-choose-section";
import { ProjectsSection } from "./(site)/components/projects-section";
import { ProcessSection } from "./(site)/components/process-section";
import { FinalCTASection } from "./(site)/components/final-cta-section";
import { DeferredRender } from "@/components/deferred-render";

export const metadata: Metadata = {
  title: "Studio M — Soluções Visuais",
  description:
    "Design autoral para marcas: identidades visuais, experiências digitais e materiais impressos conduzidos com direção criativa.",
  alternates: {
    canonical: "https://studio-m-pearl.vercel.app",
  },
  openGraph: {
    title: "Studio M — Design autoral e produção visual",
    description:
      "Estúdio boutique que cria identidades visuais, sites institucionais e materiais impressos com direção estratégica.",
    url: "https://studio-m-pearl.vercel.app",
  },
};

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-16">
      <Hero />
      <WhatWeDoSection />
      <WhyChooseSection />
      <DeferredRender>
        <ProjectsSection />
      </DeferredRender>
      <DeferredRender>
        <ProcessSection />
      </DeferredRender>
      <DeferredRender>
        <FinalCTASection />
      </DeferredRender>
    </div>
  );
}
