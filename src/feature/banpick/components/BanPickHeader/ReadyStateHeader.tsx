import { useBanPickContext } from '../../contexts/BanPickContext';
import styles from './BanPickHeader.module.scss';

export default function ReadyStateHeader() {
  const { status } = useBanPickContext();

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    status.updateTimerConfig({
      ...status.timerConfig,
      enabled: e.target.checked
    });
  };

  const handleChangeTimerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    status.updateTimerConfig({
      ...status.timerConfig,
      duration: Number(e.target.value)
    });
  };

  const handleClickStart = () => {
    status.start();
  };

  return (
    <header className={styles.header}>
      <div className={styles.readyContent}>
        <div className={styles.timerConfig}>
          <label className={styles.timerToggle}>
            <input
              type="checkbox"
              checked={status.timerConfig.enabled}
              onChange={handleChangeCheckbox}
            />
            <span>타이머 사용</span>
          </label>

          {status.timerConfig.enabled && (
            <div className={styles.timerDuration}>
              <input
                type="number"
                min="1"
                max="60"
                value={status.timerConfig.duration}
                onChange={handleChangeTimerInput}
              />
              <span>초</span>
            </div>
          )}
        </div>

        <button onClick={handleClickStart} className={styles.startButton}>
          시작하기
        </button>
      </div>
    </header>
  );
}
