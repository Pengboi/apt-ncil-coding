"use client";

import React, { useEffect, useState } from "react";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  animated?: boolean;
  delay?: number;
}

const statColors: Record<string, string> = {
  hp: "#7AC74C",
  attack: "#EE8130",
  defense: "#F7D02C",
  "special-attack": "#F95587",
  "special-defense": "#6390F0",
  speed: "#96D9D6",
};

export default function StatBar({
  label,
  value,
  max = 255,
  color,
  animated = true,
  delay = 0,
}: StatBarProps) {
  const [width, setWidth] = useState(animated ? 0 : (value / max) * 100);
  
  const barColor = color || statColors[label.toLowerCase().replace(/\s/g, "-")] || "#00d4ff";

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setWidth((value / max) * 100);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animated, value, max, delay]);

  const formatLabel = (label: string) => {
    return label
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-data text-sm text-slate-300 uppercase tracking-wider">
          {formatLabel(label)}
        </span>
        <span 
          className="font-data text-sm font-semibold"
          style={{ color: barColor }}
        >
          {value}
        </span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full stat-bar-fill relative"
          style={{
            width: `${width}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 10px ${barColor}60`,
          }}
        >
          <div 
            className="absolute inset-0 animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${barColor}40 50%, transparent 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
