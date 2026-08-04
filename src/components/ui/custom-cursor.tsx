'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/components/providers/cursor-provider';

export function CustomCursor() {
  const { variant, label } = useCursor();
  const [isCoarse, setIsCoarse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 18, stiffness: 120, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener('change', onChange);

    if (mq.matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      mq.removeEventListener('change', onChange);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isCoarse) return null;

  const size = variant === 'default' ? 12 : variant === 'text' ? 4 : 48;
  const showLabel = variant !== 'default' && variant !== 'text';
  const isHover = variant !== 'default' && variant !== 'text';

  return (
    <>
      {/* Trailing glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.35 : 0,
          scale: isHover ? 1.4 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-electric-500/30 to-emerald-500/20 blur-2xl" />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[101] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: size,
          height: size,
        }}
        transition={{
          opacity: { duration: 0.2 },
          width: { type: 'spring', damping: 20, stiffness: 250 },
          height: { type: 'spring', damping: 20, stiffness: 250 },
        }}
      >
        <div
          className={`h-full w-full rounded-full border transition-colors duration-200 ${
            isHover
              ? 'border-electric-400/80 bg-electric-500/10 backdrop-blur-sm'
              : 'border-white/60 bg-white'
          }`}
        />
        {showLabel && (
          <span className="absolute text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {label || variant}
          </span>
        )}
      </motion.div>
    </>
  );
}
