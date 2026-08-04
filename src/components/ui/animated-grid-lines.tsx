'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

type AnimatedGridLinesProps = {
  className?: string;
  rows?: number;
  cols?: number;
};

export function AnimatedGridLines({ className, rows = 6, cols = 12 }: AnimatedGridLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!isInView) return;
      t += 0.005;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const colW = w / cols;
      const rowH = h / rows;

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * colW;
        const phase = Math.sin(t + i * 0.5) * 0.5 + 0.5;
        const alpha = 0.05 + phase * 0.08;
        ctx.strokeStyle = `rgba(91, 130, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j <= rows; j++) {
        const y = j * rowH;
        const phase = Math.sin(t * 1.2 + j * 0.7) * 0.5 + 0.5;
        const alpha = 0.05 + phase * 0.08;
        ctx.strokeStyle = `rgba(91, 130, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isInView, rows, cols]);

  return (
    <div ref={ref} className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
