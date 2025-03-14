import clsx from 'clsx';
import styles from './TeamComposition.module.scss';
import { Champion } from '@/types/Champion';

interface PickSlotsProps {
  picks: Champion[];
  isActive: boolean;
  banpick: string;
  slot: number;
  previewImage?: string;
  hasTeamName: boolean;
  isSwapEnabled: boolean;
  onSwap: (sourceIndex: number, targetIndex: number) => void;
}

export default function PickSlots({
  picks,
  isActive,
  banpick,
  slot,
  previewImage,
  hasTeamName,
  isSwapEnabled,
  onSwap,
}: PickSlotsProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (!isSwapEnabled) return;
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    if (!isSwapEnabled) return;
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    onSwap?.(sourceIndex, targetIndex);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.picks}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={clsx(styles.pickSlot, {
            [styles.empty]: !picks[i],
            [styles.selected]: picks[i],
            [styles.current]: banpick === 'PICK' && slot === i + 1,
            [styles.hasTeamName]: hasTeamName,
            [styles.swappable]: isSwapEnabled && picks[i],
          })}
          draggable={isSwapEnabled && !!picks[i]}
          onDragStart={(e) => handleDragStart(e, i)}
          onDrop={(e) => handleDrop(e, i)}
          onDragOver={handleDragOver}
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
