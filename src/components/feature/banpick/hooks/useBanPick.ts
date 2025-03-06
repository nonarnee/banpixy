import { useEffect, useCallback } from 'react';
import { Champion } from '@/types/Champion';
import useBanPickStatus from './useBanPickStatus';
import useTeamComposition from './useTeamComposition';
import useBanPickFlow from './useBanPickFlow';

export default function useBanPick() {
  const status = useBanPickStatus();
  const flow = useBanPickFlow(status.isInProgress, status.complete);
  const composition = useTeamComposition();

  // 랜덤 픽
  const selectRandomChampion = useCallback(() => {
    if (composition.availableChampions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * composition.availableChampions.length);
    const randomChampion = composition.availableChampions[randomIndex];
    handleSelect(randomChampion);
  }, [composition.availableChampions]);

  const handleSelect = useCallback((champion: Champion) => {
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
  }, [flow, composition]);

  const handleSkipBan = useCallback(() => {
    if (!flow.isBanPhase) return;

    if (flow.isBluePhase) {
      composition.setBlueBans([...composition.blueBans, null]);
    }

    if (flow.isRedPhase) {
      composition.setRedBans([...composition.redBans, null]);
    }

    flow.goNextPhase();
  }, [flow, composition]);

  useEffect(() => {
    // 시간 초과시
    if (!status.isInProgress) return;

    if (flow.time < 0) {
      if (flow.isBanPhase) {
        // 밴 페이즈에서는 스킵
        handleSkipBan();
      }

      if (flow.isPickPhase) {
        // 픽 페이즈에서는 랜덤 픽
        selectRandomChampion();
      }
    }
  }, [flow]);

  return {
    status,
    flow,
    composition,
    handleSelect,
    handleSkipBan,
  };
} 
