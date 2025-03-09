import { createContext, useContext, ReactNode } from 'react';
import useBanPick from '../hooks/useBanPick';
import { Champion } from '@/types/Champion';

const BanPickContext = createContext<ReturnType<typeof useBanPick> | null>(null);

interface BanPickProviderProps {
  children: ReactNode;
  champions: Champion[];
}

export function BanPickProvider({ children, champions }: BanPickProviderProps) {
  const banPickState = useBanPick(champions);

  return (
    <BanPickContext.Provider value={banPickState}>
      {children}
    </BanPickContext.Provider>
  );
}

export function useBanPickContext() {
  const context = useContext(BanPickContext);
  if (!context) {
    throw new Error('useBanPickContext must be used within a BanPickProvider');
  }
  return context;
} 
