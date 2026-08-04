'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'electric' | 'outline';
  className?: string;
  icon?: ReactNode;
};

const variants = {
  default: 'bg-white/5 text-white/80 border-white/10',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  warning: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  electric: 'bg-electric-500/10 text-electric-300 border-electric-500/20',
  outline: 'bg-transparent text-white/70 border-white/15',
};

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide',
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
