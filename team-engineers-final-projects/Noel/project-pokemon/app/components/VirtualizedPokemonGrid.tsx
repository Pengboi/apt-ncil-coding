"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import PokemonFamilyCard from "./PokemonFamilyCard";

interface PokemonForm {
  id: string;
  name: string;
  img: string;
}

interface PokemonFamily {
  baseName: string;
  forms: PokemonForm[];
  defaultFormId: string;
}

interface VirtualizedPokemonGridProps {
  families: PokemonFamily[];
  isLoaded: boolean;
}

// Number of columns at different breakpoints
const getColumnCount = (width: number): number => {
  if (width >= 1280) return 6; // xl
  if (width >= 1024) return 5; // lg
  if (width >= 768) return 4; // md
  if (width >= 640) return 3; // sm
  return 2; // default
};

// Card height + gap
const ROW_HEIGHT = 288; // min-h-[280px] + gap
const BUFFER_ROWS = 3; // Extra rows to render above/below viewport

export default function VirtualizedPokemonGrid({ families, isLoaded }: VirtualizedPokemonGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Track container dimensions and scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setContainerHeight(window.innerHeight - rect.top);
      setContainerWidth(rect.width);
    };

    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate grid layout
  const columnCount = useMemo(() => getColumnCount(containerWidth), [containerWidth]);
  const rowCount = Math.ceil(families.length / columnCount);
  
  // Calculate visible range
  const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;
  const relativeScroll = Math.max(0, -containerTop + scrollTop);
  
  const startRow = Math.floor(relativeScroll / ROW_HEIGHT);
  const visibleRowCount = Math.ceil(containerHeight / ROW_HEIGHT);
  
  const overscanStart = Math.max(0, startRow - BUFFER_ROWS);
  const overscanEnd = Math.min(rowCount, startRow + visibleRowCount + BUFFER_ROWS);
  
  // Get families to render
  const visibleFamilies = useMemo(() => {
    const startIndex = overscanStart * columnCount;
    const endIndex = Math.min(families.length, overscanEnd * columnCount);
    return families.slice(startIndex, endIndex).map((family, index) => ({
      ...family,
      gridIndex: startIndex + index,
    }));
  }, [families, overscanStart, overscanEnd, columnCount]);

  // Total height for scroll container
  const totalHeight = rowCount * ROW_HEIGHT;

  if (families.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      <div 
        className="absolute w-full"
        style={{
          top: overscanStart * ROW_HEIGHT,
        }}
      >
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {visibleFamilies.map((family, index) => (
            <div
              key={family.baseName}
              className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ 
                animationDelay: `${Math.min(index * 20, 500)}ms`,
                height: ROW_HEIGHT - 16, // Account for gap
              }}
            >
              <PokemonFamilyCard
                baseName={family.baseName}
                forms={family.forms}
                defaultFormId={family.defaultFormId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
