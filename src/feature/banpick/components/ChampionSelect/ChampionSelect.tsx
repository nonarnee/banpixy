'use client';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import styles from './ChampionSelect.module.scss';
import { Champion } from '@/types/Champion';
import ChampionItem from '@/feature/banpick/components/ChampionItem/ChampionItem';
import { useBanPickContext } from '../../contexts/BanPickContext';
import CustomItem from '../ChampionItem/CustomItem';
import { useChampionsContext } from '@/contexts/ChampionsContext';

export default function ChampionSelect() {
  const champions = useChampionsContext();
  const [searchQuery, setSearchQuery] = useState('');

  const {
    status,
    flow,
    composition,
    selectRandom,
    confirmSelection,
  } = useBanPickContext();
  const isSelection = flow.currentSelection?.type === 'NO_BAN'
    || flow.currentSelection?.champion;

  const filteredChampions = useMemo(() => {
    return champions.filter(champion =>
      champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, champions]);

  const handleClickChampion = (champion: Champion) => {
    flow.selectChampion(champion);
  };

  const handleClickNoBan = () => {
    flow.selectNoBan();
  };

  const handleClickRandom = () => {
    selectRandom();
  };

  const handleClickConfirm = () => {
    if (!isSelection) return;

    confirmSelection();
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
      </div>

      <div
        className={clsx(styles.grid, {
          [styles.blueTeam]: flow.currentTeam === 'blue',
          [styles.redTeam]: flow.currentTeam === 'red'
        })}
      >
        {flow.isBanPhase && (
          <CustomItem
            name="노밴"
            innerText="NO"
            isCurrent={flow.currentSelection?.type === 'NO_BAN'}
            isInProgress={status.isInProgress}
            onClick={handleClickNoBan}
          />
        )}

        {flow.isPickPhase && (
          <CustomItem
            name="랜덤"
            innerText="?"
            isCurrent={false}
            isInProgress={status.isInProgress}
            onClick={handleClickRandom}
          />
        )}

        {filteredChampions.map(champion => (
          <ChampionItem
            key={champion.id}
            champion={champion}
            isCurrent={flow.currentSelection?.champion?.id === champion.id}
            isInProgress={status.isInProgress}
            isNotSelectable={
              composition.disabledChampions
                .some(c => c.name === champion.name)
            }
            onClick={handleClickChampion}
          />
        ))}
      </div>

      <div className={styles.selectButtons}>
        <button
          onClick={handleClickConfirm}
          className={styles.confirmButton}
          disabled={!status.isInProgress || !isSelection}
        >
          {status.isInProgress ? '선택하기' : '밴픽 대기중'}
        </button>
      </div>
    </div>
  );
}
