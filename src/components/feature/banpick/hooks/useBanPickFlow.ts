import { useState, useEffect, useCallback } from 'react';
import { BANPICK_TIME } from '@/constants/time';
import { PHASE_ORDER, TEAM_ORDER } from '@/constants/order';
import { Phase } from '@/types/Phase';

export default function useBanPickFlow(
  isInProgress: boolean,
  onComplete: () => void,
) {
  const [currentPhase, setCurrentPhase] = useState<Phase>(PHASE_ORDER[0]);
  const [time, setTime] = useState(BANPICK_TIME);

  const currentTeam = TEAM_ORDER[currentPhase];
  const isPickPhase = currentPhase.startsWith('PICK');
  const isBanPhase = currentPhase.startsWith('BAN');
  const isBluePhase = currentTeam === 'blue';
  const isRedPhase = currentTeam === 'red';

  const resetTimer = useCallback(() => {
    setTime(BANPICK_TIME);
  }, []);

  const goNextPhase = useCallback(() => {
    if (currentPhase === PHASE_ORDER[PHASE_ORDER.length - 1]) {
      onComplete();
      return;
    }

    const nextPhase = PHASE_ORDER[PHASE_ORDER.indexOf(currentPhase) + 1];
    setCurrentPhase(nextPhase);
    resetTimer();
  }, [currentPhase, onComplete, resetTimer]);

  useEffect(() => {
    if (!isInProgress) return;

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isInProgress, resetTimer]);

  return {
    time,
    currentPhase,
    currentTeam,
    isPickPhase,
    isBanPhase,
    isBluePhase,
    isRedPhase,
    goNextPhase,
    resetTimer,
  };
} 
