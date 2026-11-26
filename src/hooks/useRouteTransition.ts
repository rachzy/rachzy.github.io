import { useEffect, useState } from "react";
import type { Route } from "./useHashRoute";
import { useReducedMotion } from "./useReducedMotion";

export const FADE_OUT_MS = 80;

/**
 * Keeps showing the previous route while it fades out, then swaps to the new
 * one (which fades in via CSS). With reduced motion the swap is immediate.
 */
export function useRouteTransition(route: Route): {
  shown: Route;
  leaving: boolean;
} {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<Route>(route);

  useEffect(() => {
    if (route === shown) return;
    if (reduced) {
      setShown(route);
      return;
    }
    const id = window.setTimeout(() => setShown(route), FADE_OUT_MS);
    return () => window.clearTimeout(id);
  }, [route, shown, reduced]);

  return { shown, leaving: route !== shown && !reduced };
}
