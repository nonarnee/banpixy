import { BanPickSettings } from '@/types/Settings';

export const DEFAULT_SETTINGS: BanPickSettings = {
  teamName: {
    blue: '',
    red: '',
  },
  timer: {
    enabled: false,
    duration: 30,
  },
  globalBans: [],
};
