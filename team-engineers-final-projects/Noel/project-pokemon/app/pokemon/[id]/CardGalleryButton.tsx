"use client";

import { useState } from "react";
import CardGallery from "../../CardGallery";

interface CardGalleryButtonProps {
  name: string;
  searchName?: string;
}

export default function CardGalleryButton({ name, searchName }: CardGalleryButtonProps) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowGallery(true)}
        className="w-full glass rounded-lg p-3 text-left hover:border-cyan-500/50 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                TCG Cards
              </h3>
              <p className="font-data text-[10px] text-slate-500">
                View trading cards
              </p>
            </div>
          </div>
          <svg
            className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {showGallery && (
        <CardGallery name={name} searchName={searchName} onClose={() => setShowGallery(false)} />
      )}
    </>
  );
}
