'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './ChampionSelect.module.scss';
import { Team } from '@/types/Team';
import { Champion } from '@/types/Champion';
import { CHAMPIONS } from '@/constants/champion';
import ChampionItem from '@/components/feature/banpick/components/ChampionItem/ChampionItem';

interface ChampionSelectProps {
  disabledChampions: Champion[];
  currentTeam: Team;
  isBanPhase: boolean;
  isInProgress: boolean;
  onSelect: (champion: Champion) => void;
  onSkipBan: () => void;
}

export default function ChampionSelect({
  disabledChampions,
  currentTeam,
  isBanPhase,
  isInProgress,
  onSelect,
  onSkipBan,
}: ChampionSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChampions = useMemo(() => {
    return CHAMPIONS.filter(champion =>
      champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelect = (champion: Champion) => {
    if (!isInProgress) {
      return;
    }

    onSelect(champion);
  };

  const handleSkipBan = () => {
    if (!isInProgress) {
      return;
    }

    onSkipBan();
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="챔피언 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {isBanPhase && (
          <button
            onClick={handleSkipBan}
            className={styles.skipButton}
          >
            노밴
          </button>
        )}
      </div>

      <div
        className={clsx(styles.grid, {
          [styles.blueTeam]: currentTeam === 'blue',
          [styles.redTeam]: currentTeam === 'red'
        })}
      >
        {filteredChampions.map(champion => (
          <ChampionItem
            key={champion.name}
            champion={champion}
            isDisabled={disabledChampions.some(c => c.name === champion.name)}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
