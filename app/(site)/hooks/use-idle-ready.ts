"use client";

import * as React from "react";

/**
 * Returns true once the browser main thread is idle enough to run non-critical effects.
 * Falls back to a timeout when `requestIdleCallback` is unavailable.
 */
export function useIdleReady(delay = 0) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (ready) return;

    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const markReady = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(markReady, { timeout: delay || 500 });
    } else {
      timeoutHandle = window.setTimeout(markReady, delay || 300);
    }

    return () => {
      if (idleHandle !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [delay, ready]);

  return ready;
}
