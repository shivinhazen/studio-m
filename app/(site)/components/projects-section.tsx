"use client";

import * as React from "react";
import { motion } from "@/lib/motion";

import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  createContainerVariants,
  createFadeUpVariants,
  EASE_IN_OUT,
} from "./motion-utils";
import { useStableReducedMotion } from "../hooks/use-stable-reduced-motion";
import { SHOWCASE_PROJECTS } from "./home-data";

const normalizeTag = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
const projectScore = (tags: string[]) => {
  const t = normalizeTag(tags.join(" "));
  let score = 0;
  if (t.includes("impress")) score += 3;
  if (t.includes("editorial")) score += 2;
  if (t.includes("producao grafica")) score += 2;
  if (t.includes("papelaria")) score += 1;
  if (t.includes("embal")) score += 1;
  return score;
};

const ORDERED_PROJECTS = [...SHOWCASE_PROJECTS].sort(
  (a, b) => projectScore(b.tags) - projectScore(a.tags)
);

export function ProjectsSection() {
  const shouldReduceMotion = useStableReducedMotion();
  const sectionVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.75,
      }),
    [shouldReduceMotion]
  );
  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 18, 0.62),
    [shouldReduceMotion]
  );
  const cardsContainer = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.12,
        duration: 0.55,
      }),
    [shouldReduceMotion]
  );
  const projectVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 26, 0.52),
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
        <SectionTitle>Projetos e criações</SectionTitle>
        <motion.p
          variants={copyVariants}
          className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Marcas que ganham corpo. Materiais que criam conexão. Nosso portfólio reúne soluções que permanecem — sempre
          com escuta no início e encantamento na entrega.
        </motion.p>
      </motion.div>
      <motion.div variants={cardsContainer} className="mt-12 grid gap-6 md:grid-cols-2">
        {ORDERED_PROJECTS.map(({ icon: ProjectIcon, title, description, tags }) => (
          <motion.article
            key={title}
            variants={projectVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.02,
                    transition: { duration: 0.3, ease: EASE_IN_OUT },
                  }
            }
            className="transition-transform duration-300"
          >
            <Card className="h-full rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-[var(--brand-magenta)]/8 p-6 shadow-sm transition-colors duration-300 hover:border-neutral-900/15 hover:shadow-[0_24px_48px_-32px_rgba(15,23,42,0.35)] dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_26px_52px_-32px_rgba(255,255,255,0.2)]">
              <CardHeader className="gap-4">
                <div className="flex items-start gap-2">
                  <ProjectIcon className="mt-0.5 h-5 w-5 flex-none text-muted-foreground dark:text-neutral-400" aria-hidden />
                  <CardTitle className="text-xl leading-tight text-neutral-900 dark:text-neutral-50">{title}</CardTitle>
                </div>
                <CardDescription className="pl-7 text-base leading-relaxed text-muted-foreground dark:text-neutral-300/90">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
