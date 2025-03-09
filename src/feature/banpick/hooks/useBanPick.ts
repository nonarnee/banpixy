import { useEffect } from 'react';
import useBanPickStatus from './useBanPickStatus';
import useTeamComposition from './useTeamComposition';
import useBanPickFlow from './useBanPickFlow';
import withInProgress from '../utils/withInProgress';
import { Champion } from '@/types/Champion';

export default function useBanPick(champions: Champion[]) {
  const status = useBanPickStatus();
  const flow = useBanPickFlow(status.isInProgress, status.complete, status.timerConfig);
  const composition = useTeamComposition(champions);

  const selectRandom = withInProgress(() => {
    if (composition.availableChampions.length === 0) return;
    console.log(composition.availableChampions);

    const randomIndex = Math.floor(Math.random() * composition.availableChampions.length);
    const randomChampion = composition.availableChampions[randomIndex];
    flow.selectChampion(randomChampion);
  }, status.isInProgress);

  const confirmSelection = withInProgress(() => {
    if (!flow.currentSelection) return;

    if (flow.currentSelection.type === 'NO_BAN') {
      noBan();
    }

    if (flow.currentSelection.type === 'CHAMPION' || flow.currentSelection.type === 'RANDOM') {
      if (!flow.currentSelection.champion) {
        console.error('챔피언이 선택되지 않았습니다.');
        return;
      }

      pickChampion(flow.currentSelection.champion);
    }
  }, status.isInProgress);

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
      composition.updatePick(flow.currentTeam, champion);
    }

    if (flow.isBanPhase) {
      composition.updateBan(flow.currentTeam, champion);
    }

    flow.goNextPhase();
  };

  const noBan = () => {
    if (!flow.isBanPhase) return;

    composition.updateBan(flow.currentTeam, null);
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
    selectRandom,
    confirmSelection,
  };
} 
