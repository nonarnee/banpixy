import styles from './TeamComposition.module.scss';
import { Champion } from '@/types/Champion';
import { Team } from '@/types/Team';
import { ActiveSlot } from '@/components/feature/banpick/utils/getActiveSlot';
import clsx from 'clsx';
import { BannedChampion } from '@/types/Champion';

interface TeamCompositionProps {
  team: Team;
  picks: Champion[];
  bans: BannedChampion[];
  isActive: boolean;
  activeSlot: ActiveSlot;
}

export default function TeamComposition({
  team,
  picks,
  bans,
  isActive,
  activeSlot,
}: TeamCompositionProps) {
  const [[banpick, slot]] = Object.entries(activeSlot);
  console.log(banpick, slot);

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
              {bans[i] && (
                // 밴 챔피언
                <div className={styles.bannedChampion}>
                  <img
                    src={bans[i].imageUrl}
                    alt={bans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
              )}
              {bans[i] === null && (
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
                src={picks[i].imageUrl}
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
              {bans[i] && (
                // 밴 챔피언
                <div className={styles.bannedChampion}>
                  <img
                    src={bans[i].imageUrl}
                    alt={bans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
              )}
              {bans[i] === null && (
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
