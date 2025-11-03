import React, { useRef, useEffect, useCallback } from "react";

const getRandom = (min, max) => Math.random() * (max - min) + min;

class Particle {
  constructor(width, height, { followModeRef, lumRef, mouseRef, speedRef }) {
    this._followModeRef = followModeRef;
    this._lumRef = lumRef;
    this._mouseRef = mouseRef;
    this._speedRef = speedRef;

    const fm = this._followModeRef.current;
    const mouse = this._mouseRef.current;
    this.x = fm ? mouse.x : getRandom(0, width);
    this.y = fm ? mouse.y : getRandom(0, height);
    this.size = Math.random() * 2.5;

    this.speedX = Math.random() * 2;
    this.speedY = Math.random() * 2;

    this.color = `hsl(356, 0%, ${this._lumRef.current})`;
    // const hue = Math.floor(Math.random() * 360);
    // this.color = `hsl(${hue}, 30%, ${this._lumRef.current})`;
  }

  update(width, height) {
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

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ParticleField = ({
  followMode = false,
  lum = "0%",
  maxParticlesFollowMode = 100,
  className = "",
  style = {},
  speed = "normal",
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const spotsRef = useRef([]);
  const mouseRef = useRef({ x: undefined, y: undefined });

  const followModeRef = useRef(followMode);
  const lumRef = useRef(lum);
  const speedRef = useRef(speed);
  const maxFollowRef = useRef(maxParticlesFollowMode);
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

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const { width: cssW, height: cssH } = canvas.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(cssW * dpr));
    canvas.height = Math.max(1, Math.floor(cssH * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const handleParticles = (ctx, width, height) => {
    const spots = spotsRef.current;

    for (let i = 0; i < spots.length; i++) {
      const p = spots[i];
      p.update(width, height);
      p.draw(ctx);

      for (let j = i; j < spots.length; j++) {
        const dx = p.x - spots[j].x;
        const dy = p.y - spots[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 90) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size / 10;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(spots[j].x, spots[j].y);
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

    const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(cssW));
    const height = Math.max(1, Math.floor(cssH));

    ctx.clearRect(0, 0, width, height);
    handleParticles(ctx, width, height);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    resizeCanvas();

    if (!followModeRef.current) {
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
      for (let i = 0; i < maxFollowRef.current; i++) {
        spotsRef.current.push(
          new Particle(cssW, cssH, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
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
    window.addEventListener("mouseout", handleMouseOut);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      const { width: cssW, height: cssH } = rect;
      for (let i = 0; i < 2; i++) {
        spotsRef.current.push(
          new Particle(cssW, cssH, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
          })
        );
      }
    };

    if (followMode) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [followMode]);

  useEffect(() => {
    if (!followMode && spotsRef.current.length === 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
      for (let i = 0; i < maxFollowRef.current; i++) {
        spotsRef.current.push(
          new Particle(cssW, cssH, {
            followModeRef,
            lumRef,
            mouseRef,
            speedRef,
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
