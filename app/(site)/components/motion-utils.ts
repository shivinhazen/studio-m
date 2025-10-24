import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.33, 1, 0.68, 1] as const;

export const MOTION_DISABLED_VARIANTS = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.01 } },
} as const satisfies Variants;

export function createFadeUpVariants(shouldReduceMotion: boolean, distance = 24, duration = 0.7) {
  if (shouldReduceMotion) {
    return MOTION_DISABLED_VARIANTS;
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASE_OUT,
      },
    },
  } as const satisfies Variants;
}

export function createContainerVariants(
  shouldReduceMotion: boolean,
  options: Partial<{ staggerChildren: number; delayChildren: number; duration: number }> = {}
) {
  if (shouldReduceMotion) {
    return MOTION_DISABLED_VARIANTS;
  }

  const { staggerChildren = 0.08, delayChildren = 0, duration = 0.9 } = options;

  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASE_OUT,
        when: "beforeChildren",
        staggerChildren,
        delayChildren,
      },
    },
  } as const satisfies Variants;
}

export function createScaleInVariants(shouldReduceMotion: boolean) {
  if (shouldReduceMotion) {
    return MOTION_DISABLED_VARIANTS;
  }

  return {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: EASE_IN_OUT,
      },
    },
  } as const satisfies Variants;
}
