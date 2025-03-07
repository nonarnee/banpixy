'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './ChampionSelect.module.scss';
import { Champion } from '@/types/Champion';
import ChampionItem from '@/feature/banpick/components/ChampionItem/ChampionItem';
import { useBanPickContext } from '../../contexts/BanPickContext';

interface ChampionSelectProps {
  champions: Champion[];
}

export default function ChampionSelect({ champions }: ChampionSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    status,
    flow,
    composition,
    pickChampion,
    noBan,
  } = useBanPickContext();

  const filteredChampions = useMemo(() => {
    return champions.filter(champion =>
      champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, champions]);

  const handleClickChampion = (champion: Champion) => {
    if (!status.isInProgress) {
      return;
    }

    pickChampion(champion);
  };

  const handleClickNoBan = () => {
    if (!status.isInProgress) {
      return;
    }

    noBan();
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
        {flow.isBanPhase && (
          <button
            onClick={handleClickNoBan}
            className={styles.skipButton}
          >
            노밴
          </button>
        )}
      </div>

      <div
        className={clsx(styles.grid, {
          [styles.blueTeam]: flow.currentTeam === 'blue',
          [styles.redTeam]: flow.currentTeam === 'red'
        })}
      >
        {filteredChampions.map(champion => (
          <ChampionItem
            key={champion.id}
            champion={champion}
            isDisabled={composition.disabledChampions.some(c => c.name === champion.name)}
            onClick={handleClickChampion}
          />
        ))}
      </div>
    </div>
  );
}
