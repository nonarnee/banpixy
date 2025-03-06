import { useMemo, useState, useCallback } from 'react';
import { Champion, BannedChampion } from '@/types/Champion';
import { CHAMPIONS } from '@/constants/champion';

export default function useTeamComposition() {
  const [bluePicks, setBluePicks] = useState<Champion[]>([]);
  const [redPicks, setRedPicks] = useState<Champion[]>([]);
  const [blueBans, setBlueBans] = useState<BannedChampion[]>([]);
  const [redBans, setRedBans] = useState<BannedChampion[]>([]);

  // 선택된 챔피언들의 배열
  const selectedChampions = useMemo(() => [
    ...bluePicks,
    ...redPicks,
    ...blueBans,
    ...redBans,
  ], [
    bluePicks,
    redPicks,
    blueBans,
    redBans,
  ]);

  const bannedChampions = useMemo(() => [
    ...blueBans,
    ...redBans,
  ], [
    blueBans,
    redBans,
  ]);

  const availableChampions = useMemo(() =>
    CHAMPIONS
      .filter(champion => !selectedChampions.includes(champion))
      .filter(champion => !bannedChampions.includes(champion)),
    [selectedChampions, bannedChampions],
  );

  const disabledChampions = useMemo(() => [
    ...bluePicks,
    ...redPicks,
    ...blueBans,
    ...redBans,
  ].filter(champion => champion !== null),
    [bluePicks, redPicks, blueBans, redBans],
  );

  const resetComposition = () => {
    setBluePicks([]);
    setRedPicks([]);
    setBlueBans([]);
    setRedBans([]);
  };

  return {
    bluePicks,
    redPicks,
    blueBans,
    redBans,
    selectedChampions,
    availableChampions,
    disabledChampions,
    setBluePicks,
    setRedPicks,
    setBlueBans,
    setRedBans,
    resetComposition,
  };
}
