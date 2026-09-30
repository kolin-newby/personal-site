import type React from "react";
import { useInViewport } from "./use-in-viewport";
import { usePageVisible } from "./use-page-visible";
import { usePrefersReducedMotion } from "./use-media-query";

type Options = { threshold?: number };

// Whether `ref` is on screen in a foreground tab - i.e. whether anything
// animating inside it would actually be seen.
export const useIsVisible = (
  ref: React.RefObject<Element | null>,
  { threshold = 0 }: Options = {}
): boolean => {
  const inView = useInViewport(ref, { threshold });
  const pageVisible = usePageVisible();
  return inView && pageVisible;
};

// Whether a decorative animation in `ref` should run: it's visible and the
// user hasn't asked for reduced motion.
export const useShouldAnimate = (
  ref: React.RefObject<Element | null>,
  options: Options = {}
): boolean => {
  const visible = useIsVisible(ref, options);
  const reducedMotion = usePrefersReducedMotion();
  return visible && !reducedMotion;
};
