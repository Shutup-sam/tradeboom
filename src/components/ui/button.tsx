'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
  href?: string;
  type?: 'button' | 'submit';
  strength?: number;
  asChild?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-ink-950 hover:bg-white/90 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]',
  secondary:
    'bg-gradient-to-br from-electric-500 to-electric-700 text-white hover:shadow-[0_0_50px_-10px_rgba(91,130,255,0.6)]',
  ghost:
    'bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md',
  outline:
    'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
  xl: 'h-16 px-10 text-base',
};

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  type = 'button',
  strength = 30,
  fullWidth = false,
  icon,
  iconRight,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * (strength / 100));
    y.set(offsetY * (strength / 100));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? motion.a : motion.button;
  const props = href ? { href } : { type, onClick, disabled };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter as any}
      onMouseLeave={(e) => {
        handleMouseLeave();
        onMouseLeave?.(e as any);
      }}
      className={cn('relative inline-flex', fullWidth && 'w-full', disabled && 'pointer-events-none')}
    >
      <Comp
        {...(props as any)}
        style={{ x: sx, y: sy }}
        className={cn(
          'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 will-change-transform',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        {/* Shine sweep */}
        {variant === 'primary' && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
        {variant === 'secondary' && (
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        {icon && <span className="relative z-10 inline-flex">{icon}</span>}
        <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
          {children}
          {iconRight && (
            <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5">
              {iconRight}
            </span>
          )}
        </span>
      </Comp>
    </div>
  );
}
