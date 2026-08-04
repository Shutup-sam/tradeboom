'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, ShieldCheck, Scale, BookOpen, TrendingUp, Users } from 'lucide-react';

const DISCLAIMER_POINTS = [
  {
    icon: BookOpen,
    title: 'Educational Content Only',
    text: 'Trade Boom provides educational content solely for learning and informational purposes. All material is presented strictly for education and should not be interpreted as financial, legal, tax, or investment advice.',
  },
  {
    icon: Scale,
    title: 'Not SEBI Registered',
    text: 'Please note that Trade Boom is not registered with SEBI. If you are considering investing in financial, derivatives, index, or advisory products, we strongly recommend that you consult your financial advisor before making any investment decisions.',
  },
  {
    icon: TrendingUp,
    title: 'Risk Awareness',
    text: 'Trading and investing in equities, derivatives, commodities, forex, or cryptocurrencies involve substantial financial risk and may not be suitable for every individual. Past performance is not a guarantee of future results.',
  },
  {
    icon: Users,
    title: 'Personal Responsibility',
    text: 'Always perform your own research and consult a qualified financial advisor before making any investment or trading decisions. Users remain solely responsible for their financial decisions.',
  },
];

export function DisclaimerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/[0.12] bg-gradient-to-br from-amber-500/[0.04] via-white/[0.02] to-rose-500/[0.03] p-6 backdrop-blur-xl sm:p-10"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-rose-500/8 blur-[60px]" />

          {/* Header */}
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-[0_0_24px_-6px_rgba(234,179,8,0.3)]"
            >
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-light text-white sm:text-3xl">
                Important Disclaimer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50 max-w-3xl">
                Please read this carefully before using any of our educational content or services. Please note that Trade Boom is not registered with SEBI. If you are considering investing in financial, derivatives, index, or advisory products, we strongly recommend that you consult your financial advisor before making any investment decisions.
              </p>
            </div>
          </div>

          {/* Points grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="relative mt-8 grid gap-4 sm:grid-cols-2"
          >
            {DISCLAIMER_POINTS.map((point) => (
              <motion.div
                key={point.title}
                variants={item}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <point.icon className="h-4 w-4 text-amber-400/80" />
                </div>
                <h4 className="text-sm font-medium text-white/80">{point.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom badge bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/60">Educational use only</p>
                <p className="text-[11px] text-white/35">No investment advice · No guaranteed returns</p>
              </div>
            </div>
            <p className="text-[11px] text-white/30">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
