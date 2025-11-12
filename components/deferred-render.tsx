"use client";

import * as React from "react";

type DeferredRenderProps = {
  children: React.ReactNode;
  rootMargin?: string;
  fallback?: React.ReactNode;
};

export function DeferredRender({ children, rootMargin = "0px 0px 200px 0px", fallback }: DeferredRenderProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : fallback ?? <div aria-hidden />}</div>;
}
