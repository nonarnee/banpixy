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
  if (championLanes.JGL.includes(champion.id)) {
    lanes.push(ChampionLane.JGL);
  }
  if (championLanes.MID.includes(champion.id)) {
    lanes.push(ChampionLane.MID);
  }
  if (championLanes.BOT.includes(champion.id)) {
    lanes.push(ChampionLane.BOT);
  }
  if (championLanes.SUP.includes(champion.id)) {
    lanes.push(ChampionLane.SUP);
  }

  if (!lanes.length) {
    console.error(`Champion ${champion.name} has no lanes`);
  }

  return lanes;
}
