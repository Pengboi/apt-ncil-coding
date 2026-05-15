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
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  if (error) {
    return (
      <div className={`bg-[var(--linen)] flex flex-col items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-[var(--taupe)] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span className="text-sm text-[var(--taupe)] mt-2 font-italic-display">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--linen)] animate-pulse flex items-center justify-center z-10">
          <svg className="w-8 h-8 text-[var(--taupe)] opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        style={{ 
          opacity: loaded ? 1 : 0, 
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
}
