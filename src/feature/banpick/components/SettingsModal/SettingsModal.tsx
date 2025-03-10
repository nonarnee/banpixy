import { useState, useMemo } from 'react';
import { BanPickSettings } from '@/types/Settings';
import styles from './SettingsModal.module.scss';
import TimerSettings from './TimerSettings';
import GlobalBanSettings from './GlobalBanSettings';
import { DEFAULT_SETTINGS } from '@/constants/settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BanPickSettings;
  onSave: (settings: BanPickSettings) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggleTimer = () => {
    setLocalSettings({
      ...localSettings,
      timer: {
        ...localSettings.timer,
        enabled: !localSettings.timer.enabled,
      },
    });
  };

  const getValidatedInputTime = (inputTime: number) => {
    if (inputTime < 5) return 5;
    if (inputTime > 60) return 60;

    return inputTime;
  }

  const handleChangeTimerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSettings({
      ...localSettings,
      timer: {
        ...localSettings.timer,
        duration: getValidatedInputTime(Number(e.target.value)),
      },
    })
  }

  const handleChangeGlobalBans = (globalBans: string[]) => {
    setLocalSettings({
      ...localSettings,
      globalBans,
    });
  }

  const handleClickReset = () => {
    setLocalSettings(DEFAULT_SETTINGS);
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>밴픽 설정</h2>

        <TimerSettings
          timer={localSettings.timer}
          onToggleTimer={handleToggleTimer}
          onChangeTimerInput={handleChangeTimerInput}
        />

        <GlobalBanSettings
          globalBans={localSettings.globalBans}
          onChange={handleChangeGlobalBans}
        />

        <div className={styles.buttons}>
          <button onClick={handleClickReset}>초기화</button>
          <button onClick={() => onSave(localSettings)}>저장</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
} 
