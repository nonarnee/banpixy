import styles from './TeamComposition.module.scss';
import { Team } from '@/types/Team';
import getActiveSlot from '@/feature/banpick/utils/getActiveSlot';
import clsx from 'clsx';
import { useBanPickContext } from '../../contexts/BanPickContext';
import PickSlots from './PickSlots';
import BanSlots from './BanSlots';
import { useSettingsContext } from '../../contexts/SettingsContext';

interface TeamCompositionProps {
  team: Team;
}

export default function TeamComposition({ team }: TeamCompositionProps) {
  const { settings } = useSettingsContext();
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
      hasTeamName={!!settings.teamName[team]}
      isSwapEnabled={flow.isSwapEnabled}
      onSwap={(sourceIndex, targetIndex) => composition.swapPicks(team, sourceIndex, targetIndex)}
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
    <div className={styles.container}>
      {!!settings.teamName[team] && (
        <h2 className={clsx(styles.teamName, {
          [styles.blue]: team === 'blue',
          [styles.red]: team === 'red',
        })}>
          {settings.teamName[team]}
        </h2>
      )}
      <div className={clsx(styles.slots, {
        [styles.blue]: team === 'blue',
        [styles.red]: team === 'red',
        [styles.active]: isActive,
      })}
      >
        {team === 'blue' && slots}
        {team === 'red' && slots.reverse()}
      </div>
    </div>
  );
}
