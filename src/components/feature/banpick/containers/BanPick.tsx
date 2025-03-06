'use client';

import BanPickHeader from '../components/BanPickHeader/BanPickHeader';
import ChampionSelect from '../components/ChampionSelect/ChampionSelect';
import TeamComposition from '../components/TeamComposition/TeamComposition';
import useBanPick from '../hooks/useBanPick';
import getActiveSlot from '../utils/getActiveSlot';

import styles from './BanPick.module.scss';

export default function BanPick() {
  const {
    status,
    flow,
    composition,
    handleSelect,
    handleSkipBan,
    handleReset,
    updateTimerConfig,
  } = useBanPick();

  return (
    <div className={styles.container}>
      <BanPickHeader
        currentTeam={flow.currentTeam}
        phase={flow.currentPhase}
        time={flow.time}
        isEnd={status.isCompleted}
        isInProgress={status.isInProgress}
        isReady={status.isReady}
        isPaused={status.isPaused}
        timerConfig={status.timerConfig}
        onStart={status.start}
        onPause={status.pause}
        onReset={handleReset}
        onUpdateTimerConfig={updateTimerConfig}
      />

      <div className={styles.content}>
        <div className={styles.teamContainer}>
          <TeamComposition
            team="blue"
            picks={composition.bluePicks}
            bans={composition.blueBans}
            isActive={status.isInProgress && flow.isBluePhase}
            activeSlot={getActiveSlot(flow.currentPhase)}
          />

          <ChampionSelect
            disabledChampions={composition.disabledChampions}
            currentTeam={flow.currentTeam}
            isBanPhase={flow.isBanPhase}
            isInProgress={status.isInProgress}
            onSelect={handleSelect}
            onSkipBan={handleSkipBan}
          />

          <TeamComposition
            team="red"
            picks={composition.redPicks}
            bans={composition.redBans}
            isActive={status.isInProgress && flow.isRedPhase}
            activeSlot={getActiveSlot(flow.currentPhase)}
          />
        </div>
      </div>
    </div>
  );
}
