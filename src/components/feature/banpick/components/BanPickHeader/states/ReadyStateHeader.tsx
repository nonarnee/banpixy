import styles from '../BanPickHeader.module.scss';

interface ReadyStateHeaderProps {
  onStart: () => void;
}

export default function ReadyStateHeader({ onStart }: ReadyStateHeaderProps) {
  return (
    <header className={styles.header}>
      <button onClick={onStart} className={styles.startButton}>
        시작하기
      </button>
    </header>
  );
}
