'use client';

import { useState, useEffect, useRef } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already loaded (cached)
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  // If image fails to load, show fallback
  if (error) {
    return (
      <div className={`bg-gradient-to-br from-emerald-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center ${className}`}>
        <span className="text-6xl">🌹</span>
        <span className="text-sm text-gray-600 mt-2">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder - only shows while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-purple-100 to-pink-100 animate-pulse flex items-center justify-center z-10">
          <span className="text-4xl">🌹</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => {
          console.error('Image failed to load:', src);
          setError(true);
        }}
        onLoad={() => {
          console.log('Image loaded:', src);
          setLoaded(true);
        }}
        style={{ 
          opacity: loaded ? 1 : 0, 
          transition: 'opacity 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}
      />
    </div>
  );
}
