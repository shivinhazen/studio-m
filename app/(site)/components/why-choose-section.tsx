"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SectionTitle } from "@/components/section-title";
import {
  createContainerVariants,
  createFadeUpVariants,
  EASE_IN_OUT,
} from "./motion-utils";
import { useStableReducedMotion } from "../hooks/use-stable-reduced-motion";
import { REASONS } from "./home-data";

export function WhyChooseSection() {
  const shouldReduceMotion = useStableReducedMotion();
  const sectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.7,
      }),
    [shouldReduceMotion]
  );
  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 18, 0.6),
    [shouldReduceMotion]
  );
  const cardsContainerVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.12,
        duration: 0.55,
      }),
    [shouldReduceMotion]
  );
  const cardVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 22, 0.52),
    [shouldReduceMotion]
  );

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="py-10 md:py-16"
    >
      <motion.div variants={copyVariants} className="space-y-6 text-center">
        <SectionTitle>Por que escolher o Studio M?</SectionTitle>
        <motion.p
          variants={copyVariants}
          className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Design com escuta, direção com critério e entrega cuidadosa. No Studio M interpretamos o momento da sua marca
          sem exageros — apenas escolhas que sustentam presença e criam conexões duradouras.
        </motion.p>
      </motion.div>
      <motion.div variants={cardsContainerVariants} className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        {REASONS.map(({ icon: Icon, title, text }) => (
          <motion.article
            key={title}
            variants={cardVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -2,
                    scale: 1.02,
                    transition: { duration: 0.25, ease: EASE_IN_OUT },
                  }
            }
            className="rounded-3xl border border-border/60 bg-card/80 p-8 text-center backdrop-blur transition-transform duration-300 hover:border-primary/50 hover:shadow-[0_24px_45px_-30px_rgba(15,23,42,0.28)] dark:border-white/12 dark:hover:border-white/20 dark:hover:shadow-[0_24px_48px_-32px_rgba(255,255,255,0.26)]"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="heading-sm mt-4 text-balance text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
