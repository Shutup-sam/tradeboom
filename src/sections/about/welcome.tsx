'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { RevealText } from '@/components/ui/reveal-text';
import Image from 'next/image';

export function WelcomeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern-sm opacity-30" />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: editorial header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40"
            >
              <span className="h-px w-8 bg-white/30" />
              A Letter From The Founder
            </motion.div>

            <RevealText
              delay={0.1}
              className="mt-6 font-display text-display-lg font-light leading-[1.05] text-white"
            >
              <h2>
                Welcome to{' '}
                <span className="italic text-gradient-aurora">Trade Boom.</span>
              </h2>
            </RevealText>

            <RevealText
              delay={0.2}
              className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-white/40"
            >
              <p>— Ankit Kumar & Rishav Kumar</p>
            </RevealText>

            {/* Founders Photo Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2 backdrop-blur-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src="/founders.jpg"
                  alt="Ankit Kumar and Rishav Kumar — Founders of Trade Boom"
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-semibold text-white">Ankit Kumar & Rishav Kumar</p>
                    <p className="text-[10px] text-white/60">Founders & Lead Mentors</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: editorial body */}
          <div className="lg:col-span-7">
            <RevealText
              delay={0.15}
              className="text-xl font-light leading-relaxed text-white/80 sm:text-2xl"
            >
              <p>
                Learning to trade is not just about understanding charts and numbers — it is about
                mastering the psychology, strategies, discipline, and risk management required to
                succeed in today&apos;s financial markets.
              </p>
            </RevealText>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-white/60 sm:text-lg">
              <RevealText delay={0.25}>
                <p>
                  Founded by experienced traders Ankit Kumar and Rishav Kumar, Trade Boom provides practical
                  education, structured learning, real market insights, and mentorship designed to
                  help traders build confidence and consistency. There are no shortcuts here — only
                  frameworks, discipline, and the daily work of getting a little better.
                </p>
              </RevealText>
              <RevealText delay={0.35}>
                <p>
                  Whether you are just beginning or refining advanced techniques, our mission is to
                  help you grow through disciplined learning rather than hype. We will not promise
                  you overnight success. We will promise you a clear path, honest guidance, and a
                  community that takes the craft seriously.
                </p>
              </RevealText>
            </div>

            {/* Highlight boxes */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: 'Founded', value: '2021' },
                { label: 'Headquartered', value: 'India' },
                { label: 'Approach', value: 'Discipline First' },
                { label: 'Promise', value: 'No Hype' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-medium text-white sm:text-xl">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
