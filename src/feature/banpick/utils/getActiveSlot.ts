import { Phase } from '@/types/Phase';

export type ActiveSlot = Record<'BAN', number> | Record<'PICK', number>;

export default function getActiveSlot(phase: Phase): ActiveSlot {
  switch (phase) {
    case 'BAN_1':
      return { BAN: 1 };
    case 'BAN_2':
      return { BAN: 1 };
    case 'BAN_3':
      return { BAN: 2 };
    case 'BAN_4':
      return { BAN: 2 };
    case 'BAN_5':
      return { BAN: 3 };
    case 'BAN_6':
      return { BAN: 3 };
    case 'BAN_7':
      return { BAN: 4 };
    case 'BAN_8':
      return { BAN: 4 };
    case 'BAN_9':
      return { BAN: 5 };
    case 'BAN_10':
      return { BAN: 5 };
    case 'PICK_1':
      return { PICK: 1 };
    case 'PICK_2':
      return { PICK: 1 };
    case 'PICK_3':
      return { PICK: 2 };
    case 'PICK_4':
      return { PICK: 2 };
    case 'PICK_5':
      return { PICK: 3 };
    case 'PICK_6':
      return { PICK: 3 };
    case 'PICK_7':
      return { PICK: 4 };
    case 'PICK_8':
      return { PICK: 4 };
    case 'PICK_9':
      return { PICK: 5 };
    case 'PICK_10':
      return { PICK: 5 };
  }
}

