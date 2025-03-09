'use client';

import BanPickHeader from '../components/BanPickHeader/BanPickHeader';
import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import { BanPickProvider } from '../contexts/BanPickContext';
import { Champion } from '@/types/Champion';
import styles from './BanPick.module.scss';

interface BanPickProps {
  champions: Champion[];
}

export default function BanPick({ champions }: BanPickProps) {
  return (
    <BanPickProvider champions={champions}>
      <div className={styles.container}>
        <BanPickHeader />

        <div className={styles.content}>
          <div className={styles.teamContainer}>
            <TeamComposition team="blue" />

            <ChampionSelect champions={champions} />

            <TeamComposition team="red" />
          </div>
        </div>
      </div>
    </BanPickProvider>
  );
}
