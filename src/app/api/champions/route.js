import { NextResponse } from "next/server";
import rawChampions from "@/server/data/champions.json";
import { transformChampions } from "@/lib/transformChampions";

export async function GET() {
  console.log('hi');
  const champions = transformChampions(rawChampions)
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json(champions);
}
