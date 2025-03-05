import styles from './TeamComposition.module.scss';
import { Champion } from '@/types/Champion';
import { Team } from '@/types/Team';
import clsx from 'clsx';

interface TeamCompositionProps {
  team: Team;
  picks: Champion[];
  bans: Champion[];
  isActive: boolean;
}

export default function TeamComposition({
  team,
  picks,
  bans,
  isActive,
}: TeamCompositionProps) {
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
              className={styles.banSlot}
            >
              {bans[i] && (
                <div className={styles.bannedChampion}>
                  <img
                    src={bans[i].imageUrl}
                    alt={bans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
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
              [styles.current]: isActive && i === picks.length,
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
              className={styles.banSlot}
            >
              {bans[i] && (
                <div className={styles.bannedChampion}>
                  <img
                    src={bans[i].imageUrl}
                    alt={bans[i].name}
                  />
                  <div className={styles.banOverlay} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
