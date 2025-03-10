import { getChampions } from '@/lib/champions';
import BanPick from '@/feature/banpick/containers/BanPick';

export default async function BanPickPage() {
  const champions = getChampions();

  return (
    <main>
      <BanPick champions={champions} />
    </main>
  );
}
