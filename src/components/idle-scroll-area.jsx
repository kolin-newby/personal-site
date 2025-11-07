import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useInViewport } from "../common/use-in-viewport";
import { usePageVisible } from "../common/use-page-visible";

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
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const lastUserInteractionRef = useRef(Date.now());
  const dirRef = useRef(startDirection === "backward" ? -1 : 1);
  const [isHovering, setIsHovering] = useState(false);

  const isProgrammaticScrollRef = useRef(false);
  const speedRef = useRef(speed);
  const idleScrollRampDurationRef = useRef(idleScrollRampDuration);
  const virtualPosRef = useRef(0);

  const firstCopyRef = useRef(null);
  const spanRef = useRef(0);

  const inView = useInViewport(containerRef, { threshold: 0 });
  const pageVisible = usePageVisible();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const shouldRun =
    !prefersReducedMotion && (!pauseWhenOffScreen || (inView && pageVisible));
  const shouldRunRef = useRef(shouldRun);
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

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const getRampFactor = useCallback(() => {
    // NEW
    const now = Date.now();
    const idleStart = lastUserInteractionRef.current + idleDelay;
    const elapsed = now - idleStart;
    if (elapsed <= 0) return 0;
    const dur = Math.max(0, idleScrollRampDurationRef.current || 0);
    if (dur === 0) return 1;
    const t = Math.min(1, elapsed / dur);
    return easeOutCubic(t);
  }, [idleDelay]);

  const getPos = useCallback(
    (el) => (axis === "x" ? el.scrollLeft : el.scrollTop),
    [axis]
  );
  const setPos = useCallback(
    (el, v) => {
      if (axis === "x") el.scrollLeft = v;
      else el.scrollTop = v;
    },
    [axis]
  );
  const getMax = useCallback(
    (el) =>
      axis === "x"
        ? Math.max(0, el.scrollWidth - el.clientWidth)
        : Math.max(0, el.scrollHeight - el.clientHeight),
    [axis]
  );

  const normalizePhysicalPos = useCallback(
    (el) => {
      if (!infinite) return;
      const span = spanRef.current;
      if (!span) return;

      const pos = getPos(el);
      if (pos >= 2 * span) {
        isProgrammaticScrollRef.current = true;
        setPos(el, pos - span);
        requestAnimationFrame(() => (isProgrammaticScrollRef.current = false));
      } else if (pos < span) {
        isProgrammaticScrollRef.current = true;
        setPos(el, pos + span);
        requestAnimationFrame(() => (isProgrammaticScrollRef.current = false));
      }
    },
    [getPos, setPos, infinite]
  );

  const physFromVirtual = useCallback((v) => {
    const span = spanRef.current || 0;
    if (!span) return v;
    const mod = ((v % span) + span) % span;
    return mod + span;
  }, []);

  const updateSpan = useCallback(() => {
    const el = containerRef.current;
    const first = firstCopyRef.current;
    if (!el || !first) return;

    const span =
      axis === "x"
        ? Math.max(0, first.scrollWidth)
        : Math.max(0, first.scrollHeight);

    spanRef.current = span;

    if (infinite && span > 0) {
      isProgrammaticScrollRef.current = true;
      setPos(el, span);
      requestAnimationFrame(() => (isProgrammaticScrollRef.current = false));
    }
  }, [axis, infinite, setPos]);

  useLayoutEffect(() => {
    updateSpan();
    if (!infinite) return;

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => updateSpan());
    if (firstCopyRef.current) ro.observe(firstCopyRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [infinite, updateSpan]);

  const animate = useCallback(
    (ts) => {
      const el = containerRef.current;
      if (!el) return;

      if (!shouldRunRef.current) return;

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        if (infinite) {
          normalizePhysicalPos(el);
          virtualPosRef.current = getPos(el) - (spanRef.current || 0);
        } else {
          virtualPosRef.current = getPos(el);
        }
      }

      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isIdle()) {
        const ramp = getRampFactor();
        let effSpeed = speedRef.current * ramp;
        let step = effSpeed * dt;

        if (ramp >= 1 && minStepPx > 0 && step > 0 && step < minStepPx) {
          step = minStepPx;
        }

        const dir = dirRef.current;

        if (infinite) {
          const span = spanRef.current || 0;
          if (span > 0) {
            const nextVirtual = virtualPosRef.current + dir * step;
            virtualPosRef.current = nextVirtual;

            const desiredPhys = physFromVirtual(nextVirtual);
            normalizePhysicalPos(el);

            const prevInt = Math.trunc(getPos(el));
            const nextInt = Math.trunc(desiredPhys);
            if (nextInt !== prevInt) {
              isProgrammaticScrollRef.current = true;
              setPos(el, nextInt);
              requestAnimationFrame(() => {
                isProgrammaticScrollRef.current = false;
              });
            }
          }
        } else {
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
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [
      getMax,
      getPos,
      setPos,
      isIdle,
      minStepPx,
      infinite,
      normalizePhysicalPos,
      physFromVirtual,
      getRampFactor,
    ]
  );

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

  const onScroll = useCallback(
    (e) => {
      if (isProgrammaticScrollRef.current) return;
      if (e && e.isTrusted === false) return;

      const el = containerRef.current;
      if (!el) return;

      if (infinite) {
        normalizePhysicalPos(el);
        const span = spanRef.current || 0;
        if (span > 0) {
          const phys = getPos(el);
          virtualPosRef.current = phys - span;
        }
      } else {
        virtualPosRef.current = getPos(el);
      }
      markInteraction();
    },
    [getPos, markInteraction, infinite, normalizePhysicalPos]
  );

  useEffect(() => {
    if (shouldRun) {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastTsRef.current = 0;
    }
  }, [shouldRun, animate]);

  useEffect(() => {
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
  }, [animate, markInteraction, onEnter, onLeave, onScroll]);

  const overflowStyle =
    axis === "x"
      ? { overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }
      : { overflowY: "auto", overflowX: "hidden" };

  const ContentCopy = ({ withRef = false }) => (
    <div
      ref={withRef ? firstCopyRef : null}
      style={axis === "x" ? { display: "inline-block" } : undefined}
    >
      {children}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`overscroll-contain ${className}`}
      style={{ ...overflowStyle, ...style }}
    >
      {infinite ? (
        <>
          <ContentCopy />
          <ContentCopy withRef />
          <ContentCopy />
        </>
      ) : (
        <ContentCopy />
      )}
    </div>
  );
};

export default IdleScrollArea;
