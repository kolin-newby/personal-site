import { useEffect, useState } from "react";

// Tailwind's lg breakpoint.
export const LG_QUERY = "(min-width: 1024px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query)?.matches ?? false
  );

  useEffect(() => {
    const mql = window.matchMedia?.(query);
    if (!mql) return;
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

export const useIsLg = () => useMediaQuery(LG_QUERY);

export const usePrefersReducedMotion = () =>
  useMediaQuery(REDUCED_MOTION_QUERY);

// Non-hook version for event handlers, which only need the value at the
// moment they run.
export const prefersReducedMotion = () =>
  window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
