import { createContext, useContext } from 'react';
import useBanPickSettings from '../hooks/useBanPickSettings';

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsContext = createContext<
  ReturnType<typeof useBanPickSettings>
  | null
>(null);

export function SettingsProvider({ children }: SettingsProviderProps) {
  const settings = useBanPickSettings();

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }

  return context;
}
