import { Phase } from '@/types/Phase';
import { Team } from '@/types/Team';
import clsx from 'clsx';
import styles from './PhaseInfo.module.scss';
import getPhaseText from '@/components/feature/banpick/utils/getPhaseText';

interface PhaseInfoProps {
  currentTeam: Team;
  phase: Phase;
}

export default function PhaseInfo({
  currentTeam,
  phase,
}: PhaseInfoProps) {
  return (
    <div className={styles.phaseInfo}>
      <div
        className={clsx(styles.teamIndicator, {
          [styles.blue]: currentTeam === 'blue',
          [styles.red]: currentTeam === 'red'
        })}
      >
        {currentTeam.toUpperCase()} TEAM
      </div>
      <div className={styles.phase}>
        {getPhaseText(phase)}
      </div>
    </div>
  );
}
