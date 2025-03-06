'use client';

import BanPickHeader from '../components/BanPickHeader/BanPickHeader';
import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import { BanPickProvider } from '../contexts/BanPickContext';
import styles from './BanPick.module.scss';

export default function BanPick() {
  return (
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
  );
}
