'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { CandlestickChart } from '@/components/ui/candlestick-chart';
import { AnimatedGridLines } from '@/components/ui/animated-grid-lines';
import { MagneticButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCursor } from '@/components/providers/cursor-provider';
import { SplitRevealText } from '@/components/ui/reveal-text';
import Image from 'next/image';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const { setVariant } = useCursor();

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      {/* Background market canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-50">
          <CandlestickChart className="h-full w-full" candleCount={80} />
        </div>
        <div className="absolute inset-0 opacity-30">
          <AnimatedGridLines className="h-full w-full" rows={6} cols={10} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-aurora-blue opacity-60" />
      </div>

      {/* Floating ambient orbs */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-[8%] top-[20%] h-32 w-32 rounded-full bg-electric-500/20 blur-3xl sm:h-48 sm:w-48"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[40%] h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl sm:h-64 sm:w-64"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Badge variant="electric" icon={<Sparkles className="h-3 w-3" />}>
                New Cohort Starting — September 2026
              </Badge>
            </motion.div>

            {/* Big Brand Logo and Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mt-8 sm:mt-10"
            >
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Image
                  src="/logo.svg"
                  alt="Trade Boom Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
                  Trade<span className="text-gradient-aurora">Boom</span>
                </h1>
                <p className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.3em] text-white/50 mt-2">
                  Master the Markets
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              Helping traders build discipline, confidence, and long-term consistency through
              practical education, structured mentorship, and real market experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <MagneticButton
                size="lg"
                variant="primary"
                onMouseEnter={() => setVariant('enroll', 'Enroll')}
                onMouseLeave={() => setVariant('default')}
                iconRight={<ArrowRight className="h-4 w-4" />}
                href="#courses"
              >
                Start Learning
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="outline"
                onMouseEnter={() => setVariant('view', 'View')}
                onMouseLeave={() => setVariant('default')}
                href="#mentorship"
              >
                Book Mentorship
              </MagneticButton>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-16"
            >
              {[
                { icon: Users, label: '12,400+ Active Students' },
                { icon: TrendingUp, label: '12+ Years Experience' },
                { icon: ShieldCheck, label: 'Discipline-First Approach' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs text-white/50">
                  <t.icon className="h-3.5 w-3.5 text-electric-400" />
                  {t.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Ankit portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-700/40 to-ink-800/60 backdrop-blur-xl">
              <Image
                src="/founders.jpg"
                alt="Ankit Kumar and Rishav Kumar — Founders of Trade Boom"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-electric-500/10 via-transparent to-emerald-500/10 mix-blend-overlay" />

              {/* Floating info badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink-950/60 px-3 py-1.5 backdrop-blur-md sm:left-6 sm:top-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                    Live Mentorship
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-ink-950/60 p-3 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                      Mentors
                    </p>
                    <p className="mt-1 text-lg font-semibold leading-snug text-white sm:text-xl">
                      Ankit Kumar
                      <br />
                      Rishav Kumar
                    </p>
                    <p className="text-xs text-white/50">Founders, Trade Boom</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-medium text-emerald-400">+218%</p>
                    <p className="text-[10px] text-white/40">5Y Track Record</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function PortraitArt() {
  // Premium illustrative portrait placeholder — animated, abstract
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="p-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A3A45" />
            <stop offset="100%" stopColor="#16161D" />
          </linearGradient>
          <linearGradient id="p-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D1D26" />
            <stop offset="100%" stopColor="#0A0A0E" />
          </linearGradient>
          <radialGradient id="p-glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="rgba(91, 130, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(91, 130, 255, 0)" />
          </radialGradient>
        </defs>

        {/* Glow */}
        <rect width="400" height="500" fill="url(#p-glow)" />

        {/* Jacket */}
        <path
          d="M 80 500 L 100 380 Q 200 340 300 380 L 320 500 Z"
          fill="url(#p-jacket)"
        />
        {/* Shirt collar */}
        <path
          d="M 170 380 L 200 410 L 230 380 L 220 360 L 200 365 L 180 360 Z"
          fill="#0F0F14"
          stroke="rgba(91, 130, 255, 0.4)"
          strokeWidth="1"
        />

        {/* Neck */}
        <rect x="180" y="320" width="40" height="50" fill="url(#p-skin)" />

        {/* Head */}
        <ellipse cx="200" cy="240" rx="65" ry="80" fill="url(#p-skin)" />

        {/* Hair */}
        <path
          d="M 140 220 Q 135 170 200 160 Q 265 170 260 220 Q 260 200 200 195 Q 140 200 140 220 Z"
          fill="#0A0A0E"
        />
        <path
          d="M 145 195 Q 150 175 200 170 Q 250 175 255 195"
          fill="none"
          stroke="#16161D"
          strokeWidth="2"
        />

        {/* Face features (minimal) */}
        <ellipse cx="180" cy="240" rx="2" ry="3" fill="#0A0A0E" />
        <ellipse cx="220" cy="240" rx="2" ry="3" fill="#0A0A0E" />
        <path
          d="M 188 280 Q 200 286 212 280"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Highlight */}
        <ellipse cx="180" cy="210" rx="20" ry="25" fill="rgba(255, 255, 255, 0.04)" />

        {/* Subtle frame line */}
        <rect
          x="1"
          y="1"
          width="398"
          height="498"
          fill="none"
          stroke="rgba(91, 130, 255, 0.1)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
