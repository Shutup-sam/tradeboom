'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type SectionDividerProps = {
  label?: string;
  className?: string;
};

export function SectionDivider({ label, className }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn('relative flex w-full items-center justify-center py-12', className)}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 rounded-full bg-ink-950 px-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
