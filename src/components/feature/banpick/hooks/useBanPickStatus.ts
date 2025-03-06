import { useState, useCallback } from 'react';

export type BanPickStatus = 'READY' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';

export default function useBanPickStatus() {
  const [currentStatus, setCurrentStatus] = useState<BanPickStatus>('READY');

  const start = useCallback(() => setCurrentStatus('IN_PROGRESS'), []);
  const pause = useCallback(() => setCurrentStatus('PAUSED'), []);
  const complete = useCallback(() => setCurrentStatus('COMPLETED'), []);
  const reset = useCallback(() => setCurrentStatus('READY'), []);

  return {
    currentStatus,
    isReady: currentStatus === 'READY',
    isInProgress: currentStatus === 'IN_PROGRESS',
    isPaused: currentStatus === 'PAUSED',
    isCompleted: currentStatus === 'COMPLETED',
    start,
    pause,
    complete,
    reset,
  };
}
