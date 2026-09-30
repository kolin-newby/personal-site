import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useInViewport } from "../common/use-in-viewport";
import { usePageVisible } from "../common/use-page-visible";

type Props = {
  children: React.ReactNode;
  axis?: "x" | "y";
  speed?: number;
  idleDelay?: number;
  pauseOnHover?: boolean;
  startDirection?: "forward" | "backward";
  className?: string;
  style?: React.CSSProperties;
  idleScrollRampDuration?: number;
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// Marquee that scrolls its children on a loop once the user has been idle.
// Transform-driven, wrapping via modulo, so there's no DOM scroll position to
// fight over and no seam to hide.
const IdleScrollArea = ({
  children,
  axis = "y",
  speed = 40,
  idleDelay = 1500,
  pauseOnHover = true,
  startDirection = "forward",
  className = "",
  style = {},
  idleScrollRampDuration = 1000,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const lastUserInteractionRef = useRef<number>(Date.now());
  const dirRef = useRef<number>(startDirection === "backward" ? -1 : 1);
  const [isHovering, setIsHovering] = useState(false);

  const speedRef = useRef<number>(speed);
  const idleScrollRampDurationRef = useRef<number>(idleScrollRampDuration);

  const inView = useInViewport(containerRef, { threshold: 0 });
  const pageVisible = usePageVisible();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const shouldRun = !prefersReducedMotion && inView && pageVisible;
  const shouldRunRef = useRef<boolean>(shouldRun);
  useEffect(() => {
    shouldRunRef.current = shouldRun;
  }, [shouldRun]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    idleScrollRampDurationRef.current = idleScrollRampDuration;
  }, [idleScrollRampDuration]);

  const isIdle = useCallback(() => {
    return (
      Date.now() - lastUserInteractionRef.current > idleDelay &&
      (!pauseOnHover || !isHovering)
    );
  }, [idleDelay, pauseOnHover, isHovering]);

  const getRampFactor = useCallback(() => {
    const now = Date.now();
    const idleStart = lastUserInteractionRef.current + idleDelay;
    const elapsed = now - idleStart;
    if (elapsed <= 0) return 0;
    const dur = Math.max(0, idleScrollRampDurationRef.current || 0);
    if (dur === 0) return 1;
    const t = Math.min(1, elapsed / dur);
    return easeOutCubic(t);
  }, [idleDelay]);

  const markInteraction = useCallback(() => {
    lastUserInteractionRef.current = Date.now();
  }, []);

  const onEnter = useCallback(() => {
    setIsHovering(true);
    markInteraction();
  }, [markInteraction]);

  const onLeave = useCallback(() => {
    setIsHovering(false);
    markInteraction();
  }, [markInteraction]);

  const trackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const [copyCount, setCopyCount] = useState(2);

  const measureSpan = useCallback(() => {
    const measure = measureRef.current;
    if (!measure) return 0;
    return axis === "x"
      ? Math.max(0, measure.scrollWidth)
      : Math.max(0, measure.scrollHeight);
  }, [axis]);

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    const span = measureSpan();
    spanRef.current = span;
    if (!container || span <= 0) return;

    const viewport =
      axis === "x" ? container.clientWidth : container.clientHeight;
    const needed = Math.max(2, Math.ceil(viewport / span) + 1);
    setCopyCount((prev) => (prev === needed ? prev : needed));
  }, [axis, measureSpan]);

  useLayoutEffect(() => {
    updateLayout();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => updateLayout());
    if (measureRef.current) ro.observe(measureRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLayout, copyCount]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const px = -offsetRef.current;
    track.style.transform =
      axis === "x" ? `translate3d(${px}px,0,0)` : `translate3d(0,${px}px,0)`;
  }, [axis]);

  const animate = useCallback(
    (ts: number) => {
      if (!shouldRunRef.current) return;

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
      }

      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const span = spanRef.current;
      if (span > 0 && isIdle()) {
        const ramp = getRampFactor();
        const step = speedRef.current * ramp * dt;
        const dir = dirRef.current;

        const next = ((offsetRef.current + dir * step) % span + span) % span;
        offsetRef.current = next;
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [isIdle, getRampFactor, applyTransform],
  );

  useEffect(() => {
    if (!shouldRun) {
      lastTsRef.current = 0;
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [shouldRun, animate]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", markInteraction, { passive: true });
    el.addEventListener("touchmove", markInteraction, { passive: true });
    el.addEventListener("touchend", markInteraction, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", markInteraction);
      el.removeEventListener("touchmove", markInteraction);
      el.removeEventListener("touchend", markInteraction);
    };
  }, [markInteraction, onEnter, onLeave]);

  return (
    <div
      ref={containerRef}
      className={`overscroll-contain overflow-hidden ${className}`}
      style={style}
    >
      <div
        ref={trackRef}
        style={{
          willChange: "transform",
          ...(axis === "x" ? { display: "flex" } : undefined),
        }}
      >
        {Array.from({ length: copyCount }).map((_, i) => (
          <div
            key={`copy-${i}`}
            ref={i === 0 ? measureRef : undefined}
            style={axis === "x" ? { flex: "none" } : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdleScrollArea;
