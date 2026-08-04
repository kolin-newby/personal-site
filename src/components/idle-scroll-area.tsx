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
  minStepPx?: number;
  infinite?: boolean;
  idleScrollRampDuration?: number;
  pauseWhenOffScreen?: boolean;
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const IdleScrollArea = ({
  children,
  axis = "y",
  speed = 40,
  idleDelay = 1500,
  pauseOnHover = true,
  startDirection = "forward",
  className = "",
  style = {},
  minStepPx = 0,
  infinite = false,
  idleScrollRampDuration = 1000,
  pauseWhenOffScreen = true,
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

  const shouldRun =
    !prefersReducedMotion && (!pauseWhenOffScreen || (inView && pageVisible));
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

  // ---- non-infinite (bounce) mode: driven by the container's native scroll position ----
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const virtualPosRef = useRef<number>(0);

  const getPos = useCallback(
    (el: HTMLElement) => (axis === "x" ? el.scrollLeft : el.scrollTop),
    [axis],
  );
  const setPos = useCallback(
    (el: HTMLElement, v: number) => {
      if (axis === "x") el.scrollLeft = v;
      else el.scrollTop = v;
    },
    [axis],
  );
  const getMax = useCallback(
    (el: HTMLElement) =>
      axis === "x"
        ? Math.max(0, el.scrollWidth - el.clientWidth)
        : Math.max(0, el.scrollHeight - el.clientHeight),
    [axis],
  );

  const animateBounce = useCallback(
    (ts: number) => {
      const el = containerRef.current;
      if (!el) return;
      if (!shouldRunRef.current) return;

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        virtualPosRef.current = getPos(el);
      }

      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isIdle()) {
        const ramp = getRampFactor();
        const effSpeed = speedRef.current * ramp;
        let step = effSpeed * dt;

        if (ramp >= 1 && minStepPx > 0 && step > 0 && step < minStepPx) {
          step = minStepPx;
        }

        const dir = dirRef.current;
        const max = getMax(el);
        let nextVirtual = virtualPosRef.current + dir * step;

        if (nextVirtual <= 0) {
          nextVirtual = 0;
          dirRef.current = 1;
        } else if (nextVirtual >= max) {
          nextVirtual = max;
          dirRef.current = -1;
        }

        const prevInt = Math.trunc(virtualPosRef.current);
        const nextInt = Math.trunc(nextVirtual);
        virtualPosRef.current = nextVirtual;

        if (nextInt !== prevInt) {
          isProgrammaticScrollRef.current = true;
          setPos(el, nextInt);
          requestAnimationFrame(() => {
            isProgrammaticScrollRef.current = false;
          });
        }
      }

      rafRef.current = requestAnimationFrame(animateBounce);
    },
    [getMax, getPos, setPos, isIdle, minStepPx, getRampFactor],
  );

  const onScroll = useCallback(
    (e: Event) => {
      if (isProgrammaticScrollRef.current) return;
      if (e && (e as { isTrusted?: boolean }).isTrusted === false) return;

      const el = containerRef.current;
      if (!el) return;

      virtualPosRef.current = getPos(el);
      markInteraction();
    },
    [getPos, markInteraction],
  );

  useEffect(() => {
    if (infinite) return;
    if (!shouldRun) {
      lastTsRef.current = 0;
      return;
    }

    rafRef.current = requestAnimationFrame(animateBounce);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [infinite, shouldRun, animateBounce]);

  useEffect(() => {
    if (infinite) return;
    const el = containerRef.current;
    if (!el) return;

    el.style.scrollBehavior = "auto";

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", markInteraction, { passive: true });
    el.addEventListener("touchmove", markInteraction, { passive: true });
    el.addEventListener("touchend", markInteraction, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", markInteraction);
      el.removeEventListener("touchmove", markInteraction);
      el.removeEventListener("touchend", markInteraction);
    };
  }, [infinite, animateBounce, markInteraction, onEnter, onLeave, onScroll]);

  // ---- infinite (marquee) mode: transform-driven, wraps via modulo instead
  // of detecting and teleporting across a native scroll position. There is
  // no DOM scroll position to fight over, so there's no seam to hide. ----
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
    if (!infinite) return;
    updateLayout();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => updateLayout());
    if (measureRef.current) ro.observe(measureRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infinite, updateLayout, copyCount]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const px = -offsetRef.current;
    track.style.transform =
      axis === "x" ? `translate3d(${px}px,0,0)` : `translate3d(0,${px}px,0)`;
  }, [axis]);

  const animateMarquee = useCallback(
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

      rafRef.current = requestAnimationFrame(animateMarquee);
    },
    [isIdle, getRampFactor, applyTransform],
  );

  useEffect(() => {
    if (!infinite) return;
    if (!shouldRun) {
      lastTsRef.current = 0;
      return;
    }

    rafRef.current = requestAnimationFrame(animateMarquee);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [infinite, shouldRun, animateMarquee]);

  useEffect(() => {
    if (!infinite) return;
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
  }, [infinite, markInteraction, onEnter, onLeave]);

  if (infinite) {
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
  }

  const overflowStyle: React.CSSProperties =
    axis === "x"
      ? { overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }
      : { overflowY: "auto", overflowX: "hidden" };

  return (
    <div
      ref={containerRef}
      className={`overscroll-contain ${className}`}
      style={{ ...overflowStyle, ...style }}
    >
      <div style={axis === "x" ? { display: "inline-block" } : undefined}>
        {children}
      </div>
    </div>
  );
};

export default IdleScrollArea;
