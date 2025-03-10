import { useState } from 'react';
import { useBanPickContext } from '../../contexts/BanPickContext';
import { useSettingsContext } from '../../contexts/SettingsContext';
import styles from './BanPickHeader.module.scss';
import SettingsModal from '../SettingsModal/SettingsModal';
import { BanPickSettings } from '@/types/Settings';

export default function ReadyStateHeader() {
  const { settings, updateSettings } = useSettingsContext();
  const { status } = useBanPickContext();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleClickSettingsButton = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const handleCloseSettingsModal = () => {
    setIsSettingsOpen(false);
  }

  const handleClickSaveSettings = (settings: BanPickSettings) => {
    updateSettings(settings);
    setIsSettingsOpen(false);
  }

  const handleClickStart = () => {
    status.start();
  };

  return (
    <header className={styles.header}>
      <div className={styles.readyContent}>
        <button
          className={styles.settingButton}
          onClick={handleClickSettingsButton}
        >
          설정
        </button>

        <button
          onClick={handleClickStart}
          className={styles.startButton}
        >
          시작하기
        </button>
      </div>

      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={handleCloseSettingsModal}
          settings={settings}
          onSave={handleClickSaveSettings}
        />
      )}
    </header>
  );
}
