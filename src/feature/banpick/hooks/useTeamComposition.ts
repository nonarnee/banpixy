import { useMemo, useState } from 'react';
import { Champion } from '@/types/Champion';
import { Team } from '@/types/Team';
import { BanPickSettings } from '@/types/Settings';
import { findChampionById } from '@/lib/champions';
interface CompositionState {
  picks: Record<Team, Champion[]>;
  bans: Record<Team, (Champion | null)[]>;
}

export default function useTeamComposition(champions: Champion[], settings: BanPickSettings) {
  const [composition, setComposition] = useState<CompositionState>({
    picks: {
      blue: [],
      red: [],
    },
    bans: {
      blue: [],
      red: [],
    },
  });

  const updatePick = (team: Team, champion: Champion) => {
    setComposition(prev => ({
      ...prev,
      picks: {
        ...prev.picks,
        [team]: [
          ...prev.picks[team],
          champion,
        ],
      },
    }));
  };

  const updateBan = (team: Team, champion: Champion | null) => {
    setComposition(prev => ({
      ...prev,
      bans: {
        ...prev.bans,
        [team]: [
          ...prev.bans[team],
          champion,
        ],
      },
    }));
  };

  const pickedChampions = useMemo(() => [
    ...composition.picks.blue,
    ...composition.picks.red,
  ], [
    composition.picks.blue,
    composition.picks.red,
  ]);

  const bannedChampions = useMemo(() => [
    ...composition.bans.blue,
    ...composition.bans.red,
  ], [
    composition.bans.blue,
    composition.bans.red,
  ]);

  const availableChampions = useMemo(() =>
    champions
      .filter(champion =>
        !settings.globalBans.includes(champion.id)
      )
      .filter(champion =>
        !pickedChampions
          .map(({ id: pickedId }) => pickedId)
          .includes(champion.id)
      )
      .filter(champion =>
        !bannedChampions
          .filter((champion) => champion !== null)
          .map(({ id: bannedId }) => bannedId)
          .includes(champion.id)
      ),
    [pickedChampions, bannedChampions],
  );

  const disabledChampions = useMemo(() => [
    ...settings.globalBans.map(id => findChampionById(champions, id)),
    ...composition.picks.blue,
    ...composition.picks.red,
    ...composition.bans.blue,
    ...composition.bans.red,
  ].filter(champion => champion !== null),
    [
      composition.picks.blue,
      composition.picks.red,
      composition.bans.blue,
      composition.bans.red,
      settings.globalBans,
    ],
  );

  const resetComposition = () => {
    setComposition({
      picks: {
        blue: [],
        red: [],
      },
      bans: {
        blue: [],
        red: [],
      },
    });
  };

  return {
    bluePicks: composition.picks.blue,
    redPicks: composition.picks.red,
    blueBans: composition.bans.blue,
    redBans: composition.bans.red,
    pickedChampions,
    bannedChampions,
    availableChampions,
    disabledChampions,
    updatePick,
    updateBan,
    resetComposition,
  };
}
