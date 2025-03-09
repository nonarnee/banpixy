import clsx from 'clsx';
import styles from './ChampionItem.module.scss';
import { Champion } from '@/types/Champion';
interface ChampionItemProps {
  champion: Champion;
  isCurrent: boolean;
  isInProgress: boolean;
  isNotSelectable?: boolean;
  onClick: (champion: Champion) => void;
}

export default function ChampionItem({
  champion,
  isCurrent,
  isInProgress,
  isNotSelectable,
  onClick
}: ChampionItemProps) {
  const handleClickChampion = () => {
    if (!isInProgress || isNotSelectable) return;

    onClick(champion);
  };

  return (
    <button
      className={clsx(styles.championItem, {
        [styles.current]: isCurrent,
      })}
      onClick={handleClickChampion}
      disabled={isNotSelectable || !isInProgress}
    >
      <div className={styles.imageWrapper}>
        <img
          src={champion.thumbnail}
          alt={champion.name}
          className={styles.image}
        />
        {isNotSelectable && <div className={styles.disabledOverlay} />}
      </div>
      <span className={styles.name}>{champion.name}</span>
    </button>
  );
}
