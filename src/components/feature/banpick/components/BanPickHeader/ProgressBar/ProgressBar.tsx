import clsx from 'clsx';
import styles from './ProgressBar.module.scss';
import { Team } from '@/types/Team';
import { TimerConfig } from '../../../hooks/useBanPickStatus';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  currentTeam: Team;
  time: number;
  timerConfig: TimerConfig;
}

export default function ProgressBar({
  currentTeam,
  time,
  timerConfig,
}: ProgressBarProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const progress = timerConfig.enabled
    ? (time / timerConfig.duration) * 100
    : 100;

  useEffect(() => {
    if (time === timerConfig.duration) {
      setShouldAnimate(false);
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    }
  }, [time, timerConfig.duration]);

  return (
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
  );
}
