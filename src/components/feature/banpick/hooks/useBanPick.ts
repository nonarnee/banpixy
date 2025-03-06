import { useState, useEffect, useCallback, useMemo } from 'react';
import { Phase } from '@/types/Phase';
import { Team } from '@/types/Team';
import { Champion } from '@/types/Champion';
import { BANPICK_TIME } from '@/constants/time';
import { CHAMPIONS } from '@/constants/champion';
import { PHASE_ORDER, TEAM_ORDER } from '@/constants/order';

interface BanPickState {
  phase: Phase;
  currentTeam: Team;
  timer: number;
  bluePicks: Champion[];
  redPicks: Champion[];
  blueBans: Champion[];
  redBans: Champion[];
  isEnd: boolean;
}

export default function useBanPick() {
  const [state, setState] = useState<BanPickState>({
    phase: 'BAN_1',
    currentTeam: 'blue',
    timer: BANPICK_TIME,
    bluePicks: [],
    redPicks: [],
    blueBans: [],
    redBans: [],
    isEnd: false,
  });

  // 선택된 챔피언들의 배열
  const selectedChampions = useMemo(() => [
    ...state.bluePicks,
    ...state.redPicks,
    ...state.blueBans,
    ...state.redBans,
  ], [state.bluePicks, state.redPicks, state.blueBans, state.redBans]);

  // 선택 가능한 챔피언들의 배열
  const availableChampions = useMemo(() =>
    CHAMPIONS.filter(champion =>
      !selectedChampions.some(selected => selected.name === champion.name)
    )
    , [selectedChampions]);

  const nextPhase = useCallback(() => {
    const currentIndex = PHASE_ORDER.indexOf(state.phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      const nextPhase = PHASE_ORDER[currentIndex + 1];
      setState(prev => ({
        ...prev,
        phase: nextPhase,
        currentTeam: TEAM_ORDER[nextPhase],
        timer: BANPICK_TIME,
      }));
    } else {
      setState(prev => ({
        ...prev,
        isEnd: true,
      }));
    }
  }, [state.phase]);

  // 랜덤 픽
  const selectRandomChampion = useCallback(() => {
    if (availableChampions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableChampions.length);
    const randomChampion = availableChampions[randomIndex];
    handleSelect(randomChampion);
  }, [availableChampions]);

  const handleSelect = useCallback((champion: Champion) => {
    setState(prev => {
      const isPickPhase = prev.phase.startsWith('PICK');
      const team = prev.currentTeam;

      if (isPickPhase) {
        const picks = team === 'blue'
          ? [...prev.bluePicks, champion]
          : [...prev.redPicks, champion];

        return {
          ...prev,
          bluePicks: team === 'blue' ? picks : prev.bluePicks,
          redPicks: team === 'red' ? picks : prev.redPicks,
        };
      } else {
        const bans = team === 'blue'
          ? [...prev.blueBans, champion]
          : [...prev.redBans, champion];

        return {
          ...prev,
          blueBans: team === 'blue' ? bans : prev.blueBans,
          redBans: team === 'red' ? bans : prev.redBans,
        };
      }
    });
    nextPhase();
  }, [nextPhase]);

  useEffect(() => {
    // 남은 시간 감소
    if (state.isEnd) return;
    const timer = setInterval(() => {
      setState(prev => {
        return {
          ...prev,
          timer: prev.timer - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectRandomChampion]);

  useEffect(() => {
    // 시간 초과시 랜덤 픽
    if (state.isEnd) return;

    if (state.timer <= 0) {
      selectRandomChampion();
    }
  }, [state.timer]);

  return {
    ...state,
    handleSelect,
    disabled: [
      ...state.bluePicks,
      ...state.redPicks,
      ...state.blueBans,
      ...state.redBans,
    ],
  };
} 
