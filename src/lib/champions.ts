import rawChampions from '@/server/data/champions.json';
import { Champion } from '@/types/Champion';
import { transformChampions } from '@/lib/transformChampions';

export function getChampions() {
  return transformChampions(rawChampions)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function findChampionById(champions: Champion[], id: string) {
  const targetChampion = champions.find(champion => champion.id === id);

  if (!targetChampion) {
    console.error(`Champion with id ${id} not found`);
    return null;
  }

  return targetChampion;
}

export function filterChampions(champions: Champion[], query: string) {
  return champions.filter(champion =>
    champion.name.toLowerCase().includes(query.toLowerCase())
  );
} 
