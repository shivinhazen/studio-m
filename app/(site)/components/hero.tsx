"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createContainerVariants,
  createFadeUpVariants,
  createScaleInVariants,
  EASE_OUT,
} from "./motion-utils";
import { useParallaxHover } from "../hooks/use-parallax-hover";
import { useStableReducedMotion } from "../hooks/use-stable-reduced-motion";
import { HERO_EXPERTISE } from "./home-data";
import { useIsCoarsePointer, useIsMobile } from "@/hooks/use-media-query";
import { useIdleReady } from "../hooks/use-idle-ready";

const EXPERTISE_ORDER = ["Produção Gráfica", "Identidade Visual", "Web Design Institucional"] as const;
const expertiseWeight = (title: string) => {
  const index = EXPERTISE_ORDER.indexOf(title as (typeof EXPERTISE_ORDER)[number]);
  return index === -1 ? 99 : index;
};

const ORDERED_EXPERTISE = [...HERO_EXPERTISE].sort(
  (a, b) => expertiseWeight(a.title) - expertiseWeight(b.title)
);

export function Hero() {
  const shouldReduceMotion = useStableReducedMotion();
  const isMobile = useIsMobile();
  const isCoarsePointer = useIsCoarsePointer();
  const idleReady = useIdleReady();

  const heroSectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: isMobile ? 0.05 : 0.08,
        delayChildren: 0.12,
        duration: isMobile ? 0.6 : 0.85,
      }),
    [shouldReduceMotion, isMobile]
  );
  const heroCopyContainer = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.06,
        duration: isMobile ? 0.48 : 0.6,
      }),
    [shouldReduceMotion, isMobile]
  );
  const heroBadgeVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 12, 0.5),
    [shouldReduceMotion]
  );
  const heroHeadingVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 26, 0.72),
    [shouldReduceMotion]
  );
  const heroTextVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 20, 0.65),
    [shouldReduceMotion]
  );
  const heroActionsContainer = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.55,
      }),
    [shouldReduceMotion]
  );
  const heroActionVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 14, 0.55),
    [shouldReduceMotion]
  );
  const heroExpertiseContainer = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.14,
        duration: 0.52,
      }),
    [shouldReduceMotion]
  );
  const heroExpertiseItem = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 18, 0.58),
    [shouldReduceMotion]
  );
  const heroCardVariants = React.useMemo(
    () => createScaleInVariants(shouldReduceMotion),
    [shouldReduceMotion]
  );

  const heroCardRef = React.useRef<HTMLDivElement | null>(null);
  const heroParallax = useParallaxHover({
    maxAngle: 4,
    perspective: 1100,
    disabled: shouldReduceMotion || isMobile || isCoarsePointer || !idleReady,
    ref: heroCardRef,
  });
  const heroCardHover = heroParallax.isEnabled
    ? {
        scale: 1.02,
        transition: { duration: 0.3, ease: EASE_OUT },
      }
    : undefined;

  return (
    <motion.section
      variants={heroSectionVariants}
      initial="hidden"
      animate="visible"
      className="grid items-center gap-12 py-16 md:gap-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
    >
      <motion.div variants={heroCopyContainer} className="space-y-6">
        <motion.span
          variants={heroBadgeVariants}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-primary"
        >
          <Sparkles className="h-3 w-3" aria-hidden /> Studio M — Soluções Visuais
        </motion.span>
        <motion.h1
          variants={heroHeadingVariants}
          className="text-balance text-3xl leading-tight sm:text-4xl md:text-5xl"
        >
          Design autoral para marcas que querem ser sentidas — não apenas vistas.
        </motion.h1>
        <motion.p
          variants={heroTextVariants}
          className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Criamos sistemas visuais com direção e acabamento. Somos um estúdio boutique que transforma ideias em
          experiências consistentes — da impressão ao digital.
        </motion.p>
        <motion.div variants={heroActionsContainer} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.div variants={heroActionVariants}>
            <Button asChild className="gap-2">
              <Link href="/portfolio">
                Ver portfólio
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={heroActionVariants}>
            <Button variant="outline" asChild className="gap-2 whitespace-nowrap">
              <Link href="/contato">
                Agendar conversa
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        ref={heroCardRef}
        className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-white/95 via-white/80 to-white/60 p-8 shadow-sm transition-transform duration-300 backdrop-blur md:p-10 dark:border-white/10 dark:bg-gradient-to-br dark:from-neutral-900/70 dark:via-neutral-900/50 dark:to-black/85 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] dark:hover:shadow-[0_25px_55px_-38px_rgba(255,255,255,0.3)] hover:shadow-[0_25px_55px_-38px_rgba(15,23,42,0.35)] group"
        variants={heroCardVariants}
        whileHover={heroCardHover}
        style={heroParallax.style}
        {...heroParallax.handlers}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.35),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.3),transparent_65%)]"
          aria-hidden
        />
        <motion.div variants={heroExpertiseContainer} className="relative flex flex-col gap-6 text-neutral-900 dark:text-neutral-200">
          <motion.div variants={heroTextVariants} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-400">Expertise</p>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Traduzimos a essência da marca em presença visual real — no toque, na tela e na percepção.
            </p>
          </motion.div>
          <motion.div
            variants={heroExpertiseContainer}
            className="space-y-6 border-t border-neutral-200/70 pt-6 dark:border-white/60"
          >
            {ORDERED_EXPERTISE.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={heroExpertiseItem} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-neutral-200/70 bg-neutral-900/5 text-[var(--brand-cyan)] dark:border-white/15 dark:bg-white/10">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100 md:text-xl">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
