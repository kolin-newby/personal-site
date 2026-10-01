import { useCallback, useSyncExternalStore } from "react";

// Tailwind's lg breakpoint.
export const LG_QUERY = "(min-width: 1024px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Never changes after load, so there's nothing to subscribe to.
const subscribeNever = () => () => {};

// The prerendered HTML is built without a window, so it always uses `false`.
// Hydration renders with that too, then React re-renders with the real value.
const getServerFalse = () => false;

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia?.(query);
      if (!mql) return () => {};
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia?.(query)?.matches ?? false,
    getServerFalse
  );
};

export const useIsLg = () => useMediaQuery(LG_QUERY);

export const usePrefersReducedMotion = () =>
  useMediaQuery(REDUCED_MOTION_QUERY);

// Non-hook version for event handlers, which only need the value at the
// moment they run.
export const prefersReducedMotion = () =>
  window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;

const hasTouch = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const useHasTouch = () =>
  useSyncExternalStore(subscribeNever, hasTouch, getServerFalse);
