import ControlButtons from '../ControlButtons/ControlButtons';
import PhaseInfo from '../PhaseInfo/PhaseInfo';
import ProgressBar from '../ProgressBar/ProgressBar';
import Timer from '../Timer/Timer';
import styles from '../BanPickHeader.module.scss';
import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';

interface InProgressHeaderProps {
  currentTeam: Team;
  phase: Phase;
  isPaused: boolean;
  isInProgress: boolean;
  time: number;
  onReset: () => void;
  onTogglePlay: () => void;
}

export default function InProgressHeader({
  currentTeam,
  phase,
  isPaused,
  isInProgress,
  time,
  onReset,
  onTogglePlay,
}: InProgressHeaderProps) {
  return (
    <header className={styles.header}>
      <PhaseInfo currentTeam={currentTeam} phase={phase} />

      <div className={styles.rightContent}>
        <ControlButtons
          isPaused={isPaused}
          isInProgress={isInProgress}
          onReset={onReset}
          onTogglePlay={onTogglePlay}
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
