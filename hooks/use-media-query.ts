"use client";

import * as React from "react";

function getDefaultSnapshot() {
  return false;
}

export function useMediaQuery(query: string) {
  const mediaQueryRef = React.useRef<MediaQueryList | null>(null);

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    mediaQueryRef.current ??= window.matchMedia(query);
    return mediaQueryRef.current.matches;
  }, [query]);

  const subscribe = React.useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") {
        return () => undefined;
      }

      const mql = window.matchMedia(query);
      mediaQueryRef.current = mql;
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, getDefaultSnapshot);
}

export function useIsCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}
