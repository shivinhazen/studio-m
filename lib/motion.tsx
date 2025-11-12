"use client";

import * as React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

type MotionProviderProps = {
  children: React.ReactNode;
};

/**
 * Wraps motion components with LazyMotion + domAnimation once, so features are loaded lazily.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export const motion = m;
