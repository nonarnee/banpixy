import clsx from 'clsx';
import { TimerConfig } from '@/types/Settings';
import styles from './SettingsModal.module.scss';

interface TimerSettingsProps {
  timer: TimerConfig;
  onToggleTimer: () => void;
  onChangeTimerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimerSettings({
  timer,
  onToggleTimer,
  onChangeTimerInput
}: TimerSettingsProps) {
  return (
    <section>
      <h3>타이머 설정</h3>
      <div>
        <button
          className={clsx(styles.timerToggleButton, {
            [styles.active]: timer.enabled,
          })}
          onClick={onToggleTimer}
        >
          타이머 {timer.enabled ? '사용' : '미사용'}
        </button>
      </div>

      {timer.enabled && (
        <div>
          <label>
            선택 시간
            <input
              type="number"
              value={timer.duration}
              onChange={onChangeTimerInput}
              min={5}
              max={60}
            />
            초 (최소 5, 최대 60)
          </label>
        </div>
      )}
    </section>
  );
} 
