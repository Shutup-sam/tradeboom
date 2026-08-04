'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
};

export function RevealText({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.8,
  as: Tag = 'div',
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

type SplitRevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
};

export function SplitRevealText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.04,
  duration = 0.9,
}: SplitRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <div ref={className ? undefined : ref} className={cn('overflow-hidden', className)}>
      <span ref={ref} className="inline-block">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{
                duration,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
