'use client';

import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fallback gradient colors based on product type
  const getGradient = () => {
    if (alt.includes('Blue')) return 'from-blue-200 to-indigo-200';
    if (alt.includes('Red')) return 'from-red-200 to-rose-200';
    if (alt.includes('Pink')) return 'from-pink-200 to-rose-200';
    if (alt.includes('Purple')) return 'from-purple-200 to-violet-200';
    return 'from-violet-200 to-pink-200';
  };

  if (error) {
    return (
      <div className={`bg-gradient-to-br ${getGradient()} flex flex-col items-center justify-center ${className}`}>
        <span className="text-6xl mb-2">🌹</span>
        <span className="text-sm text-gray-600 text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} animate-pulse flex items-center justify-center`}>
          <span className="text-4xl">🌹</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
