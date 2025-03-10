import championLanes from '@/server/data/championLanes.json';
import { ChampionLane } from '@/types/Lane';

export function transformChampions(champions) {
  if (!champions || !champions.data) return [];

  return Object.values(champions.data).map((champion) => ({
    id: champion.id,
    name: champion.name,
    thumbnail: `${process.env.RIOT_DD_URL}/cdn/${champion.version}/img/champion/${champion.id}.png`,
    lanes: getChampionLanes(champion),
  }));
}

function getChampionLanes(champion) {
  const lanes = [];

  if (championLanes.TOP.includes(champion.id)) {
    lanes.push(ChampionLane.TOP);
  }
  if (championLanes.JUNGLE.includes(champion.id)) {
    lanes.push(ChampionLane.JUNGLE);
  }
  if (championLanes.MID.includes(champion.id)) {
    lanes.push(ChampionLane.MID);
  }
  if (championLanes.ADC.includes(champion.id)) {
    lanes.push(ChampionLane.ADC);
  }
  if (championLanes.SUPPORT.includes(champion.id)) {
    lanes.push(ChampionLane.SUPPORT);
  }

  if (!lanes.length) {
    console.error(`Champion ${champion.name} has no lanes`);
  }

  return lanes;
}

