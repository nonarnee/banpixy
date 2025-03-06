import ReadyStateHeader from './ReadyStateHeader';
import InProgressHeader from './InProgressHeader';
import EndStateHeader from './EndStateHeader';
import { useBanPickContext } from '../../contexts/BanPickContext';

export default function BanPickHeader() {
  const { status } = useBanPickContext();

  if (status.isCompleted) return <EndStateHeader />;
  if (status.isReady) return <ReadyStateHeader />;

  return (
    <InProgressHeader />
  );
}
