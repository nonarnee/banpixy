import { Team } from '@/types/Team';
import { Phase } from '@/types/Phase';
import ReadyStateHeader from './states/ReadyStateHeader';
import InProgressHeader from './states/InProgressHeader';
import EndStateHeader from './states/EndStateHeader';
import { TimerConfig } from '../../hooks/useBanPickStatus';

interface BanPickHeaderProps {
  phase: Phase;
  time: number;
  currentTeam: Team;
  isEnd: boolean;
  isInProgress: boolean;
  isReady: boolean;
  isPaused: boolean;
  timerConfig: TimerConfig;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onUpdateTimerConfig: (config: Partial<TimerConfig>) => void;
}

export default function BanPickHeader({
  phase,
  time,
  currentTeam,
  isEnd,
  isInProgress,
  isReady,
  isPaused,
  timerConfig,
  onStart,
  onPause,
  onReset,
  onUpdateTimerConfig,
}: BanPickHeaderProps) {
  console.log(timerConfig);
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
      <EndStateHeader
        onReset={handleClickResetButton}
      />
    );
  }

  if (isReady) {
    return (
      <ReadyStateHeader
        onStart={onStart}
        timerConfig={timerConfig}
        onUpdateTimerConfig={onUpdateTimerConfig}
      />
    );
  }

  return (
    <InProgressHeader
      currentTeam={currentTeam}
      phase={phase}
      isPaused={isPaused}
      isInProgress={isInProgress}
      timerConfig={timerConfig}
      time={time}
      onReset={handleClickResetButton}
      onTogglePlay={handleTogglePlay}
    />
  );
}
