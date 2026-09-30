// A tiny 2D simulation of axis-aligned boxes that drift around, bounce off
// the edges of their bounds and off each other. Pure - no React or DOM - so
// the caller owns reading/writing the actual element positions.

export type Rect = { x: number; y: number; w: number; h: number };

export type DriftBounds = { w: number; h: number };

export type DriftBody = {
  // The item's resting (layout) box, relative to the bounds.
  slot: Rect;
  // Offset from the slot - what the item's x/y motion values hold.
  x: number;
  y: number;
  // Velocity in px/s.
  vx: number;
  vy: number;
  // Pinned bodies (dragged or hovered) don't move and act as immovable
  // walls for everyone else.
  pinned: boolean;
};

export type DriftOptions = {
  // Speed every body relaxes back to, in px/s. 0 lets bodies come to rest.
  speed: number;
  // Time constant for relaxing back to `speed` after a throw or knock, in s.
  throwDecay: number;
};

// A slow frame (or a tab coming back into focus) shouldn't fling bodies
// through each other.
const MAX_DT = 0.05;
const MAX_SUBSTEPS = 8;
// How much a drifting body's heading wanders, in rad/s.
const WANDER = 4;
// Below this a body coming to rest (speed 0) just stops, in px/s.
const MIN_SPEED = 1;

export const randomVelocity = (speed: number) => {
  const angle = Math.random() * Math.PI * 2;
  return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
};

// Keeps a body inside the bounds, bouncing it off whichever edge it crossed.
export const clampToBounds = (b: DriftBody, bounds: DriftBounds) => {
  const left = b.slot.x + b.x;
  if (b.slot.w >= bounds.w) {
    // Too wide to move at all - park it against the left edge rather than
    // flipping direction every frame.
    b.x = -b.slot.x;
    b.vx = 0;
  } else if (left < 0) {
    b.x -= left;
    b.vx = Math.abs(b.vx);
  } else if (left + b.slot.w > bounds.w) {
    b.x -= left + b.slot.w - bounds.w;
    b.vx = -Math.abs(b.vx);
  }

  const top = b.slot.y + b.y;
  if (b.slot.h >= bounds.h) {
    b.y = -b.slot.y;
    b.vy = 0;
  } else if (top < 0) {
    b.y -= top;
    b.vy = Math.abs(b.vy);
  } else if (top + b.slot.h > bounds.h) {
    b.y -= top + b.slot.h - bounds.h;
    b.vy = -Math.abs(b.vy);
  }
};

// Pushes an overlapping pair apart along `axis`. `dir` is 1 when b sits on
// the positive side of a.
const resolve = (
  a: DriftBody,
  b: DriftBody,
  axis: "x" | "y",
  overlap: number,
  dir: 1 | -1
) => {
  const v = axis === "x" ? "vx" : "vy";
  if (a.pinned) {
    b[axis] += dir * overlap;
    b[v] = dir * Math.abs(b[v]);
    return;
  }
  if (b.pinned) {
    a[axis] -= dir * overlap;
    a[v] = -dir * Math.abs(a[v]);
    return;
  }
  a[axis] -= (dir * overlap) / 2;
  b[axis] += (dir * overlap) / 2;
  // Equal-mass elastic collision: swap velocities along the axis. Only when
  // approaching - a pair already separating would otherwise swap back and
  // forth and stick together.
  if ((b[v] - a[v]) * dir < 0) {
    const t = a[v];
    a[v] = b[v];
    b[v] = t;
  }
};

const collide = (a: DriftBody, b: DriftBody) => {
  if (a.pinned && b.pinned) return;
  const ax = a.slot.x + a.x;
  const ay = a.slot.y + a.y;
  const bx = b.slot.x + b.x;
  const by = b.slot.y + b.y;

  const overlapX = Math.min(ax + a.slot.w, bx + b.slot.w) - Math.max(ax, bx);
  if (overlapX <= 0) return;
  const overlapY = Math.min(ay + a.slot.h, by + b.slot.h) - Math.max(ay, by);
  if (overlapY <= 0) return;

  // Resolve along the axis of least overlap - a side hit bounces
  // horizontally, a top/bottom hit vertically.
  if (overlapX < overlapY) {
    const dir = bx + b.slot.w / 2 >= ax + a.slot.w / 2 ? 1 : -1;
    resolve(a, b, "x", overlapX, dir);
  } else {
    const dir = by + b.slot.h / 2 >= ay + a.slot.h / 2 ? 1 : -1;
    resolve(a, b, "y", overlapY, dir);
  }
};

// Eases a body's speed toward the drift speed, keeping its heading.
const regulate = (
  b: DriftBody,
  dt: number,
  { speed, throwDecay }: DriftOptions
) => {
  const current = Math.hypot(b.vx, b.vy);
  const next = speed + (current - speed) * Math.exp(-dt / throwDecay);
  if (speed === 0 && next < MIN_SPEED) {
    b.vx = 0;
    b.vy = 0;
    return;
  }
  let angle =
    current > 0 ? Math.atan2(b.vy, b.vx) : Math.random() * Math.PI * 2;
  if (speed > 0) angle += (Math.random() - 0.5) * WANDER * dt;
  b.vx = Math.cos(angle) * next;
  b.vy = Math.sin(angle) * next;
};

// Advances the simulation by `dt` seconds, mutating the bodies in place.
// Returns whether any free body is still moving.
export const stepDrift = (
  bodies: DriftBody[],
  bounds: DriftBounds,
  dt: number,
  options: DriftOptions
): boolean => {
  const step = Math.min(dt, MAX_DT);
  if (step > 0) {
    // Split fast frames so no body moves more than half the smallest box
    // per substep and can't tunnel through another.
    let fastest = 0;
    let smallest = Infinity;
    for (const b of bodies) {
      if (!b.pinned) fastest = Math.max(fastest, Math.hypot(b.vx, b.vy));
      smallest = Math.min(smallest, b.slot.w, b.slot.h);
    }
    const substeps = Math.min(
      MAX_SUBSTEPS,
      Math.max(1, Math.ceil((fastest * step) / Math.max(smallest / 2, 1)))
    );
    const h = step / substeps;

    for (let s = 0; s < substeps; s++) {
      for (const b of bodies) {
        if (b.pinned) continue;
        b.x += b.vx * h;
        b.y += b.vy * h;
      }
      bodies.forEach((a, i) => {
        for (const b of bodies.slice(i + 1)) collide(a, b);
      });
      // Walls last - a slight overlap between cards reads better than a card
      // pushed out of the container.
      for (const b of bodies) {
        if (!b.pinned) clampToBounds(b, bounds);
      }
    }

    for (const b of bodies) {
      if (!b.pinned) regulate(b, step, options);
    }
  }

  return bodies.some((b) => !b.pinned && (b.vx !== 0 || b.vy !== 0));
};
