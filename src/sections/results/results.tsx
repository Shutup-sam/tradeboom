'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { TESTIMONIALS } from '@/lib/market-data';
import { cn } from '@/lib/utils';

export function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="results"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Results"
          title={
            <>
              The kind of trading career{' '}
              <span className="italic text-gradient-aurora">we want for you.</span>
            </>
          }
          subtitle="From complete beginners to full-time traders. Here is what consistent, disciplined work looks like."
          align="center"
        />

        <div className="mt-16">
          <TestimonialCarousel active={active} setActive={setActive} />
        </div>

        {/* Stats grid */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '4.9', label: 'Average Rating', suffix: '/5' },
            { value: '89', label: 'Completion Rate', suffix: '%' },
            { value: '2,400', label: 'Verified Reviews' },
            { value: '67', label: 'Countries Reached', suffix: '+' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm sm:p-6"
            >
              <p className="font-display text-3xl font-light text-white sm:text-4xl">
                {s.value}
                <span className="text-white/40">{s.suffix}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel({
  active,
  setActive,
}: {
  active: number;
  setActive: (n: number) => void;
}) {
  const current = TESTIMONIALS[active];

  return (
    <div className="relative">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Main testimonial card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 backdrop-blur-2xl sm:p-10 lg:p-12">
          <Quote className="absolute right-6 top-6 h-12 w-12 text-electric-500/15 sm:h-16 sm:w-16" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              <blockquote className="mt-6 font-display text-2xl font-light leading-snug text-white sm:text-3xl lg:text-4xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric-500/20 to-emerald-500/20 font-display text-lg text-white">
                  {current.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{current.name}</p>
                  <p className="text-xs text-white/50">
                    {current.role} · {current.location}
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                  {current.course}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="group h-1 rounded-full transition-all"
                  aria-label={`Show testimonial ${i + 1}`}
                >
                  <span
                    className={cn(
                      'block h-full rounded-full transition-all',
                      i === active ? 'w-8 bg-white' : 'w-3 bg-white/20 group-hover:bg-white/40',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right list */}
        <div className="space-y-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all',
                i === active
                  ? 'border-white/[0.15] bg-white/[0.04]'
                  : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.02]',
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-500/20 to-emerald-500/20 font-display text-sm text-white">
                {t.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{t.name}</p>
                <p className="truncate text-xs text-white/50">
                  {t.role} · {t.course}
                </p>
              </div>
              {i === active && (
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
