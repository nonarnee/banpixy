import styles from './BanPickHeader.module.scss';
import clsx from 'clsx';
import getPhaseText from '@/components/feature/banpick/utils/getPhaseText';
import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import { BANPICK_TIME } from '@/constants/time';
import { PauseIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface BanPickHeaderProps {
  phase: Phase;
  time: number;
  currentTeam: Team;
  isEnd: boolean;
  isInProgress: boolean;
  isReady: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function BanPickHeader({
  phase,
  time,
  currentTeam,
  isEnd,
  isInProgress,
  isReady,
  isPaused,
  onStart,
  onPause,
  onReset,
}: BanPickHeaderProps) {
  const progress = (time / BANPICK_TIME) * 100;

  const handleClickResetButton = () => {
    onPause();

    if (confirm('초기화하시겠습니까?')) {
      onReset();
    }
  };

  const handleClickControlButton = () => {
    if (isInProgress) {
      onPause();
    }

    if (isPaused) {
      onStart();
    }
  };

  if (isEnd) {
    return (
      <header className={styles.header}>
        <div className={styles.end}>
          밴픽 종료!
        </div>
        <div className={styles.rightContent}>
          <button
            className={clsx(styles.controlButton, styles.reset)}
            onClick={handleClickResetButton}
          >
            초기화
          </button>
        </div>
      </header>
    );
  }

  if (isReady) {
    return (
      <header className={styles.header}>
        <button onClick={onStart} className={styles.startButton}>
          시작하기
        </button>
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

      <div className={styles.rightContent}>
        <div className={styles.controlButtonGroup}>
          <button
            onClick={handleClickResetButton}
            className={clsx(styles.controlButton, styles.reset)}
          >
            <ArrowPathIcon className={styles.icon} />
          </button>
          <button
            onClick={handleClickControlButton}
            className={clsx(styles.controlButton, {
              [styles.pause]: isPaused,
              [styles.inProgress]: isInProgress,
            })}
          >
            {isPaused
              ? <PlayIcon className={styles.icon} />
              : <PauseIcon className={styles.icon} />}
          </button>
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
