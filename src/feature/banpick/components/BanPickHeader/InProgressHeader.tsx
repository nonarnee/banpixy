import ControlButtons from './ControlButtons/ControlButtons';
import PhaseInfo from './PhaseInfo/PhaseInfo';
import ProgressBar from './ProgressBar/ProgressBar';
import Timer from './Timer/Timer';
import styles from './BanPickHeader.module.scss';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { useBanPickContext } from '../../contexts/BanPickContext';

export default function InProgressHeader() {
  const { settings } = useSettingsContext();
  const { flow } = useBanPickContext();

  return (
    <header className={styles.header}>
      <PhaseInfo />

      <div className={styles.rightContent}>
        <ControlButtons />
        {settings.timer.enabled && <Timer time={flow.time} />}
      </div>

      <ProgressBar />
    </header>
  );
}
