import fs from "fs";
import path from "path";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const versions = await axios.get(`${process.env.RIOT_DD_URL}/api/versions.json`);
    const latestVersion = versions.data[0];

    const championData = await axios.get(`${process.env.RIOT_DD_URL}/cdn/${latestVersion}/data/en_US/champion.json`);

    // ✅ JSON 파일 저장
    const filePath = path.join(process.cwd(), "server/data/champions.json");
    fs.writeFileSync(filePath, JSON.stringify(championData.data, null, 2));

    return NextResponse.json({ success: true, version: latestVersion });
  } catch (error) {
    return NextResponse.json({ error: "데이터 저장 실패" }, { status: 500 });
  }
}
