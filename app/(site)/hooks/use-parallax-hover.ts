"use client";

import * as React from "react";
import { useMotionValue, useSpring, type SpringOptions } from "framer-motion";

const PARALLAX_SPRING_DEFAULTS: SpringOptions = {
  stiffness: 260,
  damping: 18,
  mass: 0.24,
  restSpeed: 0.003,
  restDelta: 0.003,
};

export type ParallaxHoverOptions = {
  maxAngle?: number;
  perspective?: number;
  disabled?: boolean;
  ref?: React.RefObject<HTMLElement | null>;
  spring?: Partial<SpringOptions>;
};

export function useParallaxHover({
  maxAngle = 4,
  perspective = 1000,
  disabled = false,
  ref,
  spring,
}: ParallaxHoverOptions = {}) {
  const internalRef = React.useRef<HTMLElement | null>(null);
  const targetRef = ref ?? internalRef;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springOptions = React.useMemo(
    () => ({
      ...PARALLAX_SPRING_DEFAULTS,
      ...spring,
    }),
    [spring]
  );

  const springRotateX = useSpring(rotateX, springOptions);
  const springRotateY = useSpring(rotateY, springOptions);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || !targetRef.current) return;

      const { left, top, width, height } = targetRef.current.getBoundingClientRect();
      const percentX = (event.clientX - left) / width;
      const percentY = (event.clientY - top) / height;
      const rotateYValue = (percentX - 0.5) * 2 * maxAngle;
      const rotateXValue = (0.5 - percentY) * 2 * maxAngle;

      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
    },
    [disabled, maxAngle, rotateX, rotateY, targetRef]
  );

  const resetTilt = React.useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const parallaxHandlers = React.useMemo(() => {
    if (disabled) return {};

    return {
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
      onPointerCancel: resetTilt,
      onPointerUp: resetTilt,
    } satisfies Pick<
      React.HTMLAttributes<HTMLElement>,
      "onPointerMove" | "onPointerLeave" | "onPointerCancel" | "onPointerUp"
    >;
  }, [disabled, handlePointerMove, resetTilt]);

  const parallaxStyle = disabled
    ? { transformPerspective: perspective, transformStyle: "preserve-3d" as const }
    : {
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d" as const,
      };

  return {
    ref: targetRef,
    style: parallaxStyle,
    handlers: parallaxHandlers,
    isEnabled: !disabled,
  };
}
