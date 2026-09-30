import { createContext, useContext, type RefObject } from "react";
import type { MotionValue } from "motion/react";

export type DriftItemHandle = {
  el: HTMLElement;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export type DriftContextValue = {
  as: "ul" | "div";
  touch: boolean;
  boundsRef: RefObject<HTMLElement | null>;
  // Adds an item to the simulation; returns a function that removes it.
  register: (id: string, handle: DriftItemHandle) => () => void;
  setDragging: (
    id: string,
    dragging: boolean,
    velocity?: { x: number; y: number }
  ) => void;
  setHovered: (id: string, hovered: boolean) => void;
  bringToFront: (id: string) => void;
  zIndexFor: (id: string) => number;
};

export const DriftContext = createContext<DriftContextValue | null>(null);

export const useDriftBoard = () => {
  const ctx = useContext(DriftContext);
  if (!ctx) throw new Error("DriftItem must be rendered inside a DriftBoard");
  return ctx;
};
