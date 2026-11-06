"use client";

import React, { useRef, useState } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0.1 to 0.5
  className?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  strength = 0.25,
  className = "",
  style = {}
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on coarse pointers (touch screens)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0
          ? "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Spring bounce return
          : "transform 0.1s ease-out"
      }}
    >
      {children}
    </div>
  );
}
