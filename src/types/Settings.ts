export interface TimerConfig {
  enabled: boolean;
  duration: number;
}

export interface BanPickSettings {
  timer: TimerConfig;
  globalBans: string[]; // champion ids
}
