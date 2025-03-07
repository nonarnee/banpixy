export function transformChampions(champions) {
  if (!champions || !champions.data) return [];

  return Object.values(champions.data).map((champion) => ({
    id: champion.id,
    name: champion.name,
    thumbnail: `${process.env.RIOT_DD_URL}/cdn/${champion.version}/img/champion/${champion.id}.png`,
  }));
}
