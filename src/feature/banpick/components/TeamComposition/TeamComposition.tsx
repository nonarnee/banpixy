import styles from './TeamComposition.module.scss';
import { Team } from '@/types/Team';
import getActiveSlot from '@/feature/banpick/utils/getActiveSlot';
import clsx from 'clsx';
import { useBanPickContext } from '../../contexts/BanPickContext';

interface TeamCompositionProps {
  team: Team;
}

export default function TeamComposition({ team }: TeamCompositionProps) {
  const { status, composition, flow } = useBanPickContext();

  const isActive = status.isInProgress && flow.currentTeam === team;
  const picks = team === 'blue'
    ? composition.bluePicks
    : composition.redPicks;

  const activeSlot = getActiveSlot(flow.currentPhase);
  const [[banpick, slot]] = Object.entries(activeSlot);

  return (
    <div className={clsx(styles.container, {
      [styles.blue]: team === 'blue',
      [styles.red]: team === 'red',
      [styles.active]: isActive,
    })}>
      {team === 'red' && (
        <div className={styles.bans}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={clsx(styles.banSlot, {
                [styles.current]: banpick === 'BAN' && slot === i + 1,
              })}
            >
              {composition.redBans[i] && (
                // 밴 챔피언
                <div className={styles.bannedChampion}>
                  <img
                    src={composition.redBans[i].thumbnail}
                    alt={composition.redBans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
              )}
              {composition.redBans[i] === null && (
                // 밴 스킵
                <div className={styles.banOverlay} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.picks}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={clsx(styles.pickSlot, {
              [styles.empty]: !picks[i],
              [styles.selected]: picks[i],
              [styles.current]: banpick === 'PICK' && slot === i + 1,
            })}
          >
            {picks[i] && (
              <img
                src={picks[i].thumbnail}
                alt={picks[i].name}
                className={styles.championImage}
              />
            )}
          </div>
        ))}
      </div>

      {team === 'blue' && (
        <div className={styles.bans}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={clsx(styles.banSlot, {
                [styles.current]: banpick === 'BAN' && slot === i + 1,
              })}
            >
              {composition.blueBans[i] && (
                // 밴 챔피언
                <div className={styles.bannedChampion}>
                  <img
                    src={composition.blueBans[i].thumbnail}
                    alt={composition.blueBans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
              )}
              {composition.blueBans[i] === null && (
                // 밴 스킵
                <div className={styles.banOverlay} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
