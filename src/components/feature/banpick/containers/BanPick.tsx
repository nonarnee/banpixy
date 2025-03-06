'use client';

import BanPickHeader from '../components/BanPickHeader/BanPickHeader';
import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import useBanPick from '../hooks/useBanPick';
import getActiveSlot from '../utils/getActiveSlot';

import styles from './BanPick.module.scss';

export default function BanPick() {
  const {
    phase,
    currentTeam,
    timer,
    bluePicks,
    redPicks,
    blueBans,
    redBans,
    handleSelect,
    disabled,
    isEnd,
  } = useBanPick();

  console.log('//--------------------------------');
  console.log('phase', phase);
  console.log('currentTeam', currentTeam);
  console.log('timer', timer);
  console.log('bluePicks', bluePicks);
  console.log('redPicks', redPicks);
  console.log('blueBans', blueBans);
  console.log('redBans', redBans);
  console.log('--------------------------------//');

  return (
    <div className={styles.container}>
      <BanPickHeader
        currentTeam={currentTeam}
        phase={phase}
        timer={timer}
        isEnd={isEnd}
      />

      <div className={styles.content}>
        <div className={styles.teamContainer}>
          <TeamComposition
            team="blue"
            picks={bluePicks}
            bans={blueBans}
            isActive={currentTeam === 'blue'}
            activeSlot={getActiveSlot(phase)}
          />

          <ChampionSelect
            onSelect={handleSelect}
            disabled={disabled}
            currentTeam={currentTeam}
          />

          <TeamComposition
            team="red"
            picks={redPicks}
            bans={redBans}
            isActive={currentTeam === 'red'}
            activeSlot={getActiveSlot(phase)}
          />
        </div>
      </div>
    </div>
  );
}
