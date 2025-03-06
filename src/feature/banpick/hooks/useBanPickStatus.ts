import { BANPICK_TIME } from '@/constants/time';
import { useState, useCallback } from 'react';

export enum BanPickStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export interface TimerConfig {
  enabled: boolean;
  duration: number;
}

export default function useBanPickStatus() {
  const [currentStatus, setCurrentStatus] = useState<BanPickStatus>(BanPickStatus.READY);
  const [timerConfig, setTimerConfig] = useState<TimerConfig>({
    enabled: false,
    duration: BANPICK_TIME,
  });

  const updateTimerConfig = (config: Partial<TimerConfig>) => {
    setTimerConfig((prev) => ({ ...prev, ...config }));
  };

  const transition = (from: BanPickStatus[], to: BanPickStatus) => {
    if (!from.includes(currentStatus)) return;
    setCurrentStatus(to);
  };

  return {
    currentStatus,
    timerConfig,
    updateTimerConfig,
    isReady: currentStatus === BanPickStatus.READY,
    isInProgress: currentStatus === BanPickStatus.IN_PROGRESS,
    isPaused: currentStatus === BanPickStatus.PAUSED,
    isCompleted: currentStatus === BanPickStatus.COMPLETED,
    start: () => transition([BanPickStatus.READY, BanPickStatus.PAUSED], BanPickStatus.IN_PROGRESS),
    pause: () => transition([BanPickStatus.IN_PROGRESS], BanPickStatus.PAUSED),
    complete: () => transition([BanPickStatus.IN_PROGRESS], BanPickStatus.COMPLETED),
    reset: () => transition([BanPickStatus.IN_PROGRESS, BanPickStatus.PAUSED, BanPickStatus.COMPLETED], BanPickStatus.READY),
  };
}
