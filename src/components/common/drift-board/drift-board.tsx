import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react";
import { useInViewport } from "@/common/use-in-viewport";
import { usePageVisible } from "@/common/use-page-visible";
import {
  clampToBounds,
  randomVelocity,
  stepDrift,
  type DriftBody,
  type DriftBounds,
  type Rect
} from "@/common/drift-physics";
import {
  DriftContext,
  type DriftContextValue,
  type DriftItemHandle
} from "./drift-context";

type Props = {
  as?: "ul" | "div";
  // Area the items drift and drag within. Defaults to the board itself.
  boundsRef?: RefObject<HTMLElement | null>;
  // Freezes drifting, keeping positions (e.g. while a modal is open).
  paused?: boolean;
  // Touch devices pick items up with a long press so swipes still scroll.
  touch?: boolean;
  // Drift speed in px/s.
  speed?: number;
  // Multiplier on the pointer velocity when an item is thrown.
  throwScale?: number;
  // Cap on a thrown item's speed, in px/s.
  maxThrowSpeed?: number;
  // Time constant for a thrown item to slow back to drift speed, in s.
  throwDecay?: number;
  // Park the item under the cursor so it's easy to read and grab.
  pauseOnHover?: boolean;
  className?: string;
  children: ReactNode;
};

type Entry = DriftItemHandle & {
  body: DriftBody;
  measured: boolean;
  dragging: boolean;
  hovered: boolean;
  // Heading before the item was grabbed, so a gentle drop resumes it.
  heading: { x: number; y: number };
};

// Layout position of `el` relative to `boundsEl`, ignoring transforms (the
// item's own x/y and scale, or any transform on the board).
const measureSlot = (
  el: HTMLElement,
  boundsEl: HTMLElement,
  offset: { x: number; y: number }
): Rect => {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== boundsEl) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
    if (node) {
      x += node.clientLeft;
      y += node.clientTop;
    }
  }
  if (node === boundsEl) return { x, y, w, h };

  // The bounds aren't a positioned ancestor - fall back to on-screen rects,
  // backing out the item's own offset (scale is around the center).
  const r = el.getBoundingClientRect();
  const br = boundsEl.getBoundingClientRect();
  return {
    x: r.left + r.width / 2 - w / 2 - br.left - offset.x,
    y: r.top + r.height / 2 - h / 2 - br.top - offset.y,
    w,
    h
  };
};

