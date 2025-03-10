'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './ChampionSelect.module.scss';
import { Champion } from '@/types/Champion';
import ChampionItem from '@/feature/banpick/components/ChampionItem/ChampionItem';
import { useBanPickContext } from '../../contexts/BanPickContext';
import CustomItem from '../ChampionItem/CustomItem';
import { useChampionsContext } from '@/contexts/ChampionsContext';
import { ChampionLane } from '@/types/Lane';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { findChampionById } from '@/lib/champions';
import withInProgress from '../../utils/withInProgress';

export default function ChampionSelect() {
  const champions = useChampionsContext();
  const [selectedLane, setSelectedLane] = useState<ChampionLane | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  const { settings } = useSettingsContext();
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
      && (!selectedLane || champion.lanes.includes(selectedLane))
    );
  }, [searchQuery, champions, selectedLane]);

  const handleClickLane = withInProgress((lane: ChampionLane) => {
    if (lane === selectedLane) {
      setSelectedLane('');
    } else {
      setSelectedLane(lane);
    }
  }, status.isInProgress);

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
      {settings.globalBans.length > 0 && (
        <div className={styles.globalBans}>
          글로벌 밴
          {settings.globalBans.map(championId => {
            const champion = findChampionById(champions, championId);

            if (!champion) return null;

            return (
              <div className={styles.globalBan} key={`global-ban-${championId}`}>
                <img src={champion.thumbnail} alt={champion.name} />
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.searchBar}>
        <div className={styles.lanes}>
          {Object.values(ChampionLane).map(lane => (
            <button
              className={clsx(styles.laneButton, {
                [styles.selected]: selectedLane === lane
              })}
              onClick={() => handleClickLane(lane)}
              key={lane}
            >
              <Image
                src={`/icons/${lane.toLowerCase()}.svg`}
                width={32}
                height={32}
                alt={lane}
              />
            </button>
          ))}
        </div>

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
