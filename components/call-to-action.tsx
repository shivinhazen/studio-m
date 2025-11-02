"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createContainerVariants,
  createFadeUpVariants,
} from "@/app/(site)/components/motion-utils";
import { useStableReducedMotion } from "@/app/(site)/hooks/use-stable-reduced-motion";

export type CTAAction = {
  label: string;
  href: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
};

export type CallToActionProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actions: CTAAction[];
  alignment?: "center" | "start";
  className?: string;
  glowClassName?: string;
  contentClassName?: string;
  motionProps?: MotionProps;
};

export const CallToAction = React.forwardRef<HTMLDivElement, CallToActionProps>(function CallToAction(
  {
    eyebrow,
    title,
    description,
    actions,
    alignment = "center",
    className,
    glowClassName,
    contentClassName,
    motionProps,
  },
  ref
) {
  const shouldReduceMotion = useStableReducedMotion();

  const copyVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 20, 0.6),
    [shouldReduceMotion]
  );
  const actionsVariants = React.useMemo(
    () =>
      createContainerVariants(shouldReduceMotion, {
        staggerChildren: 0.08,
        duration: 0.5,
      }),
    [shouldReduceMotion]
  );
  const actionVariants = React.useMemo(
    () => createFadeUpVariants(shouldReduceMotion, 14, 0.45),
    [shouldReduceMotion]
  );
  const resolvedMotionProps = React.useMemo(
    () =>
      motionProps ?? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-120px" },
      },
    [motionProps]
  );

  return (
    <motion.div
      ref={ref}
      {...resolvedMotionProps}
      className={cn(
        "relative space-y-6 text-neutral-900 dark:text-neutral-50",
        alignment === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {glowClassName ? (
        <div className={cn("pointer-events-none absolute inset-0", glowClassName)} aria-hidden />
      ) : null}
      <div className={cn("relative space-y-4", contentClassName)}>
        {eyebrow ? (
          <motion.span variants={copyVariants} className="text-xs uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-400">
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h2
          variants={copyVariants}
          className="text-balance text-3xl leading-tight md:text-4xl"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={copyVariants}
          className={cn(
            "text-base leading-relaxed text-neutral-700 md:text-lg dark:text-neutral-200/80",
            alignment === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      </div>
      {actions.length ? (
        <motion.div
          variants={actionsVariants}
          className={cn(
            "relative flex flex-col gap-3",
            alignment === "center" ? "sm:flex-row sm:justify-center" : "sm:flex-row"
          )}
        >
          {actions.map(({ label, href, variant, className: actionClassName, external, icon }, index) => (
            <motion.div variants={actionVariants} key={label + href + index}>
              <Button
                asChild
                variant={variant}
                className={cn("gap-2 transition-all duration-300", actionClassName)}
              >
                <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  {label}
                  {icon ?? <ArrowUpRight className="h-4 w-4" aria-hidden />}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </motion.div>
  );
});
