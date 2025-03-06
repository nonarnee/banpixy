import styles from './BanPickHeader.module.scss';
import clsx from 'clsx';
import getPhaseText from '@/components/feature/banpick/utils/getPhaseText';
import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import { BANPICK_TIME } from '@/constants/time';

interface BanPickHeaderProps {
  phase: Phase;
  currentTeam: Team;
  timer: number;
  maxTime?: number;
  isEnd: boolean;
}

export default function BanPickHeader({ currentTeam, phase, timer, maxTime = BANPICK_TIME, isEnd }: BanPickHeaderProps) {
  const progress = (timer / maxTime) * 100;

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
          [styles.warning]: timer <= 10
        })}>
          {timer}
        </div>
        <div className={styles.timerLabel}>
          TIMER
        </div>
      </div>

      <div
        className={clsx(styles.progressBar, {
          [styles.blue]: currentTeam === 'blue',
          [styles.red]: currentTeam === 'red',
          [styles.warning]: timer <= 10
        })}
      >
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
