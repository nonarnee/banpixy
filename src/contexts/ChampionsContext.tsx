import { Champion } from '@/types/Champion';
import { createContext, useContext } from 'react';

export const ChampionsContext = createContext<Champion[]>([]);

interface ChampionsProviderProps {
  children: React.ReactNode;
  champions: Champion[];
}

export function ChampionsProvider({ children, champions }: ChampionsProviderProps) {
  return (
    <ChampionsContext.Provider value={champions}>
      {children}
    </ChampionsContext.Provider>
  );
}

export function useChampionsContext() {
  return useContext(ChampionsContext);
}
