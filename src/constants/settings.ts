import { BanPickSettings } from '@/types/Settings';

export const DEFAULT_SETTINGS: BanPickSettings = {
  timer: {
    enabled: false,
    duration: 30,
  },
  globalBans: [],
};
