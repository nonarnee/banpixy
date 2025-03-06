import styles from './BanPickHeader.module.scss';
import clsx from 'clsx';
import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import PhaseInfo from './PhaseInfo/PhaseInfo';
import ControlButtons from './ControlButtons/ControlButtons';
import Timer from './Timer/Timer';
import ProgressBar from './ProgressBar/ProgressBar';

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
  const handleClickResetButton = () => {
    onPause();

    if (confirm('초기화하시겠습니까?')) {
      onReset();
    }
  };

  const handleTogglePlay = () => {
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
      <PhaseInfo currentTeam={currentTeam} phase={phase} />

      <div className={styles.rightContent}>
        <ControlButtons
          isPaused={isPaused}
          isInProgress={isInProgress}
          onReset={handleClickResetButton}
          onTogglePlay={handleTogglePlay}
        />

        <Timer time={time} />
      </div>

      <ProgressBar
        currentTeam={currentTeam}
        time={time}
      />
    </header>
  );
}
