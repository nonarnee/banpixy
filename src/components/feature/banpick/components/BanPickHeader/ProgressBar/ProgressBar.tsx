import clsx from 'clsx';
import styles from './ProgressBar.module.scss';
import { Team } from '@/types/Team';
import { BANPICK_TIME } from '@/constants/time';

interface ProgressBarProps {
  currentTeam: Team;
  time: number;
}

export default function ProgressBar({
  currentTeam,
  time,
}: ProgressBarProps) {
  const progress = (time / BANPICK_TIME) * 100;

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
