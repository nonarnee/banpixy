import { useEffect, useMemo, useState } from 'react';
import { Champion, BannedChampion } from '@/types/Champion';

export default function useTeamComposition() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [bluePicks, setBluePicks] = useState<Champion[]>([]);
  const [redPicks, setRedPicks] = useState<Champion[]>([]);
  const [blueBans, setBlueBans] = useState<BannedChampion[]>([]);
  const [redBans, setRedBans] = useState<BannedChampion[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/champions`)
      .then(res => res.json())
      .then(data => setChampions(data));
  }, []);

  // 선택된 챔피언들의 배열
  const selectedChampions = useMemo(() => [
    ...bluePicks,
    ...redPicks,
  ], [
    bluePicks,
    redPicks,
  ]);

  const bannedChampions = useMemo(() => [
    ...blueBans,
    ...redBans,
  ], [
    blueBans,
    redBans,
  ]);

  const availableChampions = useMemo(() =>
    champions
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
