export interface Champion {
  id: string;
  name: string;
  thumbnail: string;
}

export type BannedChampion = Champion | null;
