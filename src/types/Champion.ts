export interface Champion {
  id: string;
  name: string;
  thumbnail: string;
}

export interface ChampionRaw {
  id: string;
  name: string;
  version: string;
}

export type BannedChampion = Champion | null;
