'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BLOG_POSTS } from '@/lib/market-data';
import { useCursor } from '@/components/providers/cursor-provider';
import { cn } from '@/lib/utils';

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setVariant } = useCursor();
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <section
      id="blog"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading
            eyebrow="Editorial"
            title={
              <>
                Insights from the{' '}
                <span className="italic text-gradient-aurora">trading floor.</span>
              </>
            }
            subtitle="Long-form essays on trading psychology, market structure, and the discipline required to stay in the game."
          />
          <a
            href="#"
            onMouseEnter={() => setVariant('view', 'Read')}
            onMouseLeave={() => setVariant('default')}
            className="hidden items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white sm:inline-flex"
          >
            All articles
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Featured */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            onMouseEnter={() => setVariant('view', 'Read')}
            onMouseLeave={() => setVariant('default')}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-1 backdrop-blur-xl transition-colors hover:border-white/[0.18] lg:col-span-2 lg:row-span-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
              <BlogArt variant={0} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full border border-electric-400/30 bg-electric-500/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-200 backdrop-blur-md">
                  Featured
                </span>
                <span className="rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span>{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featured.readTime}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-light leading-tight text-white sm:text-3xl lg:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-electric-300">
                Read essay
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.a>

          {/* Other posts */}
          {rest.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              onMouseEnter={() => setVariant('view', 'Read')}
              onMouseLeave={() => setVariant('default')}
              className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all hover:border-white/[0.15] hover:bg-white/[0.04] sm:p-5"
            >
              <div
                className={cn(
                  'relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28',
                )}
              >
                <BlogArt variant={i + 1} small />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span className="font-medium uppercase tracking-[0.2em]">{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">
                  {post.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogArt({ variant, small = false }: { variant: number; small?: boolean }) {
  const palettes = [
    ['#5B82FF', '#3B5BFF', '#1F2FB8'],
    ['#10B981', '#059669', '#10B981'],
    ['#FACC15', '#EAB308', '#CA8A04'],
    ['#8B5CF6', '#7C3AED', '#6D28D9'],
    ['#EC4899', '#DB2777', '#BE185D'],
    ['#06B6D4', '#0891B2', '#0E7490'],
  ];
  const colors = palettes[variant % palettes.length];

  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors[1]} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill={`url(#g-${variant})`} />
      <rect width="200" height="140" fill="#0A0A0E" opacity="0.5" />
      {/* abstract trading art */}
      <g opacity="0.5" stroke={colors[2]} strokeWidth="1" fill="none">
        <path d="M 0 100 L 20 90 L 30 95 L 50 70 L 65 80 L 80 50 L 100 60 L 120 40 L 140 50 L 160 30 L 180 40 L 200 25" />
        <path d="M 0 110 L 20 100 L 30 105 L 50 85 L 65 90 L 80 70 L 100 80 L 120 60 L 140 70 L 160 50 L 180 60 L 200 45" opacity="0.4" />
      </g>
      <g opacity="0.4" fill={colors[0]}>
        {Array.from({ length: small ? 8 : 14 }).map((_, i) => (
          <rect
            key={i}
            x={20 + i * (small ? 22 : 12)}
            y={100 + (i % 3) * 4}
            width="2"
            height={20 + (i % 4) * 8}
          />
        ))}
      </g>
      <circle cx="40" cy="30" r="20" fill={colors[0]} opacity="0.2" />
    </svg>
  );
}
