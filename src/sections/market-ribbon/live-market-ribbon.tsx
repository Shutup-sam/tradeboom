'use client';

import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { TICKER_ITEMS } from '@/lib/market-data';
import { cn } from '@/lib/utils';

function useDriftX(speed: number) {
  const x = useMotionValue(0);
  const last = useRef(0);
  useAnimationFrame((time) => {
    const dt = last.current === 0 ? 16 : time - last.current;
    last.current = time;
    const next = x.get() - speed * dt;
    x.set(next);
  });
  return x;
}

type LiveTickerItem = (typeof TICKER_ITEMS)[number] & {
  lastDirection?: 'up' | 'down';
  lastUpdate?: number;
};

type TickerRowProps = {
  reverse?: boolean;
  speed?: number;
  tickers: LiveTickerItem[];
};

function TickerRow({ reverse = false, speed = 0.03, tickers }: TickerRowProps) {
  const driftX = useDriftX(reverse ? -speed : speed);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scrollTransform = useTransform(scrollY, [0, 1000], [0, reverse ? 150 : -150]);
  
  const x = useTransform([driftX, scrollTransform], ([d, s]) => (d as number) + (s as number));

  useEffect(() => {
    if (ref.current) setWidth(ref.current.scrollWidth / 2);
  }, []);

  useEffect(() => {
    if (!width) return;
    let frame: number;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      let next = driftX.get() + (reverse ? speed * dt : -speed * dt);
      if (reverse && next > 0) next = -width;
      if (!reverse && next < -width) next = 0;
      driftX.set(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [width, driftX, speed, reverse]);

  return (
    <motion.div ref={ref} style={{ x }} className="flex shrink-0 gap-2 pr-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex shrink-0 gap-2 pr-2">
          {tickers.map((t) => (
            <TickerChip key={`${i}-${t.symbol}`} ticker={t} />
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function TickerChip({ ticker }: { ticker: LiveTickerItem }) {
  const isUp = ticker.change >= 0;
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (ticker.lastDirection && ticker.lastUpdate && Date.now() - ticker.lastUpdate < 1000) {
      setFlash(ticker.lastDirection);
      const timer = setTimeout(() => setFlash(null), 800);
      return () => clearTimeout(timer);
    }
  }, [ticker.price, ticker.lastDirection, ticker.lastUpdate]);

  return (
    <div
      className={cn(
        'group flex shrink-0 items-center gap-3 rounded-full border px-3.5 py-1.5 backdrop-blur-md transition-all duration-300',
        flash === 'up' && 'border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.15)] scale-[1.02]',
        flash === 'down' && 'border-crimson-500/30 bg-crimson-500/10 shadow-[0_0_12px_rgba(239,68,68,0.15)] scale-[1.02]',
        !flash && 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]',
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
        {ticker.symbol}
      </span>
      <span
        className={cn(
          'font-mono text-xs font-medium tabular-nums transition-colors duration-300',
          flash === 'up' ? 'text-emerald-400' : flash === 'down' ? 'text-crimson-400' : 'text-white',
        )}
      >
        {ticker.price.toLocaleString('en-US', {
          minimumFractionDigits: ticker.price < 2 ? 4 : 2,
          maximumFractionDigits: ticker.price < 2 ? 4 : 2,
        })}
      </span>
      <span
        className={cn(
          'flex items-center gap-1 font-mono text-[11px] font-medium tabular-nums transition-colors duration-300',
          isUp ? 'text-emerald-400' : 'text-crimson-400',
        )}
      >
        {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {isUp ? '+' : ''}
        {ticker.changePercent.toFixed(2)}%
      </span>
    </div>
  );
}

export function LiveMarketRibbon() {
  const [tickers, setTickers] = useState<LiveTickerItem[]>(TICKER_ITEMS);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          if (Math.random() > 0.4) return t;

          const pct = (Math.random() * 0.3 - 0.15) / 100;
          const priceChange = t.price * pct;
          const newPrice = Math.max(0.0001, t.price + priceChange);
          const newChange = t.change + priceChange;
          const newChangePercent = t.changePercent + pct * 100;

          return {
            ...t,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            lastDirection: pct >= 0 ? 'up' : 'down',
            lastUpdate: Date.now(),
          };
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full overflow-hidden border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex h-9 items-center overflow-hidden">
        <div className="z-20 flex h-full shrink-0 items-center gap-2 border-r border-white/[0.06] bg-ink-950 px-4">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Live
          </span>
        </div>
        <div className="flex-1 overflow-hidden py-1.5">
          <div className="flex">
            <TickerRow speed={0.04} tickers={tickers} />
          </div>
        </div>
      </div>
    </div>
  );
}
