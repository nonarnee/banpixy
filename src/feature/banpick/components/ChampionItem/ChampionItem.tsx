import clsx from 'clsx';
import styles from './ChampionItem.module.scss';
import { Champion } from '@/types/Champion';

interface ChampionItemProps {
  champion: Champion;
  isDisabled?: boolean;
  onClick: (champion: Champion) => void;
}

export default function ChampionItem({
  champion,
  isDisabled,
  onClick
}: ChampionItemProps) {
  return (
    <button
      className={clsx(styles.championItem, {
        [styles.disabled]: isDisabled
      })}
      onClick={() => onClick(champion)}
      disabled={isDisabled}
    >
      <div className={styles.imageWrapper}>
        {/* TODO: 이미지 추가 후 주석 해제 */}
        {/* <img
          src={champion.imageUrl}
          alt={champion.name}
          className={styles.image}
        /> */}
        {isDisabled && <div className={styles.disabledOverlay} />}
      </div>
      <span className={styles.name}>{champion.name}</span>
    </button>
  );
}
