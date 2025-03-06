'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './ChampionSelect.module.scss';
import { Team } from '@/types/Team';
import { Champion } from '@/types/Champion';
import { CHAMPIONS } from '@/constants/champion';
import ChampionItem from '@/components/feature/banpick/components/ChampionItem/ChampionItem';

interface ChampionSelectProps {
  onSelect: (champion: Champion) => void;
  disabled: Champion[];
  currentTeam: Team;
  isBanPhase: boolean;
  onSkipBan: () => void;
}

export default function ChampionSelect({
  onSelect,
  disabled,
  currentTeam,
  isBanPhase,
  onSkipBan,
}: ChampionSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChampions = useMemo(() => {
    return CHAMPIONS.filter(champion =>
      champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            onClick={onSkipBan}
            className={styles.skipButton}
          >
            스킵
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
            isDisabled={disabled.some(c => c.name === champion.name)}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
