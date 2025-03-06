import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import ReadyStateHeader from './states/ReadyStateHeader';
import InProgressHeader from './states/InProgressHeader';
import EndStateHeader from './states/EndStateHeader';

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
    return <EndStateHeader onReset={handleClickResetButton} />;
  }

  if (isReady) {
    return <ReadyStateHeader onStart={onStart} />;
  }

  return (
    <InProgressHeader
      currentTeam={currentTeam}
      phase={phase}
      isPaused={isPaused}
      isInProgress={isInProgress}
      time={time}
      onReset={handleClickResetButton}
      onTogglePlay={handleTogglePlay}
    />
  );
}
