import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { useLongPressDrag } from "@/common/use-long-press-drag";
import { useDriftBoard } from "./drift-context";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export const DriftItem = ({
  id,
  className = "",
  children,
  onDragStart,
  onDragEnd
}: Props) => {
  const {
    as,
    touch,
    boundsRef,
    register,
    setDragging,
    setHovered,
    bringToFront,
    zIndexFor
  } = useDriftBoard();

  const ref = useRef<HTMLElement>(null);
  // Shared by motion's drag and the board's simulation.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  // On touch, a plain swipe should scroll the page - only a long press
  // picks the item up.
  const longPressHandlers = useLongPressDrag(dragControls);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return register(id, { el, x, y });
  }, [id, register, x, y]);

  const Component = as === "ul" ? motion.li : motion.div;

  return (
    <Component
      ref={ref as RefObject<HTMLDivElement & HTMLLIElement>}
      drag
      dragControls={dragControls}
      dragListener={!touch}
      dragConstraints={boundsRef}
      // The board's simulation carries the throw instead.
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        bringToFront(id);
        setDragging(id, true);
        onDragStart?.();
      }}
      onDragEnd={(_, info) => {
        setDragging(id, false, info.velocity);
        onDragEnd?.();
      }}
      onPointerEnter={() => setHovered(id, true)}
      onPointerLeave={() => setHovered(id, false)}
      whileDrag={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
      style={{ x, y, zIndex: zIndexFor(id), boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      className={`cursor-grab select-none [-webkit-touch-callout:none] active:cursor-grabbing ${className}`}
      {...(touch ? longPressHandlers : {})}
    >
      {children}
    </Component>
  );
};
