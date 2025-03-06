import clsx from 'clsx';
import styles from './PhaseInfo.module.scss';
import getPhaseText from '@/feature/banpick/utils/getPhaseText';
import { useBanPickContext } from '@/feature/banpick/contexts/BanPickContext';

export default function PhaseInfo() {
  const { flow } = useBanPickContext();

  return (
    <div className={styles.phaseInfo}>
      <div
        className={clsx(styles.teamIndicator, {
          [styles.blue]: flow.currentTeam === 'blue',
          [styles.red]: flow.currentTeam === 'red'
        })}
      >
        {flow.currentTeam.toUpperCase()} TEAM
      </div>
      <div className={styles.phase}>
        {getPhaseText(flow.currentPhase)}
      </div>
    </div>
  );
}
