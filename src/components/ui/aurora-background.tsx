'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AuroraBackgroundProps = {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
};

export function AuroraBackground({ className, intensity = 'medium' }: AuroraBackgroundProps) {
  const opacities = {
    low: 0.2,
    medium: 0.4,
    high: 0.7,
  };
  const o = opacities[intensity];

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.div
        className="absolute -left-1/4 top-0 h-[80vh] w-[80vh] rounded-full bg-gradient-to-br from-electric-500 to-violet-500 blur-[120px]"
        style={{ opacity: o * 0.6 }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 blur-[100px]"
        style={{ opacity: o * 0.5 }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-electric-600 to-electric-400 blur-[100px]"
        style={{ opacity: o * 0.4 }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
