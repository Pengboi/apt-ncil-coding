"use client";

import React, { useRef, useState } from "react";

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function HoloCard({ children, className = "", intensity = 1 }: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10 * intensity;
    const rotateY = ((x - centerX) / centerX) * 10 * intensity;
    
    setTransform({ rotateX, rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Holographic overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.6 : 0,
          background: `
            radial-gradient(
              circle at ${glowPosition.x}% ${glowPosition.y}%,
              rgba(0, 212, 255, 0.4) 0%,
              rgba(255, 0, 160, 0.3) 25%,
              rgba(255, 215, 0, 0.2) 50%,
              rgba(163, 230, 53, 0.1) 75%,
              transparent 100%
            )
          `,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Rainbow sheen */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-20 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.4 : 0,
          background: `
            linear-gradient(
              ${135 + transform.rotateY * 2}deg,
              transparent 0%,
              rgba(0, 212, 255, 0.3) 20%,
              rgba(255, 0, 160, 0.3) 40%,
              rgba(255, 215, 0, 0.3) 60%,
              rgba(163, 230, 53, 0.2) 80%,
              transparent 100%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
