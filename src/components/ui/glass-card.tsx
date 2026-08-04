'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type GlassCardProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  gradient?: boolean;
};

export function GlassCard({ children, hover = true, className, gradient = false, ...rest }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl',
        hover && 'transition-colors hover:border-white/[0.15]',
        className,
      )}
      {...rest}
    >
      {gradient && (
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-electric-500/0 via-electric-500/10 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
