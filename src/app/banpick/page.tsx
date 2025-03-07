import BanPick from '@/feature/banpick/containers/BanPick';

async function getChampions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/champions`, {
    cache: "no-store", // 최신 데이터 반영
  });
  console.log(res);

  return res.json();
}

export default async function BanPickPage() {
  const champions = await getChampions();

  return (
    <main>
      <BanPick champions={champions} />
    </main>
  );
}
