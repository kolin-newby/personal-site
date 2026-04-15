import { useEffect, useState } from "react";

export const useInViewport = (
  targetRef: React.RefObject<Element | null>,
  {
    root = null,
    rootMargin = "0px",
    threshold = 0, // 0 fires as soon as any pixel is visible
  }: { root?: Element | null; rootMargin?: string; threshold?: number } = {}
): boolean => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      // Fallback if IO not supported: assume visible
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [targetRef, root, rootMargin, threshold]);

  return inView;
};
