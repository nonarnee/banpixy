import { Phase } from '@/types/Phase';

export default function getPhaseText(phase: Phase) {
  switch (phase) {
    case 'BAN_1':
      return '1밴';
    case 'BAN_2':
      return '1밴';
    case 'BAN_3':
      return '2밴';
    case 'BAN_4':
      return '2밴';
    case 'BAN_5':
      return '3밴';
    case 'BAN_6':
      return '3밴';
    case 'BAN_7':
      return '4밴';
    case 'BAN_8':
      return '4밴';
    case 'BAN_9':
      return '5밴';
    case 'BAN_10':
      return '5밴';
    case 'PICK_1':
      return '1픽';
    case 'PICK_2':
      return '1픽';
    case 'PICK_3':
      return '2픽';
    case 'PICK_4':
      return '2픽';
    case 'PICK_5':
      return '3픽';
    case 'PICK_6':
      return '3픽';
    case 'PICK_7':
      return '4픽';
    case 'PICK_8':
      return '4픽';
    case 'PICK_9':
      return '5픽';
    case 'PICK_10':
      return '5픽';
    default:
      return 'Loading...';
  }
}
