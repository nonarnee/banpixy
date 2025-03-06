import clsx from 'clsx';
import styles from './ControlButtons.module.scss';
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useBanPickContext } from '@/feature/banpick/contexts/BanPickContext';

export default function ControlButtons() {
  const { status, resetBanPick } = useBanPickContext();

  const handleClickReset = () => {
    status.pause();

    if (confirm('밴픽을 초기화 하시겠습니까?')) {
      resetBanPick();
    }
  };

  const handleTogglePlay = () => {
    if (status.isInProgress) {
      status.pause();
    }

    if (status.isPaused) {
      status.start();
    }
  };

  return (
    <div className={styles.controlButtonGroup}>
      <button
        onClick={handleClickReset}
        className={clsx(styles.controlButton, styles.reset)}
      >
        <ArrowPathIcon className={styles.icon} />
      </button>
      <button
        onClick={handleTogglePlay}
        className={clsx(styles.controlButton, {
          [styles.pause]: status.isPaused,
          [styles.inProgress]: status.isInProgress,
        })}
      >
        {status.isPaused
          ? <PlayIcon className={styles.icon} />
          : <PauseIcon className={styles.icon} />}
      </button>
    </div>
  );
}
