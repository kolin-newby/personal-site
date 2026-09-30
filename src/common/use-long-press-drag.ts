import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import type { DragControls } from "motion/react";

type Options = {
  // How long the finger has to rest before the drag starts, in ms.
  delay?: number;
  // How far the finger can move during the hold before it counts as a
  // scroll/swipe and the long press is abandoned, in px.
  moveTolerance?: number;
};

// Starts a motion drag only after a long press, so a normal swipe over the
// element still scrolls the page on touch devices.
export const useLongPressDrag = (
  dragControls: DragControls,
  { delay = 300, moveTolerance = 8 }: Options = {}
) => {
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    startRef.current = null;
    activeRef.current = false;
  }, []);

  // Once the drag is live the browser would otherwise claim the gesture for
  // scrolling and cancel the pointer mid-drag. Must be non-passive to be
  // allowed to preventDefault.
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (activeRef.current && e.cancelable) e.preventDefault();
    };
    // The finger may lift off somewhere other than the element, so reset from
    // the window too - a stuck activeRef would block all page scrolling.
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("pointerup", clear);
    window.addEventListener("pointercancel", clear);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("pointercancel", clear);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [clear]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      clear();
      startRef.current = { x: e.clientX, y: e.clientY };
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        activeRef.current = true;
        navigator.vibrate?.(10);
        dragControls.start(e);
      }, delay);
    },
    [clear, delay, dragControls]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const start = startRef.current;
      if (timerRef.current === null || !start) return;
      if (
        Math.hypot(e.clientX - start.x, e.clientY - start.y) > moveTolerance
      ) {
        clear();
      }
    },
    [clear, moveTolerance]
  );

  return {
    onPointerDown,
    onPointerMove,
    // Suppress the long-press context menu that would fire mid-drag.
    onContextMenu: (e: React.MouseEvent) => e.preventDefault()
  };
};
