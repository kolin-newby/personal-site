import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "motion/react";
import { useGradientColor } from "@/common/gradient-color";

type Props = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  href?: string | null;
  download?: string | null;
  newTab?: boolean | null;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  buttonText?: string | null;
  icon?: React.ReactNode;
  // Keeps the background visible and enables drag-to-pull on touch devices.
  touch?: boolean | null;
  // Palette index for the default gradient; random when omitted.
  buttonIndex?: number | null;
  // Turn off the default gradient + shadow to style the background yourself
  // via `backgroundClassName`.
  gradient?: boolean;
  backgroundClassName?: string;
};

// How far the background is allowed to drift toward the cursor, in px.
const MAX_PULL = 6;
const PULL_STRENGTH = 0.3;

// Fraction of the finger's movement the background follows while dragging.
const DRAG_STRENGTH = 0.6;
// Minimum movement before a touch counts as a drag rather than a tap, so the
// resulting click isn't suppressed by accident.
const DRAG_THRESHOLD_PX = 4;
// How far past the button's own edges the touch can wander before the
// background snaps back - keeps the "outer bounds" from being as tight as
// the button's (small) hit box.
const DRAG_BOUNDS_PADDING_PX = 60;

const clamp = (value: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, value));

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const Button = ({
  href = null,
  download = null,
  newTab = true,
  type = "button",
  disabled,
  buttonText = null,
  icon = null,
  touch = false,
  buttonIndex = null,
  gradient = true,
  className,
  backgroundClassName,
  onClick,
  ...props
}: Props) => {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.3 });
  const gradientColor = useGradientColor(buttonIndex);

  // Tracks whether the current gesture moved enough to count as a drag, so
  // the resulting click (link nav / onClick) can be suppressed on release.
  const draggedRef = useRef(false);

  // Manual pointer tracking for touch drag: the gesture is bound to the
  // whole hit area (not just the background) so grabbing the label text
  // works too, and it's also the "outer bounds" - the background snaps back
  // the instant the touch leaves this element, so it can never be dragged
  // arbitrarily far across the screen.
  const activeDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

  const resetPull = () => {
    x.set(0);
    y.set(0);
  };

  const endDrag = (target: HTMLElement, pointerId: number) => {
    activeDragRef.current = null;
    if (target.hasPointerCapture(pointerId))
      target.releasePointerCapture(pointerId);
    resetPull();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (!touch || prefersReducedMotion || e.pointerType !== "touch") return;
    // A drag that ended out of bounds never produces a click to clear this.
    draggedRef.current = false;
    activeDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const drag = activeDragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const withinBounds =
      e.clientX >= rect.left - DRAG_BOUNDS_PADDING_PX &&
      e.clientX <= rect.right + DRAG_BOUNDS_PADDING_PX &&
      e.clientY >= rect.top - DRAG_BOUNDS_PADDING_PX &&
      e.clientY <= rect.bottom + DRAG_BOUNDS_PADDING_PX;

    if (!withinBounds) {
      endDrag(e.currentTarget, drag.pointerId);
      return;
    }

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) draggedRef.current = true;

    x.set(dx * DRAG_STRENGTH);
    y.set(dy * DRAG_STRENGTH);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const drag = activeDragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    endDrag(e.currentTarget, drag.pointerId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - rect.left - rect.width / 2) * PULL_STRENGTH));
    y.set(clamp((e.clientY - rect.top - rect.height / 2) * PULL_STRENGTH));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    resetPull();
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (draggedRef.current) {
      draggedRef.current = false;
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const backgroundClasses = cx(
    gradient && `shadow ${gradientColor}`,
    backgroundClassName
  );

  // Hit area is deliberately larger than the visual background, so the
  // background has room to drift toward the cursor without ever reaching the
  // element's true edge.
  const sharedProps = {
    ...props,
    className: cx(
      "relative flex items-center justify-center rounded-lg px-3 py-2 sm:mx-4 sm:px-4 sm:py-3",
      touch && "touch-none",
      className
    ),
    onClick: handleClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleMouseLeave,
    onFocus: () => setHovered(true),
    onBlur: handleMouseLeave,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
    children: (
      <>
        {backgroundClasses && (
          <motion.span
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-1 rounded-xl",
              backgroundClasses
            )}
            style={{ x: springX, y: springY }}
            initial={false}
            animate={{ opacity: touch || hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {icon && <span className="flex shrink-0 items-center">{icon}</span>}
          {buttonText && <span>{buttonText}</span>}
        </span>
      </>
    )
  };

  if (href !== null)
    return (
      <a
        {...sharedProps}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
        download={download ?? undefined}
      />
    );

  return <button {...sharedProps} type={type} disabled={disabled} />;
};

export default Button;
