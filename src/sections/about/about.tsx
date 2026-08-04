'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Eye, Award, Target, Heart, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { RevealText } from '@/components/ui/reveal-text';
import { TIMELINE, STATS } from '@/lib/market-data';

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Mission"
          title={
            <>
              Built by traders.{' '}
              <span className="italic text-gradient-aurora">For traders.</span>
            </>
          }
          subtitle="Trade Boom exists for one reason: to give retail traders the kind of rigorous, honest education most of us had to learn the hard way. We do not sell signals. We build skills."
        />

        {/* Mission + Vision */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: Compass,
              label: 'Our Mission',
              title: 'Make disciplined trading accessible.',
              body: 'We lower the barrier to high-quality trading education by combining structured curriculum, live mentorship, and a community that takes the craft seriously. Every program is built to teach you how to think — not what to buy.',
            },
            {
              icon: Eye,
              label: 'Our Vision',
              title: 'A generation of independent traders.',
              body: 'A world where retail traders approach the markets with the same rigor, process, and professionalism as institutions. Where decisions are made from frameworks — not feelings, signals, or social media.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-xl sm:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-electric-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                <item.icon className="h-4 w-4 text-electric-400" />
                {item.label}
              </div>
              <h3 className="mt-6 text-2xl font-light leading-tight text-white sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-white/60">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="mt-20">
          <RevealText className="text-center font-display text-2xl font-light leading-snug text-white sm:text-3xl md:text-4xl">
            <h3>
              &ldquo;Risk first. Process over outcome.{' '}
              <span className="italic text-gradient-aurora">Patience is the edge.</span>&rdquo;
            </h3>
          </RevealText>
        </div>

        {/* Trading philosophy pillars */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: 'Risk First', body: 'Capital preservation is the only job that matters.' },
            { icon: Zap, title: 'Process Wins', body: 'A great process produces good outcomes over time.' },
            { icon: Heart, title: 'Psychology', body: 'Discipline is the edge. Everything else is mechanics.' },
            { icon: Award, title: 'Track Record', body: 'Document everything. Review weekly. Iterate forever.' },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-white/[0.15] hover:bg-white/[0.04]"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <pillar.icon className="h-4 w-4 text-electric-400" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{pillar.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/55">{pillar.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent p-6 backdrop-blur-sm sm:gap-8 sm:p-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              className="text-center sm:text-left"
            >
              <div className="font-display text-4xl font-light text-white sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} duration={2.2} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="The Journey"
            title={
              <>
                From one losing trade to{' '}
                <span className="italic text-gradient-aurora">a movement.</span>
              </>
            }
          />

          <div className="relative mt-16">
            {/* Center line (desktop) */}
            <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent md:left-1/2" />

            <div className="space-y-12">
              {TIMELINE.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col gap-4 pl-12 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0 ${
                    i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-2 top-1 md:left-1/2 md:-translate-x-1/2">
                    <div className="relative h-3 w-3">
                      <div className="absolute inset-0 animate-pulse-soft rounded-full bg-electric-500/40" />
                      <div className="absolute inset-1 rounded-full bg-electric-400" />
                    </div>
                  </div>

                  <div className={`md:text-right ${i % 2 === 0 ? '' : 'md:text-left'}`}>
                    <p className="font-display text-3xl font-light text-white/90 sm:text-4xl">
                      {event.year}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/80">{event.title}</p>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-white/55">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
