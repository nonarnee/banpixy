import clsx from 'clsx';
import styles from './ProgressBar.module.scss';
import { useBanPickContext } from '@/feature/banpick/contexts/BanPickContext';

export default function ProgressBar() {
  const { status, flow } = useBanPickContext();

  const progress = status.timerConfig.enabled
    ? (flow.time / status.timerConfig.duration) * 100
    : 100;

  return (
    <div
      className={clsx(styles.progressBar, {
        [styles.blue]: flow.currentTeam === 'blue',
        [styles.red]: flow.currentTeam === 'red',
        [styles.warning]: flow.time <= 10
      })}
    >
      <div
        className={clsx(styles.progress, {
          [styles.blue]: flow.currentTeam === 'blue',
          [styles.red]: flow.currentTeam === 'red',
        })}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
