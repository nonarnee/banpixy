import clsx from 'clsx';
import styles from './Timer.module.scss';

interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className={styles.timer}>
      <div className={clsx(styles.timerValue, {
        [styles.warning]: time <= 10
      })}>
        {Math.max(time, 0)}
      </div>
      <div className={styles.timerLabel}>
        TIMER
      </div>
    </div>
  );
}
