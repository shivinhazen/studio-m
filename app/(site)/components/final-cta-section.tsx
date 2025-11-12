"use client";

import * as React from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "@/lib/motion";

import { CallToAction } from "@/components/call-to-action";
import { useStableReducedMotion } from "../hooks/use-stable-reduced-motion";
import { useParallaxHover } from "../hooks/use-parallax-hover";
import { useIsCoarsePointer, useIsMobile } from "@/hooks/use-media-query";
import { createContainerVariants, createFadeUpVariants, EASE_IN_OUT } from "./motion-utils";
import { useIdleReady } from "../hooks/use-idle-ready";

export function FinalCTASection() {
  const shouldReduceMotion = useStableReducedMotion();
  const isMobile = useIsMobile();
  const isCoarsePointer = useIsCoarsePointer();
  const idleReady = useIdleReady();

  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const ctaCardRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || isMobile ? [0, 0] : [-20, 20]
  );
  const sectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.65,
      }),
    [shouldReduceMotion]
  );
  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 20, 0.6),
    [shouldReduceMotion]
  );

  const tiltSpring = React.useMemo(
    () => ({
      stiffness: 420,
      damping: 20,
      mass: 0.18,
      restDelta: 0.0015,
      restSpeed: 0.0015,
    }),
    []
  );

  const ctaParallax = useParallaxHover({
    maxAngle: 3.5,
    perspective: 1200,
    disabled: shouldReduceMotion || isMobile || isCoarsePointer || !idleReady,
    spring: tiltSpring,
    ref: ctaCardRef,
  });

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-[#FAFAFA] px-8 py-28 text-neutral-900 shadow-[0_24px_68px_-48px_rgba(15,23,42,0.45)] transition-transform duration-500 sm:px-12 md:px-20 md:py-36 dark:border-white/12 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <motion.div
        style={{ y: idleReady ? parallaxY : 0 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.15),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.15),transparent_60%)] opacity-80 blur-[110px] dark:bg-[radial-gradient(circle_at_top_left,rgba(0,188,212,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(233,30,99,0.25),transparent_60%)] dark:opacity-60"
        aria-hidden
      />
      <motion.div
        ref={ctaCardRef}
        variants={copyVariants}
        className="relative"
        style={ctaParallax.style}
        {...ctaParallax.handlers}
        whileHover={
          ctaParallax.isEnabled
            ? {
                scale: 1.01,
                transition: { duration: 0.35, ease: EASE_IN_OUT },
              }
            : undefined
        }
      >
        <CallToAction
          alignment="start"
          motionProps={{ variants: copyVariants }}
          title="Vamos criar algo que sua marca possa se orgulhar — e seu público, sentir."
          description="Seja para começar do zero ou refinar o que já existe, o Studio M entrega design com intenção, acabamento e autoria. Da marca à materialidade."
          actions={[
            {
              label: "Iniciar conversa",
              href: "https://wa.me/5511988884455",
              external: true,
              className:
                "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90",
            },
            {
              label: "Ver o que já criamos",
              href: "/portfolio",
              variant: "outline",
              className:
                "border-neutral-300 text-neutral-900 hover:bg-neutral-900/5 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:border-white/40 dark:text-neutral-100 dark:hover:bg-white/10",
            },
          ]}
        />
      </motion.div>
    </motion.section>
  );
}
