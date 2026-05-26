"use client";

import React from "react";

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

interface TypeBadgeProps {
  type: string;
  size?: "xs" | "sm" | "md" | "lg";
  glow?: boolean;
}

export default function TypeBadge({ type, size = "md", glow = true }: TypeBadgeProps) {
  const color = typeColors[type.toLowerCase()] || "#888888";
  
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-[8px]",
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-display font-semibold uppercase tracking-wider
        rounded-full border border-white/20
        transition-all duration-300
        ${sizeClasses[size]}
        ${glow ? "hover:scale-105" : ""}
      `}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        textShadow: glow ? `0 0 8px ${color}80` : "none",
        boxShadow: glow ? `0 0 15px ${color}30` : "none",
      }}
    >
      {type}
    </span>
  );
}
