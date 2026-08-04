'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type CursorVariant = 'default' | 'hover' | 'text' | 'view' | 'play' | 'enroll' | 'explore' | 'drag';

type CursorContextValue = {
  variant: CursorVariant;
  label: string;
  setVariant: (variant: CursorVariant, label?: string) => void;
};

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string>('');

  const setVariant = useCallback((next: CursorVariant, nextLabel = '') => {
    setVariantState(next);
    setLabel(nextLabel);
  }, []);

  return (
    <CursorContext.Provider value={{ variant, label, setVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
