"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const displayedRef = useRef(value);
  const subscribersRef = useRef(new Set<() => void>());

  const displayed = useSyncExternalStore(
    (cb) => {
      subscribersRef.current.add(cb);
      return () => subscribersRef.current.delete(cb);
    },
    () => displayedRef.current,
    () => value,
  );

  useEffect(() => {
    if (shouldReduceMotion || displayedRef.current === value) {
      if (displayedRef.current !== value) {
        displayedRef.current = value;
        subscribersRef.current.forEach((cb) => cb());
      }
      return;
    }

    const start = displayedRef.current;
    const diff = value - start;
    const duration = 200;
    const startTime = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const factor = 10 ** decimals;
      const rounded = Math.round((start + diff * eased) * factor) / factor;
      if (displayedRef.current !== rounded) {
        displayedRef.current = rounded;
        subscribersRef.current.forEach((cb) => cb());
      }
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, decimals, shouldReduceMotion]);

  return <>{decimals > 0 ? displayed.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : displayed.toLocaleString()}</>;
}
