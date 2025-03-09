import clsx from 'clsx';
import styles from './TeamComposition.module.scss';
import { BannedChampion } from '@/types/Champion';

interface BanSlotsProps {
  bans: BannedChampion[];
  isActive: boolean;
  banpick: string;
  slot: number;
  previewImage?: string;
}

export default function BanSlots({
  bans,
  isActive,
  banpick,
  slot,
  previewImage,
}: BanSlotsProps) {
  return (
    <div className={styles.bans}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={clsx(styles.banSlot, {
            [styles.current]: banpick === 'BAN' && slot === i + 1,
          })}
        >
          {bans[i] && (
            <div className={styles.bannedChampion}>
              <img
                src={bans[i].thumbnail}
                alt={bans[i].name}
              />
              <div className={styles.banOverlay} />
            </div>
          )}
          {bans[i] === null && (
            <div className={styles.bannedChampion}>
              <div className={styles.banText}>NO</div>
              <div className={styles.banOverlay} />
            </div>
          )}
          {!bans[i] && banpick === 'BAN' && slot === i + 1 && isActive && previewImage && (
            <div className={styles.bannedChampion}>
              {previewImage === 'NO' && (
                <div className={styles.banText}>NO</div>
              )}
              {previewImage !== 'NO' && (
                <img
                  src={previewImage}
                  alt="챔피언 미리보기"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 
