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
import { PROCESS_STEPS } from "./home-data";

export function ProcessSection() {
  const shouldReduceMotion = useStableReducedMotion();
  const sectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.65,
      }),
    [shouldReduceMotion]
  );
  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 18, 0.6),
    [shouldReduceMotion]
  );
  const stepsVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.12,
        duration: 0.5,
      }),
    [shouldReduceMotion]
  );
  const stepCardVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 20, 0.5),
    [shouldReduceMotion]
  );

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="py-12 md:py-20 lg:py-24"
    >
      <motion.div variants={copyVariants} className="space-y-6">
        <SectionTitle>Como trabalhamos</SectionTitle>
        <motion.p
          variants={copyVariants}
          className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Nosso método combina escuta, direção e acabamento com intenção. Ele garante clareza em cada decisão e autoria
          em cada entrega.
        </motion.p>
      </motion.div>
      <motion.div variants={stepsVariants} className="mt-12 grid gap-6 md:grid-cols-4">
        {PROCESS_STEPS.map((step, index) => (
          <motion.article
            key={step.title}
            variants={stepCardVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.02,
                    transition: { duration: 0.28, ease: EASE_IN_OUT },
                  }
            }
            className="rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur transition-transform duration-300 hover:border-primary/50 hover:shadow-[0_20px_42px_-30px_rgba(15,23,42,0.28)] dark:border-white/12 dark:hover:border-white/20 dark:hover:shadow-[0_24px_48px_-30px_rgba(255,255,255,0.24)]"
          >
            <div className="heading-xs flex items-center gap-3 text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                {index + 1}
              </span>
              {step.title}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
