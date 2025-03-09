import clsx from 'clsx';
import styles from './ChampionItem.module.scss';

interface CustomItemProps {
  name: string;
  innerText?: string;
  isCurrent: boolean;
  isInProgress: boolean;
  onClick: () => void;
}

export default function CustomItem({
  name,
  innerText,
  isCurrent,
  isInProgress,
  onClick
}: CustomItemProps) {
  const handleClickItem = () => {
    onClick();
  };

  return (
    <button
      className={clsx(styles.championItem, {
        [styles.current]: isCurrent,
      })}
      onClick={handleClickItem}
      disabled={!isInProgress}
    >
      <div className={styles.textWrapper}>
        {innerText && innerText}
      </div>
      <span className={styles.name}>{name}</span>
    </button>
  );
}
