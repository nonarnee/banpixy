import clsx from 'clsx';
import styles from './ControlButtons.module.scss';
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

interface ControlButtonsProps {
  isPaused: boolean;
  isInProgress: boolean;
  onReset: () => void;
  onTogglePlay: () => void;
}

export default function ControlButtons({
  isPaused,
  isInProgress,
  onReset,
  onTogglePlay,
}: ControlButtonsProps) {
  return (
    <div className={styles.controlButtonGroup}>
      <button
        onClick={onReset}
        className={clsx(styles.controlButton, styles.reset)}
      >
        <ArrowPathIcon className={styles.icon} />
      </button>
      <button
        onClick={onTogglePlay}
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
  );
}
