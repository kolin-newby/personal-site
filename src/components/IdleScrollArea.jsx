import React, { useCallback, useEffect, useRef, useState } from "react";

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
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const lastUserInteractionRef = useRef(Date.now());
  const dirRef = useRef(startDirection === "backward" ? -1 : 1);
  const [isHovering, setIsHovering] = useState(false);

  const isProgrammaticScrollRef = useRef(false);
  const speedRef = useRef(speed);
  const virtualPosRef = useRef(0);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const isIdle = useCallback(() => {
    return (
      Date.now() - lastUserInteractionRef.current > idleDelay &&
      (!pauseOnHover || !isHovering)
    );
  }, [idleDelay, pauseOnHover, isHovering]);

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

  const animate = useCallback(
    (ts) => {
      const el = containerRef.current;
      if (!el) return;

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        virtualPosRef.current = getPos(el);
      }

      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isIdle()) {
        const max = getMax(el);
        const dir = dirRef.current;

        let step = speedRef.current * dt;
        if (minStepPx > 0 && step > 0 && step < minStepPx) step = minStepPx;

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

      rafRef.current = requestAnimationFrame(animate);
    },
    [getMax, getPos, setPos, isIdle, minStepPx]
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
      if (el) virtualPosRef.current = getPos(el);
      markInteraction();
    },
    [getPos, markInteraction]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.scrollBehavior = "auto";

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", markInteraction, { passive: true });
    el.addEventListener("touchmove", markInteraction, { passive: true });
    el.addEventListener("touchend", markInteraction, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", markInteraction);
      el.removeEventListener("touchmove", markInteraction);
      el.removeEventListener("touchend", markInteraction);
    };
  }, [animate, markInteraction, onEnter, onLeave, onScroll]);

  const overflowStyle =
    axis === "x"
      ? { overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }
      : { overflowY: "auto", overflowX: "hidden" };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...overflowStyle, ...style }}
    >
      &nbsp;{children}&nbsp;
    </div>
  );
};

export default IdleScrollArea;
