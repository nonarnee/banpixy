import clsx from 'clsx';
import styles from '../BanPickHeader.module.scss';

interface EndStateHeaderProps {
  onReset: () => void;
}

export default function EndStateHeader({ onReset }: EndStateHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.end}>
        밴픽 종료!
      </div>
      <div className={styles.rightContent}>
        <button
          className={clsx(styles.controlButton, styles.reset)}
          onClick={onReset}
        >
          초기화
        </button>
      </div>
    </header>
  );
}
