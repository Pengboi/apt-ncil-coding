"use client";

import Link from "next/link";
import { useState } from "react";
import HoloCard from "./HoloCard";

interface PokemonForm {
  id: string;
  name: string;
  img: string;
}

interface PokemonFamilyCardProps {
  baseName: string;
  forms: PokemonForm[];
  defaultFormId: string;
}

export default function PokemonFamilyCard({ baseName, forms, defaultFormId }: PokemonFamilyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const defaultForm = forms.find((f) => f.id === defaultFormId) || forms[0];
  const hasMultipleForms = forms.length > 1;

  const formatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Link href={`/pokemon/${defaultFormId}`}>
      <HoloCard 
        className="h-full"
        intensity={0.5}
      >
        <div
          className="card h-full flex flex-col items-center p-4 relative overflow-hidden group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ID Badge */}
          <div className="absolute top-3 left-3 font-data text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
            #{defaultForm.id.padStart(3, "0")}
          </div>

          {/* Form count badge if multiple */}
          {hasMultipleForms && (
            <div className="absolute top-3 right-3 font-data text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded-full border border-cyan-800/50">
              {forms.length} forms
            </div>
          )}

          {/* Pokemon Image */}
          <div className="relative w-28 h-28 mt-2 mb-3">
            {/* Glow effect behind image */}
            <div 
              className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)",
                opacity: isHovered ? 1 : 0.5,
              }}
            />
            
            <img
              src={defaultForm.img}
              alt={defaultForm.name}
              className={`
                w-full h-full object-contain relative z-10 transition-all duration-300
                ${isHovered ? "scale-110 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]" : "grayscale-[20%]"}
              `}
              loading="lazy"
            />
          </div>

          {/* Pokemon Name */}
          <h3 className="font-display text-sm font-semibold text-white text-center capitalize mb-1 group-hover:text-cyan-400 transition-colors">
            {formatName(baseName)}
          </h3>

          {/* Form indicators */}
          {hasMultipleForms && (
            <div className="flex gap-1 mt-2">
              {forms.map((form, idx) => (
                <div
                  key={form.id}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === 0 ? "bg-cyan-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover line effect */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-300"
            style={{
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </div>
      </HoloCard>
    </Link>
  );
}
