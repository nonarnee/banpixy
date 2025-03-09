import clsx from 'clsx';
import styles from './ChampionItem.module.scss';
import { Champion } from '@/types/Champion';
interface ChampionItemProps {
  champion: Champion;
  isInProgress: boolean;
  isNotSelectable?: boolean;
  onClick: (champion: Champion) => void;
}

export default function ChampionItem({
  champion,
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
      className={styles.championItem}
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
