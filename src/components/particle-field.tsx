import React, { useRef, useEffect, useCallback } from "react";
import { useInViewport } from "../common/use-in-viewport";
import { usePageVisible } from "../common/use-page-visible";

const getRandom = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

interface ParticleRefs {
  followModeRef: React.MutableRefObject<boolean>;
  lumRef: React.MutableRefObject<string>;
  mouseRef: React.MutableRefObject<{ x: number | undefined; y: number | undefined }>;
  speedRef: React.MutableRefObject<string>;
  colorRef: React.MutableRefObject<boolean>;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  private _followModeRef: React.MutableRefObject<boolean>;
  private _lumRef: React.MutableRefObject<string>;
  private _mouseRef: React.MutableRefObject<{ x: number | undefined; y: number | undefined }>;
  private _speedRef: React.MutableRefObject<string>;
  private _colorRef: React.MutableRefObject<boolean>;

  constructor(
    width: number,
    height: number,
    { followModeRef, lumRef, mouseRef, speedRef, colorRef }: ParticleRefs
  ) {
    this._followModeRef = followModeRef;
    this._lumRef = lumRef;
    this._mouseRef = mouseRef;
    this._speedRef = speedRef;
    this._colorRef = colorRef;

    const fm = this._followModeRef.current;
    const mouse = this._mouseRef.current;
    this.x = fm ? (mouse.x ?? 0) : getRandom(0, width);
    this.y = fm ? (mouse.y ?? 0) : getRandom(0, height);
    this.size = Math.random() * 2.5;

    this.speedX = Math.random() * 2;
    this.speedY = Math.random() * 2;

    this.hue = Math.floor(Math.random() * 360);
  }

  update(width: number, height: number): void {
    if (this._followModeRef.current) {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.1) this.size -= 0.006;
    } else {
      const changeProbX = Math.random();
      const changeProbY = Math.random();
      const directionProbX = Math.random();
      const directionProbY = Math.random();

      let adjustmentX = 0;
      let adjustmentY = 0;

      if (changeProbX > 0.1) {
        adjustmentX = Math.random() / 3;
        if (directionProbX > 0.5) adjustmentX = -adjustmentX;
      }
      if (changeProbY > 0.1) {
        adjustmentY = Math.random() / 3;
        if (directionProbY > 0.5) adjustmentY = -adjustmentY;
      }

      let sx = this.speedX + adjustmentX;
      let sy = this.speedY + adjustmentY;

      switch (this._speedRef.current) {
        case "fast":
          sx = (this.speedX + adjustmentX) * 1.5;
          sy = (this.speedY + adjustmentY) * 1.5;
          break;
        case "slow":
          sx = (this.speedX + adjustmentX) * 0.45;
          sy = (this.speedY + adjustmentY) * 0.45;
          break;
        default:
          break;
      }

      this.x = (this.x + sx + width) % width;
      this.y = (this.y + sy + height) % height;
    }
  }

  getColor(): string {
    const lum = this._lumRef.current;

    if (this._colorRef.current) {
      return `hsl(${this.hue}, 85%, ${lum})`;
    }

    return `hsl(0, 0%, ${lum})`;
  }

  getStrokeColor(): string {
    return this.getColor();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.getColor();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

type Props = {
  followMode?: boolean;
  lum?: string;
  color?: boolean;
  maxParticlesFollowMode?: number;
  className?: string;
  style?: React.CSSProperties;
  speed?: string;
  pauseWhenOffScreen?: boolean;
};

const ParticleField = ({
  followMode = false,
  lum = "0%",
  color = false,
  maxParticlesFollowMode = 100,
  className = "",
  style = {},
  speed = "normal",
  pauseWhenOffScreen = true,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 1, h: 1 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const spotsRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  });

  const followModeRef = useRef<boolean>(followMode);
  const lumRef = useRef<string>(lum);
  const speedRef = useRef<string>(speed);
  const maxFollowRef = useRef<number>(maxParticlesFollowMode);
  const colorRef = useRef<boolean>(color);

  const inView = useInViewport(canvasRef, { threshold: 0 });
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
    followModeRef.current = followMode;
  }, [followMode]);
  useEffect(() => {
    lumRef.current = lum;
  }, [lum]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    maxFollowRef.current = maxParticlesFollowMode;
  }, [maxParticlesFollowMode]);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const { width: cssW, height: cssH } = canvas.getBoundingClientRect();

    sizeRef.current.w = Math.max(1, Math.floor(cssW));
    sizeRef.current.h = Math.max(1, Math.floor(cssH));

    canvas.width = Math.max(1, Math.floor(cssW * dpr));
    canvas.height = Math.max(1, Math.floor(cssH * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const handleParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const spots = spotsRef.current;

    for (let i = 0; i < spots.length; i++) {
      const p = spots[i];
      if (!p) continue;
      p.update(width, height);
      p.draw(ctx);

      for (let j = i; j < spots.length; j++) {
        const q = spots[j];
        if (!q) continue;
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 90) {
          ctx.beginPath();
          ctx.strokeStyle = p.getStrokeColor();
          ctx.lineWidth = p.size / 10;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (p.size <= 0.3) {
        spots.splice(i, 1);
        i--;
      }
    }
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const { w: width, h: height } = sizeRef.current;

    ctx.clearRect(0, 0, width, height);
    handleParticles(ctx, width, height);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (shouldRun) {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [shouldRun, animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    resizeCanvas();

    if (!followModeRef.current) {
      const { w, h } = sizeRef.current;
      for (let i = 0; i < maxFollowRef.current; i++) {
        spotsRef.current.push(
          new Particle(w, h, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
            colorRef,
          })
        );
      }
    }

    const handleResize = () => resizeCanvas();
    const handleMouseOut = () => {
      mouseRef.current.x = undefined;
      mouseRef.current.y = undefined;
    };

    window.addEventListener("resize", handleResize);

    const ro =
      "ResizeObserver" in window ? new ResizeObserver(handleResize) : null;

    ro?.observe(canvas);

    window.addEventListener("pointerleave", handleMouseOut);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
      window.removeEventListener("pointerleave", handleMouseOut);
    };
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: PointerEvent) => {
      if (!shouldRunRef.current) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      const { w, h } = sizeRef.current;
      for (let i = 0; i < 2; i++) {
        spotsRef.current.push(
          new Particle(w, h, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
            colorRef,
          })
        );
      }
    };

    if (followMode) {
      canvas.addEventListener("pointermove", handleMouseMove);
    }
    return () => {
      canvas.removeEventListener("pointermove", handleMouseMove);
    };
  }, [followMode]);

  useEffect(() => {
    if (!followMode && spotsRef.current.length === 0) {
      const { w, h } = sizeRef.current;
      for (let i = 0; i < maxFollowRef.current; i++) {
        spotsRef.current.push(
          new Particle(w, h, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
            colorRef,
          })
        );
      }
    }
  }, [followMode]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", ...style }}
      aria-label="Particle background"
    />
  );
};

export default ParticleField;
