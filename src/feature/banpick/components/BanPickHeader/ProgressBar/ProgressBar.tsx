import clsx from 'clsx';
import styles from './ProgressBar.module.scss';
import { useBanPickContext } from '@/feature/banpick/contexts/BanPickContext';
import { useSettingsContext } from '@/feature/banpick/contexts/SettingsContext';

export default function ProgressBar() {
  const { settings } = useSettingsContext();
  const { flow } = useBanPickContext();

  const progress = settings.timer.enabled
    ? (flow.time / settings.timer.duration) * 50
    : 50;

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
        })}
        style={{ width: `${flow.currentTeam === 'blue' ? progress : 50}%` }}
      />
      <div className={styles.line} />
      <div
        className={clsx(styles.progress, {
          [styles.red]: flow.currentTeam === 'red',
        })}
        style={{ width: `${flow.currentTeam === 'red' ? progress : 50}%` }}
      />
    </div>
  );
}
