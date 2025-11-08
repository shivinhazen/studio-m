'use client';

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { SectionTitle } from "@/components/section-title";
import { ProjectCard } from "@/components/card-projeto";
import { CallToAction } from "@/components/call-to-action";
import { useMediaQuery } from "@/hooks/use-media-query";

import identidadeCafeteriaAurora from "@/public/assets/portfolio/mockups/identidade-cafeteria-aurora.png";
import landingColetivoCriativo from "@/public/assets/portfolio/mockups/landing-coletivo-criativo.png";
import embalagemSkincareEssenciaPura from "@/public/assets/portfolio/mockups/embalagem-skincare-essencia-pura.png";
import direcaoArteFestivalAurora from "@/public/assets/portfolio/mockups/direcao-arte-festival-aurora.png";
import mockupEducaflow from "@/public/assets/portfolio/mockups/mockup-educaflow.png";
import appMiSaladasMockup from "@/public/assets/portfolio/mockups/app-mi-saladas.png";

const projects = [
  {
    title: "Aurora Coffee Roasters",
    description:
      "Reposicionamento que uniu naming, identidade visual e produção gráfica para reforçar a experiência artesanal - do grão ao papel.",
    tags: ["Branding", "Identidade Visual", "Papelaria"],
    imageSrc: identidadeCafeteriaAurora.src,
  },
  {
    title: "Coletivo Criativo",
    description:
      "Landing page com storytelling editorial, tipografia sutil e CMS integrado, pensada para dar voz a um coletivo plural.",
    tags: ["UX/UI", "Webflow", "Conteúdo"],
    imageSrc: landingColetivoCriativo.src,
  },
  {
    title: "Essência Pura Skincare",
    description:
      "Sistema de embalagens premium com direção de arte, materiais técnicos e guia completo para fornecedores parceiros.",
    tags: ["Packaging", "Direção de Arte", "Produção Gráfica"],
    imageSrc: embalagemSkincareEssenciaPura.src,
  },
  {
    title: "Festival Aurora",
    description:
      "Campanha cultural com direção criativa, peças impressas e digitais que prolongam a experiência sensorial do evento.",
    tags: ["Campanha", "Direção de Arte", "Impressos"],
    imageSrc: direcaoArteFestivalAurora.src,
  },
  {
    title: "EducaFlow Platform",
    description:
      "Dashboard educacional com design system próprio, navegação acessível e documentação precisa para squads de produto.",
    tags: ["Produto Digital", "Design System", "Research"],
    imageSrc: mockupEducaflow.src,
  },
  {
    title: "Mi Saladas",
    description:
      "Aplicativo mobile de personalização gastronômica com jornadas intuitivas e microinterações que reforçam a identidade.",
    tags: ["App", "UX/UI", "Motion"],
    imageSrc: appMiSaladasMockup.src,
    imageBackgroundClassName: "bg-[#121212] dark:bg-[#121212]",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion();
  const heroVariants = React.useMemo(() => (
    shouldReduceMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : fadeIn
  ), [shouldReduceMotion]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ctaRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start 80%', 'end start'],
  });
  const ctaParallax = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || isMobile ? [0, 0] : [-20, 20]
  );
  const ctaCopyVariants = React.useMemo(() => (
    shouldReduceMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }
  ), [shouldReduceMotion]);
  return (
    <div className="container mx-auto space-y-24 px-6 py-24 text-neutral-800 md:space-y-32 md:px-12 md:py-32 dark:text-neutral-300">
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl space-y-6 text-center"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-500">
          Seleção de projetos
        </p>
        <h1 className="text-balance text-neutral-900 dark:text-neutral-100">
          Design que nasce da escuta e ganha forma com direção.
        </h1>
        <p className="text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
          Cada projeto nasce do encontro entre estratégia, estética e propósito. Atuamos em branding, produção física e presença digital com o mesmo cuidado - criando sistemas vivos de comunicação, não peças isoladas. Abaixo, uma seleção curada de histórias visuais que seguem presentes em diferentes superfícies.
        </p>
      </motion.section>

      <section id="cases" className="space-y-6 md:space-y-8">
        <div className="max-w-3xl space-y-4">
          <SectionTitle>Casos em destaque</SectionTitle>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
            Selecionamos projetos recentes que demonstram como traduzimos objetivos de negócio em experiências memoráveis.
            Do posicionamento à implementação, cada entrega preserva o DNA da marca.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.08} />
          ))}
        </div>
      </section>

      <motion.section
        ref={ctaRef}
        variants={heroVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-[#FAFAFA] px-8 py-24 text-neutral-900 shadow-[0_24px_64px_-48px_rgba(15,23,42,0.45)] transition-colors sm:px-12 md:px-16 md:py-32 dark:border-white/12 dark:bg-neutral-950 dark:text-neutral-100"
      >
        <motion.div
          style={{ y: ctaParallax }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.15),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.15),transparent_60%)] opacity-80 dark:bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.25),transparent_60%)] dark:opacity-60"
          aria-hidden
        />
        <CallToAction
          alignment="center"
          motionProps={{
            variants: ctaCopyVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-120px" },
          }}
          className="mx-auto max-w-3xl text-center"
          title="Cada marca tem um jeito único de se expressar."
          description="Se busca um parceiro para traduzir sua identidade em materiais, interfaces ou experiências que deixam marca — com direção, cuidado e consistência — vamos conversar."
          actions={[
            {
              label: "Ver mais projetos",
              href: "/portfolio#cases",
              className:
                "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90",
            },
            {
              label: "Começar conversa",
              href: "https://wa.me/5511988884455",
              external: true,
              variant: "outline",
              className:
                "border-neutral-300 text-neutral-900 hover:bg-neutral-900/5 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:border-white/40 dark:text-neutral-100 dark:hover:bg-white/10",
            },
          ]}
        />
      </motion.section>
    </div>
  );
}
