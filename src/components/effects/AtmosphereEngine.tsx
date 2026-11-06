"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  depth: number;
  isSpark: boolean;
  sparkRotation: number;
  sparkRotSpeed: number;
  twinkleSpeed: number;
}

export default function AtmosphereEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Palette: Vibrant Electric Aqua, Neon Cyan & Electric Sparks
    const colors = ["#00FFFF", "#00E5FF", "#00C9D8", "#1677FF", "#FFFFFF", "#7DD3FC"];

    // Mobile vs Desktop particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 24 : 52;

    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-init particles within bounds
      if (particles.length === 0) {
        particles = Array.from({ length: particleCount }, (_, idx) => {
          const isSpark = idx % 3 === 0; // 33% are twinkling electric sparks!
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -0.2 - Math.random() * 0.45, // Gentle drifting energy motes
            size: isSpark ? Math.random() * 2.8 + 1.2 : Math.random() * 2.0 + 0.8,
            baseAlpha: isSpark ? Math.random() * 0.5 + 0.35 : Math.random() * 0.4 + 0.15,
            alpha: 0,
            color: isSpark ? (Math.random() > 0.4 ? "#00FFFF" : "#FFFFFF") : colors[Math.floor(Math.random() * colors.length)],
            depth: Math.random() * 0.6 + 0.4,
            isSpark,
            sparkRotation: Math.random() * Math.PI,
            sparkRotSpeed: (Math.random() - 0.5) * 0.04,
            twinkleSpeed: Math.random() * 0.006 + 0.003
          };
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse Tracking for Interactive Displacement
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Visibility management to conserve GPU/battery when scrolled out
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        lastTime = performance.now();
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    let lastTime = performance.now();

    // Helper: Draw electric 4-point diamond star spark
    const drawElectricSpark = (x: number, y: number, r: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -r * 2);
      ctx.quadraticCurveTo(0, 0, r * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 2);
      ctx.quadraticCurveTo(0, 0, -r * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Draw subtle electric micro-arcs between nearby sparks
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1.isSpark) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2.isSpark) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxArcDist = 58;

          if (dist < maxArcDist) {
            const arcAlpha = (1 - dist / maxArcDist) * 0.28 * p1.alpha;
            ctx.save();
            ctx.strokeStyle = "#00FFFF";
            ctx.globalAlpha = arcAlpha;
            ctx.lineWidth = 1;
            ctx.shadowColor = "#00E5FF";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            // Slight electric zig-zag in center
            const midX = (p1.x + p2.x) / 2 + (Math.sin(time * 0.02 + i) * 2);
            const midY = (p1.y + p2.y) / 2 + (Math.cos(time * 0.02 + j) * 2);
            ctx.lineTo(midX, midY);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Update & render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Float upwards
        p.x += p.vx * p.depth * (dt * 60);
        p.y += p.vy * p.depth * (dt * 60);

        // Gentle horizontal oscillation
        p.x += Math.sin(time * 0.0012 * p.depth + i) * 0.2;
        p.sparkRotation += p.sparkRotSpeed;

        // Mouse displacement repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Wrap around bounds
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Draw particle with electric pulse & twinkle
        p.alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(time * p.twinkleSpeed + i));

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isSpark ? p.size * 5 : p.size * 3;

        if (p.isSpark) {
          drawElectricSpark(p.x, p.y, p.size, p.sparkRotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
