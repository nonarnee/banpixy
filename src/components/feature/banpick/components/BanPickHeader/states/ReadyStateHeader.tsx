import styles from '../BanPickHeader.module.scss';
import { TimerConfig } from '@/components/feature/banpick/hooks/useBanPickStatus';

interface ReadyStateHeaderProps {
  onStart: () => void;
  timerConfig: TimerConfig;
  onUpdateTimerConfig: (config: Partial<TimerConfig>) => void;
}

export default function ReadyStateHeader({
  onStart,
  timerConfig,
  onUpdateTimerConfig,
}: ReadyStateHeaderProps) {
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => onUpdateTimerConfig({
    ...timerConfig,
    enabled: e.target.checked
  })

  const handleChangeTimerInput = (e: React.ChangeEvent<HTMLInputElement>) => onUpdateTimerConfig({
    ...timerConfig,
    duration: Number(e.target.value)
  })

  return (
    <header className={styles.header}>
      <div className={styles.readyContent}>
        <div className={styles.timerConfig}>
          <label className={styles.timerToggle}>
            <input
              type="checkbox"
              checked={timerConfig.enabled}
              onChange={handleChangeCheckbox}
            />
            <span>타이머 사용</span>
          </label>
          {timerConfig.enabled && (
            <div className={styles.timerDuration}>
              <input
                type="number"
                min="1"
                max="60"
                value={timerConfig.duration}
                onChange={handleChangeTimerInput}
              />
              <span>초</span>
            </div>
          )}
        </div>

        <button onClick={onStart} className={styles.startButton}>
          시작하기
        </button>
      </div>
    </header>
  );
}
