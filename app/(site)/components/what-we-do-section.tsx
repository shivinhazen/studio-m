"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SectionTitle } from "@/components/section-title";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  createContainerVariants,
  createFadeUpVariants,
  EASE_IN_OUT,
} from "./motion-utils";
import { useStableReducedMotion } from "../hooks/use-stable-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { SERVICES } from "./home-data";

const SERVICE_ORDER = ["Impressos Premium", "Design de Identidade", "Experiências Digitais"] as const;
const serviceWeight = (title: string) => {
  const index = SERVICE_ORDER.indexOf(title as (typeof SERVICE_ORDER)[number]);
  return index === -1 ? 99 : index;
};

const ORDERED_SERVICES = [...SERVICES].sort(
  (a, b) => serviceWeight(a.title) - serviceWeight(b.title)
);

export function WhatWeDoSection() {
  const shouldReduceMotion = useStableReducedMotion();
  const isMobile = useIsMobile();

  const sectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        delayChildren: 0.08,
        duration: isMobile ? 0.65 : 0.8,
      }),
    [shouldReduceMotion, isMobile]
  );
  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 20, 0.58),
    [shouldReduceMotion]
  );
  const gridVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.12,
        duration: 0.55,
      }),
    [shouldReduceMotion]
  );
  const cardVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 24, 0.55),
    [shouldReduceMotion]
  );

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--brand-cyan)]/12 via-transparent to-[var(--brand-magenta)]/12 mix-blend-soft-light dark:mix-blend-normal dark:from-black/0 dark:via-neutral-900/40 dark:to-black/0"
        aria-hidden
      />
      <motion.div variants={copyVariants} className="relative mx-auto max-w-6xl px-4">
        <motion.div variants={copyVariants} className="space-y-4">
          <SectionTitle>Serviços em destaque</SectionTitle>
          <motion.p
            variants={copyVariants}
            className="max-w-3xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
          >
            Unimos direção criativa e acompanhamento técnico para revelar marcas com elegância — e garantir presença
            duradoura.
          </motion.p>
        </motion.div>
        <motion.div variants={gridVariants} className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {ORDERED_SERVICES.map(({ icon: Icon, title, description, accent }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.02,
                      transition: { duration: 0.3, ease: EASE_IN_OUT },
                    }
              }
              className="group flex h-full flex-col gap-5 rounded-2xl border border-neutral-200/70 bg-gradient-to-br from-white/95 via-white/80 to-white/60 p-8 shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_22px_48px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-gradient-to-br dark:from-neutral-900/70 dark:via-neutral-900/50 dark:to-black/85 dark:hover:border-white/20 dark:hover:shadow-[0_26px_50px_-32px_rgba(255,255,255,0.28)]"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900/5 ${accent} transition-all duration-300 dark:bg-white/10`}>
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="space-y-3">
                <CardTitle className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400/90">
                  {description}
                </CardDescription>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
