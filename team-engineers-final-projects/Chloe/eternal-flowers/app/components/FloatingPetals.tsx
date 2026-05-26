'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize petals
    const colors = ['rgba(232, 196, 196, 0.4)', 'rgba(212, 165, 116, 0.3)', 'rgba(107, 15, 26, 0.15)', 'rgba(240, 224, 224, 0.35)'];
    
    petalsRef.current = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      ctx.fillStyle = petal.color;

      // Draw a petal shape using bezier curves
      ctx.beginPath();
      ctx.moveTo(0, -petal.size / 2);
      ctx.bezierCurveTo(petal.size / 2, -petal.size / 2, petal.size / 2, petal.size / 2, 0, petal.size / 2);
      ctx.bezierCurveTo(-petal.size / 2, petal.size / 2, -petal.size / 2, -petal.size / 2, 0, -petal.size / 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        petal.y -= petal.speed;
        petal.x += Math.sin(petal.y * 0.01) * 0.3;
        petal.rotation += petal.rotationSpeed;

        // Reset petal when it goes off screen
        if (petal.y < -petal.size) {
          petal.y = canvas.height + petal.size;
          petal.x = Math.random() * canvas.width;
        }

        drawPetal(petal);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.6 }}
    />
  );
}
