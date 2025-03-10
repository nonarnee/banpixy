import { ChampionLane } from './Lane';

export interface Champion {
  id: string;
  name: string;
  thumbnail: string;
  lanes: ChampionLane[];
}

export interface ChampionRaw {
  id: string;
  name: string;
  version: string;
}

export type BannedChampion = Champion | null;