export const DriftBoard = ({
  as = "div",
  boundsRef,
  paused = false,
  touch = false,
  speed = 20,
  throwScale = 1,
  maxThrowSpeed = 1500,
  throwDecay = 0.8,
  pauseOnHover = true,
  className = "",
  children
}: Props) => {
  const boardRef = useRef<HTMLElement>(null);
  const resolvedBoundsRef = boundsRef ?? boardRef;

  const inView = useInViewport(resolvedBoundsRef, { threshold: 0 });
  const pageVisible = usePageVisible();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false)
  );

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const handleChange = () => setPrefersReducedMotion(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Reduced motion: nothing drifts, but a thrown item still slides to rest.
  const driftSpeed = prefersReducedMotion ? 0 : speed;
  const canRun = !paused && inView && pageVisible;

  // Latest settings for the loop and callbacks, which are created once.
  // Seeded here because items register (child effects) before this board's
  // effects run.
  const optsRef = useRef({
    driftSpeed,
    throwScale,
    maxThrowSpeed,
    throwDecay,
    pauseOnHover
  });
  useEffect(() => {
    optsRef.current = {
      driftSpeed,
      throwScale,
      maxThrowSpeed,
      throwDecay,
      pauseOnHover
    };
  }, [driftSpeed, throwScale, maxThrowSpeed, throwDecay, pauseOnHover]);

  const entriesRef = useRef(new Map<string, Entry>());
  const boundsSizeRef = useRef<DriftBounds>({ w: 0, h: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const measureRafRef = useRef(0);
  const loopRafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const canRunRef = useRef(false);

  const measure = useCallback(() => {
    const boundsEl = resolvedBoundsRef.current;
    if (!boundsEl) return;
    const bounds = { w: boundsEl.offsetWidth, h: boundsEl.offsetHeight };
    boundsSizeRef.current = bounds;

    for (const entry of entriesRef.current.values()) {
      const offset = { x: entry.x.get(), y: entry.y.get() };
      entry.body.slot = measureSlot(entry.el, boundsEl, offset);
      entry.measured = true;
      // The layout moved (e.g. the grid reflowed) - pull anything now outside
      // the bounds back in. Dragged items belong to motion until released.
      if (!entry.dragging) {
        entry.body.x = offset.x;
        entry.body.y = offset.y;
        clampToBounds(entry.body, bounds);
        entry.x.set(entry.body.x);
        entry.y.set(entry.body.y);
      }
    }
  }, [resolvedBoundsRef]);

  // Coalesce measurements into one per frame (e.g. every item registering
  // on mount).
  const scheduleMeasure = useCallback(() => {
    if (measureRafRef.current) return;
    measureRafRef.current = requestAnimationFrame(() => {
      measureRafRef.current = 0;
      measure();
    });
  }, [measure]);

  const tick = useCallback((now: number) => {
    loopRafRef.current = 0;
    if (!canRunRef.current) return;

    const dt = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
    lastTimeRef.current = now;

    const opts = optsRef.current;
    const entries = [...entriesRef.current.values()].filter((e) => e.measured);
    for (const e of entries) {
      // Motion owns x/y while dragging (and may nudge them on resize), so
      // always start from the live values.
      e.body.x = e.x.get();
      e.body.y = e.y.get();
      e.body.pinned = e.dragging || (opts.pauseOnHover && e.hovered);
    }

    const moving = stepDrift(
      entries.map((e) => e.body),
      boundsSizeRef.current,
      dt,
      { speed: opts.driftSpeed, throwDecay: opts.throwDecay }
    );

    for (const e of entries) {
      if (e.body.pinned) continue;
      e.x.set(e.body.x);
      e.y.set(e.body.y);
    }

    // With no drift speed, sleep once everything has come to rest.
    if (opts.driftSpeed > 0 || moving || entries.some((e) => e.dragging)) {
      loopRafRef.current = requestAnimationFrame(tick);
    } else {
      lastTimeRef.current = 0;
    }
  }, []);

  const wake = useCallback(() => {
    if (loopRafRef.current || !canRunRef.current) return;
    lastTimeRef.current = 0;
    loopRafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    canRunRef.current = canRun;
    if (canRun) {
      wake();
    } else if (loopRafRef.current) {
      cancelAnimationFrame(loopRafRef.current);
      loopRafRef.current = 0;
    }
  }, [canRun, driftSpeed, wake]);

  useEffect(() => {
    const boundsEl = resolvedBoundsRef.current;
    const board = boardRef.current;
    if (!("ResizeObserver" in window)) {
      scheduleMeasure();
      return;
    }
    const ro = new ResizeObserver(() => scheduleMeasure());
    if (boundsEl) ro.observe(boundsEl);
    if (board) ro.observe(board);
    // Items registered before this effect ran.
    for (const entry of entriesRef.current.values()) ro.observe(entry.el);
    resizeObserverRef.current = ro;
    return () => {
      ro.disconnect();
      resizeObserverRef.current = null;
    };
  }, [resolvedBoundsRef, scheduleMeasure]);

  useEffect(
    () => () => {
      // Reset too - StrictMode remounts, and a stale id would make
      // scheduleMeasure/wake think a frame is still pending.
      cancelAnimationFrame(measureRafRef.current);
      cancelAnimationFrame(loopRafRef.current);
      measureRafRef.current = 0;
      loopRafRef.current = 0;
    },
    []
  );

  const register = useCallback(
    (id: string, handle: DriftItemHandle) => {
      const velocity = randomVelocity(optsRef.current.driftSpeed);
      const heading = randomVelocity(1);
      entriesRef.current.set(id, {
        ...handle,
        body: {
          slot: { x: 0, y: 0, w: 0, h: 0 },
          x: handle.x.get(),
          y: handle.y.get(),
          vx: velocity.x,
          vy: velocity.y,
          pinned: false
        },
        measured: false,
        dragging: false,
        hovered: false,
        heading
      });
      resizeObserverRef.current?.observe(handle.el);
      scheduleMeasure();
      return () => {
        resizeObserverRef.current?.unobserve(handle.el);
        entriesRef.current.delete(id);
      };
    },
    [scheduleMeasure]
  );

  const setDragging = useCallback(
    (id: string, dragging: boolean, velocity?: { x: number; y: number }) => {
      const entry = entriesRef.current.get(id);
      if (!entry) return;
      const opts = optsRef.current;
      const { body } = entry;

      if (dragging) {
        entry.dragging = true;
        const current = Math.hypot(body.vx, body.vy);
        if (current > 0) {
          entry.heading = { x: body.vx / current, y: body.vy / current };
        }
        wake();
        return;
      }

      entry.dragging = false;
      // Stop motion's snap-back from the elastic overdrag - the simulation
      // keeps it in bounds from here.
      entry.x.stop();
      entry.y.stop();

      const tx = (velocity?.x ?? 0) * opts.throwScale;
      const ty = (velocity?.y ?? 0) * opts.throwScale;
      const thrown = Math.hypot(tx, ty);
      if (thrown <= opts.driftSpeed) {
        // Set down rather than thrown - carry on the way it was going.
        body.vx = entry.heading.x * opts.driftSpeed;
        body.vy = entry.heading.y * opts.driftSpeed;
      } else {
        const scale = Math.min(1, opts.maxThrowSpeed / thrown);
        body.vx = tx * scale;
        body.vy = ty * scale;
        // The cursor is likely still over it - don't let hover pin it in
        // place mid-throw.
        entry.hovered = false;
      }
      wake();
    },
    [wake]
  );

  const setHovered = useCallback((id: string, hovered: boolean) => {
    const entry = entriesRef.current.get(id);
    if (entry) entry.hovered = hovered;
  }, []);

  // Item ids in the order they were last grabbed - the last one is on top.
  const [stack, setStack] = useState<string[]>([]);

  const bringToFront = useCallback((id: string) => {
    setStack((prev) => [...prev.filter((k) => k !== id), id]);
  }, []);

  const value = useMemo<DriftContextValue>(
    () => ({
      as,
      touch,
      boundsRef: resolvedBoundsRef,
      register,
      setDragging,
      setHovered,
      bringToFront,
      zIndexFor: (id) => stack.indexOf(id) + 1
    }),
    [
      as,
      touch,
      resolvedBoundsRef,
      register,
      setDragging,
      setHovered,
      bringToFront,
      stack
    ]
  );

  return (
    <DriftContext.Provider value={value}>
      {as === "ul" ? (
        <ul ref={boardRef as RefObject<HTMLUListElement>} className={className}>
          {children}
        </ul>
      ) : (
        <div ref={boardRef as RefObject<HTMLDivElement>} className={className}>
          {children}
        </div>
      )}
    </DriftContext.Provider>
  );
};
