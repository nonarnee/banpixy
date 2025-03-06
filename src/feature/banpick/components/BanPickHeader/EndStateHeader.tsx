import clsx from 'clsx';
import styles from './BanPickHeader.module.scss';
import { useBanPickContext } from '../../contexts/BanPickContext';

export default function EndStateHeader() {
  const { status } = useBanPickContext();

  const handleClickResetButton = () => {
    status.pause();

    if (confirm('초기화하시겠습니까?')) {
      status.reset();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.end}>
        밴픽 종료!
      </div>
      <div className={styles.rightContent}>
        <button
          className={clsx(styles.controlButton, styles.reset)}
          onClick={handleClickResetButton}
        >
          초기화
        </button>
      </div>
    </header>
  );
}
