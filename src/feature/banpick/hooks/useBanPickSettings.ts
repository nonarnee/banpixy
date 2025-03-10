import { useState, useEffect } from 'react';
import { DEFAULT_SETTINGS } from '@/constants/settings';
import { BanPickSettings } from '@/types/Settings';

export default function useBanPickSettings() {
  const [settings, setSettings] = useState<BanPickSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('banpick-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: BanPickSettings) => {
    setSettings(newSettings);
    localStorage.setItem('banpick-settings', JSON.stringify(newSettings));
  };

  return {
    settings,
    updateSettings,
  };
} 
