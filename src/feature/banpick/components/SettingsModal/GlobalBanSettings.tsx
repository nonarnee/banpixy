import { useMemo, useState } from 'react';
import styles from './SettingsModal.module.scss';
import { useChampionsContext } from '@/contexts/ChampionsContext';

interface GlobalBanSettingsProps {
  globalBans: string[];
  onChange: (globalBans: string[]) => void;
}

export default function GlobalBanSettings({ globalBans, onChange }: GlobalBanSettingsProps) {
  const champions = useChampionsContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChampions = useMemo(() =>
    champions.filter(champion =>
      champion.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [champions, searchQuery]
  );

  const handleClickGlobalBan = (championId: string) => {
    onChange([...globalBans, championId]);
    setSearchQuery('');
  }

  const handleRemoveGlobalBan = (championId: string) => {
    onChange(globalBans.filter(id => id !== championId));
  }

  return (
    <section>
      <h3>글로벌 밴</h3>
      <div className={styles.globalBanSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="챔피언 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.searchResults}>
            {searchQuery && filteredChampions
              .filter(champion => !globalBans.includes(champion.id))
              .map(champion => (
                <div
                  key={champion.id}
                  className={styles.searchItem}
                  onClick={() => handleClickGlobalBan(champion.id)}
                >
                  <img src={champion.thumbnail} alt={champion.name} />
                  <span>{champion.name}</span>
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.selectedBans}>
          {globalBans.map(championId => {
            const champion = champions.find(c => c.id === championId);
            if (!champion) return null;

            return (
              <div key={championId} className={styles.selectedBan}>
                <img src={champion.thumbnail} alt={champion.name} />
                <span>{champion.name}</span>
                <button
                  onClick={() => handleRemoveGlobalBan(championId)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 
