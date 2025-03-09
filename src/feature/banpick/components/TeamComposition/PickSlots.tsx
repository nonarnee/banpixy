import clsx from 'clsx';
import styles from './TeamComposition.module.scss';
import { Champion } from '@/types/Champion';

interface PickSlotsProps {
  picks: Champion[];
  isActive: boolean;
  banpick: string;
  slot: number;
  previewImage?: string;
}

export default function PickSlots({
  picks,
  isActive,
  banpick,
  slot,
  previewImage,
}: PickSlotsProps) {
  return (
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
          {picks[i] ? (
            <img
              src={picks[i].thumbnail}
              alt={picks[i].name}
              className={styles.championImage}
            />
          ) : (banpick === 'PICK' && slot === i + 1 && isActive && previewImage && (
            <img
              src={previewImage}
              alt="챔피언 미리보기"
              className={styles.championImage}
            />
          ))}
        </div>
      ))}
    </div>
  );
} 
