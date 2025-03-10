'use client';

import BanPickHeader from '../components/BanPickHeader/BanPickHeader';
import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import { BanPickProvider } from '../contexts/BanPickContext';
import styles from './BanPick.module.scss';
import { SettingsProvider } from '../contexts/SettingsContext';
import { ChampionsProvider } from '@/contexts/ChampionsContext';
import { Champion } from '@/types/Champion';

interface BanPickProps {
  champions: Champion[];
}

export default function BanPick({ champions }: BanPickProps) {
  return (
    <ChampionsProvider champions={champions}>
      <SettingsProvider>
        <BanPickProvider>
          <div className={styles.container}>
            <BanPickHeader />

            <div className={styles.content}>
              <div className={styles.teamContainer}>
                <TeamComposition team="blue" />

                <ChampionSelect />

                <TeamComposition team="red" />
              </div>
            </div>
          </div>
        </BanPickProvider>
      </SettingsProvider>
    </ChampionsProvider>
  );
}
