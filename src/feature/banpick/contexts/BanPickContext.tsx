import { createContext, useContext } from 'react';
import useBanPick from '../hooks/useBanPick';
import { useChampionsContext } from '@/contexts/ChampionsContext';
import { useSettingsContext } from './SettingsContext';

const BanPickContext = createContext<
  ReturnType<typeof useBanPick>
  | null
>(null);

interface BanPickProviderProps {
  children: React.ReactNode;
}

export function BanPickProvider({ children }: BanPickProviderProps) {
  const champions = useChampionsContext();
  const { settings } = useSettingsContext();
  const banPickState = useBanPick(champions, settings);

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
