import clsx from 'clsx';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import styles from './BanPickHeader.module.scss';
import buttonStyles from './ControlButtons/ControlButtons.module.scss';
import { useBanPickContext } from '../../contexts/BanPickContext';

export default function EndStateHeader() {
  const { status, resetBanPick } = useBanPickContext();

  const handleClickReset = () => {
    status.pause();

    if (confirm('밴픽을 초기화 하시겠습니까?')) {
      resetBanPick();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.end}>
        밴픽 종료!
      </div>
      <div className={styles.rightContent}>
        <button
          onClick={handleClickReset}
          className={clsx(buttonStyles.controlButton, buttonStyles.reset)}
        >
          <ArrowPathIcon className={buttonStyles.icon} />
        </button>
      </div>
    </header>
  );
}
