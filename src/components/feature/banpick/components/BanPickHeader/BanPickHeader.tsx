import styles from './BanPickHeader.module.scss';
import clsx from 'clsx';
import getPhaseText from '@/components/feature/banpick/utils/getPhaseText';
import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import { BANPICK_TIME } from '@/constants/time';

interface BanPickHeaderProps {
  phase: Phase;
  time: number;
  currentTeam: Team;
  isEnd: boolean;
}

export default function BanPickHeader({
  phase,
  time,
  currentTeam,
  isEnd,
}: BanPickHeaderProps) {
  const progress = (time / BANPICK_TIME) * 100;

  if (isEnd) {
    return (
      <header className={styles.header}>
        <div className={styles.end}>
          END
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.phaseInfo}>
        <div
          className={clsx(styles.teamIndicator, {
            [styles.blue]: currentTeam === 'blue',
            [styles.red]: currentTeam === 'red'
          })}
        >
          {currentTeam.toUpperCase()} TEAM
        </div>
        <div className={styles.phase}>
          {getPhaseText(phase)}
        </div>
      </div>

      <div className={styles.timer}>
        <div className={clsx(styles.timerValue, {
          [styles.warning]: time <= 10
        })}>
          {Math.max(time, 0)}
        </div>
        <div className={styles.timerLabel}>
          TIMER
        </div>
      </div>

      <div
        className={clsx(styles.progressBar, {
          [styles.blue]: currentTeam === 'blue',
          [styles.red]: currentTeam === 'red',
          [styles.warning]: time <= 10
        })}
      >
        <div
          className={clsx(styles.progress, {
            [styles.blue]: currentTeam === 'blue',
            [styles.red]: currentTeam === 'red',
          })}
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
