import styles from './TeamComposition.module.scss';
import { Team } from '@/types/Team';
import getActiveSlot from '@/feature/banpick/utils/getActiveSlot';
import clsx from 'clsx';
import { useBanPickContext } from '../../contexts/BanPickContext';
import PickSlots from './PickSlots';
import BanSlots from './BanSlots';

interface TeamCompositionProps {
  team: Team;
}

export default function TeamComposition({ team }: TeamCompositionProps) {
  const { status, composition, flow } = useBanPickContext();

  const isActive = status.isInProgress && flow.currentTeam === team;
  const activeSlot = getActiveSlot(flow.currentPhase);
  const [[banpick, slot]] = Object.entries(activeSlot);

  const picks = team === 'blue'
    ? composition.bluePicks
    : composition.redPicks;
  const bans = team === 'blue'
    ? composition.blueBans
    : composition.redBans;

  const getPreviewImage = (): string | undefined => {
    if (!flow.currentSelection || !isActive) return undefined;
    if (flow.currentSelection.type === 'NO_BAN') return 'NO';
    if (!flow.currentSelection.champion) return undefined;
    return flow.currentSelection.champion.thumbnail;
  };

  const slots = [
    <PickSlots
      key={`${team}-pick`}
      picks={picks}
      isActive={isActive}
      banpick={banpick}
      slot={slot}
      previewImage={getPreviewImage()}
    />,
    <BanSlots
      key={`${team}-ban`}
      bans={bans}
      isActive={isActive}
      banpick={banpick}
      slot={slot}
      previewImage={getPreviewImage()}
    />,
  ];

  return (
    <div className={clsx(styles.container, {
      [styles.blue]: team === 'blue',
      [styles.red]: team === 'red',
      [styles.active]: isActive,
    })}>
      {team === 'blue' && slots}
      {team === 'red' && slots.reverse()}
    </div>
  );
}
