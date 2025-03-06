import { Phase } from '@/types/Phase';
import { Team } from '@/types/Team';

export const PHASE_ORDER: Phase[] = [
  'BAN_1', 'BAN_2', 'BAN_3', 'BAN_4', 'BAN_5', 'BAN_6',
  'PICK_1', 'PICK_2', 'PICK_3', 'PICK_4', 'PICK_5', 'PICK_6',
  'BAN_7', 'BAN_8', 'BAN_9', 'BAN_10',
  'PICK_7', 'PICK_8', 'PICK_9', 'PICK_10',
];

export const TEAM_ORDER: Record<Phase, Team> = {
  BAN_1: 'blue', BAN_2: 'red', BAN_3: 'blue',
  BAN_4: 'red', BAN_5: 'blue', BAN_6: 'red',
  PICK_1: 'blue', PICK_2: 'red', PICK_3: 'red',
  PICK_4: 'blue', PICK_5: 'blue', PICK_6: 'red',
  BAN_7: 'red', BAN_8: 'blue', BAN_9: 'red', BAN_10: 'blue',
  PICK_7: 'red', PICK_8: 'blue', PICK_9: 'blue', PICK_10: 'red',
};
