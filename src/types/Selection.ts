import { Champion } from './Champion';

export interface Selection {
  type: 'CHAMPION' | 'NO_BAN' | 'RANDOM';
  champion?: Champion;
} 
