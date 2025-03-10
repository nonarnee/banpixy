export interface TimerConfig {
  enabled: boolean;
  duration: number;
}

export interface BanPickSettings {
  teamName: {
    blue: string;
    red: string;
  };
  timer: TimerConfig;
  globalBans: string[]; // champion ids
}
