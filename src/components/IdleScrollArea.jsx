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
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);
  const lastUserInteractionRef = useRef(Date.now());
  const dirRef = useRef(startDirection === "backward" ? -1 : 1);
  const [isHovering, setIsHovering] = useState(false);

  const isProgrammaticScrollRef = useRef(false);

  const speedRef = useRef(speed);
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

      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isIdle()) {
        const max = getMax(el);
        let next = getPos(el) + dirRef.current * speedRef.current * dt;

        if (next <= 0) {
          next = 0;
          dirRef.current = 1;
        } else if (next >= max) {
          next = max;
          dirRef.current = -1;
        }

        isProgrammaticScrollRef.current = true;
        setPos(el, next);
        requestAnimationFrame(() => {
          isProgrammaticScrollRef.current = false;
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [getMax, getPos, setPos, isIdle]
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
      markInteraction();
    },
    [markInteraction]
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
      {children}
    </div>
  );
};

export default IdleScrollArea;
