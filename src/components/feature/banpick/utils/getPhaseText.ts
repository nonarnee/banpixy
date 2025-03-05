import { Phase } from '@/types/Phase';

export default function getPhaseText(phase: Phase) {
  switch (phase) {
    case 'BAN_1':
      return 'BLUE 1밴';
    case 'BAN_2':
      return 'RED 1밴';
    case 'BAN_3':
      return 'BLUE 2밴';
    case 'BAN_4':
      return 'RED 2밴';
    case 'BAN_5':
      return 'BLUE 3밴';
    case 'BAN_6':
      return 'RED 3밴';
    case 'PICK_1':
      return 'BLUE 1픽';
    case 'PICK_2':
      return 'RED 1,2픽';
    case 'PICK_3':
      return 'BLUE 2,3픽';
    case 'PICK_4':
      return 'RED 3픽';
    case 'BAN_7':
      return 'RED 4밴';
    case 'BAN_8':
      return 'BLUE 4밴';
    case 'BAN_9':
      return 'RED 5밴';
    case 'BAN_10':
      return 'BLUE 5밴';
    case 'PICK_5':
      return 'RED 4픽';
    case 'PICK_6':
      return 'BLUE 4,5픽';
    case 'PICK_7':
      return 'RED 5픽';
    default:
      return 'Loading...';
  }
}
