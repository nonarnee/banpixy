import { useState, useEffect, useCallback, useMemo } from 'react';
import { Phase } from '@/types/Phase';
import { Team } from '@/types/Team';
import { Champion } from '@/types/Champion';
import { BANPICK_TIME } from '@/constants/time';
import { CHAMPIONS } from '@/constants/champion';

interface BanPickState {
  phase: Phase;
  currentTeam: Team;
  timer: number;
  bluePicks: Champion[];
  redPicks: Champion[];
  blueBans: Champion[];
  redBans: Champion[];
}

const PHASE_ORDER: Phase[] = [
  'BAN_1', 'BAN_2', 'BAN_3', 'BAN_4', 'BAN_5', 'BAN_6',
  'PICK_1', 'PICK_2', 'PICK_3', 'PICK_4',
  'BAN_7', 'BAN_8', 'BAN_9', 'BAN_10',
  'PICK_5', 'PICK_6', 'PICK_7'
];

const TEAM_ORDER: Record<Phase, Team> = {
  'BAN_1': 'blue', 'BAN_2': 'red', 'BAN_3': 'blue',
  'BAN_4': 'red', 'BAN_5': 'blue', 'BAN_6': 'red',
  'PICK_1': 'blue', 'PICK_2': 'red', 'PICK_3': 'blue',
  'PICK_4': 'red', 'BAN_7': 'red', 'BAN_8': 'blue',
  'BAN_9': 'red', 'BAN_10': 'blue', 'PICK_5': 'red',
  'PICK_6': 'blue', 'PICK_7': 'red'
};

export default function useBanPick() {
  const [state, setState] = useState<BanPickState>({
    phase: 'BAN_1',
    currentTeam: 'blue',
    timer: BANPICK_TIME,
    bluePicks: [],
    redPicks: [],
    blueBans: [],
    redBans: [],
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
        const bans = team === 'blue' ? [...prev.blueBans, champion] : [...prev.redBans, champion];
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
    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timer <= 1) {
          // 시간 초과시 랜덤 픽
          setTimeout(() => selectRandomChampion(), 0);
          return prev;
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
