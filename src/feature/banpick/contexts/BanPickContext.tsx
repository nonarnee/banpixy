import { createContext, useContext, ReactNode } from 'react';
import useBanPick from '../hooks/useBanPick';

const BanPickContext = createContext<ReturnType<typeof useBanPick> | null>(null);

export function BanPickProvider({ children }: { children: ReactNode }) {
  const banPickState = useBanPick();

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
