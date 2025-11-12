"use client";

import { useReducedMotion, type Transition } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "@/lib/motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageSrc?: StaticImageData;
  href?: string;
  className?: string;
  delay?: number;
  imageBackgroundClassName?: string;
  imagePriority?: boolean;
};

export function ProjectCard({
  title,
  description,
  tags,
  imageSrc,
  href,
  className,
  delay = 0,
  imageBackgroundClassName,
  imagePriority,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverVariants = shouldReduceMotion
    ? undefined
    : {
        scale: 1.01,
        transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] as const },
      };
  const cardTransition: Transition = {
    duration: 0.45,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  };

  const content = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={cardTransition}
      whileHover={hoverVariants}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-5 shadow-sm transition-all duration-300 backdrop-blur",
        "hover:border-primary/50 hover:shadow-[0_22px_45px_-28px_rgba(15,23,42,0.35)] dark:hover:border-white/20 dark:hover:shadow-[0_24px_48px_-30px_rgba(255,255,255,0.24)]",
        className
      )}
    >
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "relative mb-4 aspect-[16/10] overflow-hidden rounded-xl",
            imageBackgroundClassName ??
              "bg-gradient-to-br from-[var(--brand-cyan)]/30 via-[var(--brand-magenta)]/20 to-[var(--brand-yellow)]/25"
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 360px, 100vw"
              placeholder="blur"
              priority={imagePriority}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-neutral-950/15 to-transparent dark:from-black/70 dark:via-black/20" />
        </div>
        <h3 className="heading-sm text-balance text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}
