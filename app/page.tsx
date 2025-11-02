'use client';

import { Hero } from "./(site)/components/hero";
import { WhatWeDoSection } from "./(site)/components/what-we-do-section";
import { WhyChooseSection } from "./(site)/components/why-choose-section";
import { ProjectsSection } from "./(site)/components/projects-section";
import { ProcessSection } from "./(site)/components/process-section";
import { FinalCTASection } from "./(site)/components/final-cta-section";

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-16">
      <Hero />
      <WhatWeDoSection />
      <WhyChooseSection />
      <ProjectsSection />
      <ProcessSection />
      <FinalCTASection />
    </div>
  );
}
