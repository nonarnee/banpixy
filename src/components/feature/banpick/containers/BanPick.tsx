'use client';

import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import styles from './BanPick.module.scss';

export default function BanPick() {
  return (
    <div className={styles.container}>
      <div>BanPick</div>
      <div className={styles.content}>
        <div className={styles.teamContainer}>
          <TeamComposition
            team="blue"
            picks={[]}
            bans={[]}
            isActive={false}
          />

          <ChampionSelect
            onSelect={() => { }}
            disabled={[]}
            currentTeam="blue"
          />

          <TeamComposition
            team="red"
            picks={[]}
            bans={[]}
            isActive={false}
          />
        </div>
      </div>
    </div>
  );
}
