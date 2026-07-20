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
  const [previewForm, setPreviewForm] = useState<PokemonForm | null>(null);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  
  const defaultForm = forms.find((f) => f.id === defaultFormId) || forms[0];
  const hasMultipleForms = forms.length > 1;
  
  // Use preview form if hovering a thumbnail, otherwise use default
  const currentForm = previewForm || defaultForm;

  const formatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getFormDisplayName = (formName: string) => {
    if (formName === baseName) return "Default";
    const suffix = formName.replace(`${baseName}-`, "");
    const formattedSuffix = formatName(suffix);
    // Return full descriptive name like "Charizard Mega X"
    return `${formatName(baseName)} ${formattedSuffix}`;
  };

  // Handle thumbnail hover with smooth transition
  const handleThumbnailEnter = (form: PokemonForm) => {
    if (form.id !== currentForm.id) {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setPreviewForm(form);
        setIsImageTransitioning(false);
      }, 150);
    }
  };

  const handleThumbnailLeave = () => {
    if (previewForm) {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setPreviewForm(null);
        setIsImageTransitioning(false);
      }, 150);
    }
  };

  // Determine display name
  const isShowingVariant = previewForm && previewForm.name !== baseName;
  const displayName = isShowingVariant 
    ? getFormDisplayName(currentForm.name)
    : formatName(baseName);

  return (
    <HoloCard 
      className="h-full"
      intensity={0.5}
    >
      <div
        className="card h-full min-h-[280px] flex flex-col p-4 relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleThumbnailLeave();
        }}
      >
        {/* ID Badge - Updates with preview */}
        <div className="absolute top-3 left-3 font-data text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full transition-all duration-300">
          #{currentForm.id.padStart(3, "0")}
        </div>

        {/* Form count badge if multiple */}
        {hasMultipleForms && (
          <div className="absolute top-3 right-3 font-data text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded-full border border-cyan-800/50">
            {forms.length} forms
          </div>
        )}

        {/* Main Content - Grows to fill space */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Main Pokemon Image - Updates with preview */}
          <Link 
            href={`/pokemon/${currentForm.id}`} 
            className="relative w-28 h-28 mt-8 cursor-pointer"
          >
            {/* Glow effect behind image */}
            <div 
              className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)",
                opacity: isHovered ? 1 : 0.5,
              }}
            />
            
            {/* Image with fade transition */}
            <div className="relative w-full h-full">
              <img
                src={currentForm.img}
                alt={currentForm.name}
                className={`
                  absolute inset-0 w-full h-full object-contain z-10 transition-all duration-300
                  ${isHovered ? "scale-110 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]" : "grayscale-[20%]"}
                  ${isImageTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}
                `}
                loading="lazy"
              />
            </div>
          </Link>

          {/* Pokemon Name - Updates with preview and animates */}
          <Link href={`/pokemon/${currentForm.id}`} className="mt-3">
            <h3 
              className={`
                font-display text-sm font-semibold text-center transition-all duration-300 cursor-pointer
                ${isShowingVariant ? "text-cyan-400" : "text-white group-hover:text-cyan-400"}
                ${isImageTransitioning ? "opacity-70 translate-y-0.5" : "opacity-100 translate-y-0"}
              `}
            >
              {displayName}
            </h3>
            
            {/* Show base name as subtitle when viewing variant */}
            {isShowingVariant && (
              <p 
                className={`
                  font-data text-[10px] text-slate-500 text-center mt-0.5
                  transition-all duration-300
                  ${isImageTransitioning ? "opacity-0" : "opacity-100"}
                `}
              >
                {formatName(baseName)}
              </p>
            )}
          </Link>
        </div>

        {/* Form Thumbnails - Always at bottom */}
        {hasMultipleForms && (
          <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
            {forms.map((form) => (
              <div
                key={form.id}
                className="group/form relative"
                onMouseEnter={() => handleThumbnailEnter(form)}
                onMouseLeave={() => {}}
                title={getFormDisplayName(form.name)}
              >
                <Link href={`/pokemon/${form.id}`}>
                  <div 
                    className={`
                      w-8 h-8 rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${form.id === currentForm.id 
                        ? "border-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.4)]" 
                        : "border-slate-600 hover:border-slate-400"
                      }
                    `}
                  >
                    <img
                      src={form.img}
                      alt={getFormDisplayName(form.name)}
                      className="w-full h-full object-contain bg-slate-800/50"
                      loading="lazy"
                    />
                  </div>
                </Link>
                
                {/* Tooltip */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-data text-[9px] text-slate-400 whitespace-nowrap opacity-0 group-hover/form:opacity-100 transition-opacity">
                  {getFormDisplayName(form.name)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer for cards without forms to maintain consistent height */}
        {!hasMultipleForms && <div className="h-10" />}

        {/* Hover line effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-300"
          style={{
            transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>
    </HoloCard>
  );
}
