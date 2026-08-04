'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

function generateCandles(count: number, basePrice = 100, volatility = 2): Candle[] {
  const candles: Candle[] = [];
  let lastClose = basePrice;
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * volatility;
    const open = lastClose;
    const close = Math.max(10, open + change);
    const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
    candles.push({ open, close, high, low });
    lastClose = close;
  }
  return candles;
}

type CandlestickChartProps = {
  className?: string;
  candleCount?: number;
  density?: 'low' | 'medium' | 'high';
  colorScheme?: 'bull' | 'mixed';
};

export function CandlestickChart({
  className,
  candleCount = 60,
  density = 'medium',
  colorScheme = 'mixed',
}: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });
  const candles = useRef<Candle[]>(generateCandles(candleCount));
  const offset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let lastTime = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!isInView) return;
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;

      offset.current += dt * 0.005;
      if (offset.current > candles.current.length * 0.5) {
        offset.current = 0;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const all = [...candles.current, ...generateCandles(candleCount, candles.current[candles.current.length - 1].close)];
      const min = Math.min(...all.map((c) => c.low));
      const max = Math.max(...all.map((c) => c.high));
      const range = max - min || 1;
      const padding = 12;
      const candleW = (w - padding * 2) / (candleCount * 0.6);
      const gap = candleW * 0.4;

      all.forEach((c, i) => {
        const x = padding + (i - offset.current) * (candleW + gap);
        if (x < -candleW * 2 || x > w + candleW * 2) return;
        const yOpen = h - padding - ((c.open - min) / range) * (h - padding * 2);
        const yClose = h - padding - ((c.close - min) / range) * (h - padding * 2);
        const yHigh = h - padding - ((c.high - min) / range) * (h - padding * 2);
        const yLow = h - padding - ((c.low - min) / range) * (h - padding * 2);
        const isBull = c.close >= c.open;
        const color = isBull ? 'rgba(16, 185, 129,' : 'rgba(239, 68, 68,';

        // Wick
        ctx.strokeStyle = `${color} 0.6)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleW / 2, yHigh);
        ctx.lineTo(x + candleW / 2, yLow);
        ctx.stroke();

        // Body
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(1, Math.abs(yClose - yOpen));
        ctx.fillStyle = `${color} ${isBull ? 0.85 : 0.85})`;
        ctx.fillRect(x, bodyTop, candleW, bodyHeight);

        // Glow
        if (isBull) {
          ctx.fillStyle = `rgba(16, 185, 129, 0.1)`;
          ctx.fillRect(x - 2, bodyTop - 2, candleW + 4, bodyHeight + 4);
        }
      });
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isInView, candleCount, density, colorScheme]);

  return (
    <div ref={ref} className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
