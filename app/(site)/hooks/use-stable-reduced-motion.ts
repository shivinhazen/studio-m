"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

export function useStableReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof prefersReducedMotion === "boolean") {
      setShouldReduceMotion(prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  return shouldReduceMotion;
}
