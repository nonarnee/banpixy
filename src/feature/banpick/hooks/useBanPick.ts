import { useEffect, useCallback } from 'react';
import { Champion } from '@/types/Champion';
import useBanPickStatus from './useBanPickStatus';
import useTeamComposition from './useTeamComposition';
import useBanPickFlow from './useBanPickFlow';

export default function useBanPick() {
  const status = useBanPickStatus();
  const flow = useBanPickFlow(status.isInProgress, status.complete, status.timerConfig);
  const composition = useTeamComposition();

  const resetBanPick = () => {
    status.reset();
    flow.resetFlow();
    composition.resetComposition();
  };

  // 랜덤 픽
  const pickRandomChampion = () => {
    if (composition.availableChampions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * composition.availableChampions.length);
    const randomChampion = composition.availableChampions[randomIndex];
    pickChampion(randomChampion);
  };

  const pickChampion = (champion: Champion) => {
    if (!champion) {
      console.error('잘못된 챔피언입니다.');
      return;
    }

    if (composition.disabledChampions.includes(champion)) {
      console.error('선택할 수 없는 챔피언입니다.');
      return;
    }

    if (flow.isPickPhase) {
      if (flow.isBluePhase) {
        composition.setBluePicks([...composition.bluePicks, champion]);
      }

      if (flow.isRedPhase) {
        composition.setRedPicks([...composition.redPicks, champion]);
      }
    }

    if (flow.isBanPhase) {
      if (flow.isBluePhase) {
        composition.setBlueBans([...composition.blueBans, champion]);
      }

      if (flow.isRedPhase) {
        composition.setRedBans([...composition.redBans, champion]);
      }
    }

    flow.goNextPhase();
  };

  const noBan = () => {
    if (!flow.isBanPhase) return;

    if (flow.isBluePhase) {
      composition.setBlueBans([...composition.blueBans, null]);
    }

    if (flow.isRedPhase) {
      composition.setRedBans([...composition.redBans, null]);
    }

    flow.goNextPhase();
  };

  useEffect(() => {
    // 시간 초과시
    if (!status.isInProgress) return;

    if (flow.time < 0) {
      if (flow.isBanPhase) {
        // 밴 페이즈에서는 스킵
        noBan();
      }

      if (flow.isPickPhase) {
        // 픽 페이즈에서는 랜덤 픽
        pickRandomChampion();
      }
    }
  }, [flow, status.isInProgress]);

  return {
    status,
    flow,
    composition,
    pickChampion,
    noBan,
    resetBanPick,
  };
} 
