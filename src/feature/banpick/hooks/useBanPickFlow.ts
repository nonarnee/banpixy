import { useState, useEffect, useCallback } from 'react';
import withInProgress from '../utils/withInProgress';
import { PHASE_ORDER, TEAM_ORDER } from '@/constants/order';
import { Phase } from '@/types/Phase';
import { TimerConfig } from '@/types/Settings';
import { Champion } from '@/types/Champion';
import { Selection } from '@/types/Selection';

export default function useBanPickFlow(
  isInProgress: boolean,
  onComplete: () => void,
  timerConfig: TimerConfig,
) {
  const [currentPhase, setCurrentPhase] = useState<Phase>(PHASE_ORDER[0]);
  const [time, setTime] = useState(timerConfig.duration);
  const [currentSelection, setCurrentSelection] = useState<Selection | null>(null);

  // duration이 변경될 때마다 time 상태 업데이트
  useEffect(() => {
    setTime(timerConfig.duration);
  }, [timerConfig.duration]);

  const currentTeam = TEAM_ORDER[currentPhase];
  const isPickPhase = currentPhase.startsWith('PICK');
  const isBanPhase = currentPhase.startsWith('BAN');
  const isBluePhase = currentTeam === 'blue';
  const isRedPhase = currentTeam === 'red';

  const resetTimer = useCallback(() => {
    setTime(timerConfig.duration);
  }, [timerConfig.duration]);

  const resetFlow = useCallback(() => {
    setCurrentPhase(PHASE_ORDER[0]);
    setCurrentSelection(null);
    resetTimer();
  }, [resetTimer]);

  const selectChampion = withInProgress((champion: Champion) => {
    setCurrentSelection({ type: 'CHAMPION', champion });
  }, isInProgress);

  const selectNoBan = withInProgress(() => {
    setCurrentSelection({ type: 'NO_BAN' });
  }, isInProgress);

  const goNextPhase = useCallback(() => {
    if (currentPhase === PHASE_ORDER[PHASE_ORDER.length - 1]) {
      onComplete();
      return;
    }

    const nextPhase = PHASE_ORDER[PHASE_ORDER.indexOf(currentPhase) + 1];
    setCurrentPhase(nextPhase);
    setCurrentSelection(null);
    resetTimer();
  }, [currentPhase, onComplete, resetTimer]);

  useEffect(() => {
    if (!isInProgress || !timerConfig.enabled) return;

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isInProgress, timerConfig.enabled, resetTimer]);

  return {
    time,
    currentPhase,
    currentTeam,
    currentSelection,
    isPickPhase,
    isBanPhase,
    isBluePhase,
    isRedPhase,
    goNextPhase,
    resetTimer,
    resetFlow,
    selectChampion,
    selectNoBan,
  };
} 
