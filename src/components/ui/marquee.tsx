'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  pauseOnHover?: boolean;
};

const speeds = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export function Marquee({ children, className, speed = 'normal', reverse = false, pauseOnHover = true }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className={cn(
        'group relative flex w-full overflow-hidden',
        pauseOnHover && 'pause-on-hover',
        className,
      )}
    >
      <motion.div
        className="flex shrink-0"
        animate={isInView ? { x: reverse ? '0%' : '-50%' } : { x: '0%' }}
        transition={{
          duration: 100 / (speed === 'slow' ? 0.5 : speed === 'normal' ? 1 : 1.6),
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ animationDuration: speeds[speed] }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
