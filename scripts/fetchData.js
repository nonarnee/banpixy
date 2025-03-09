import fs from "fs";
import path from "path";
import axios from "axios";

// 최신 버전 가져오기
const fetchLatestVersion = async () => {
  try {
    const response = await axios.get(`${process.env.RIOT_DD_URL}/api/versions.json`);
    return response.data[0]; // 최신 버전 (예: "15.5.1")
  } catch (error) {
    console.error("❌ 최신 버전 가져오기 실패:", error);
    return null;
  }
};

// 최신 버전 기반으로 챔피언 데이터 가져와서 저장
const fetchChampionData = async (version) => {
  const CHAMPION_DATA_URL = `${process.env.RIOT_DD_URL}/cdn/${version}/data/ko_KR/champion.json`;
  const OUTPUT_PATH = path.join(__dirname, "../src/server/data/champions.json");

  try {
    const response = await axios.get(CHAMPION_DATA_URL);
    const jsonData = response.data;

    // JSON 데이터를 public 폴더에 저장
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(jsonData, null, 2));

    console.log(`✅ 최신 버전(${version}) 챔피언 데이터 저장 완료!`);
  } catch (error) {
    console.error("❌ 챔피언 데이터 가져오기 실패:", error);
  }
};

const fetchData = async () => {
  const latestVersion = await fetchLatestVersion();
  if (!latestVersion) return;
  await fetchChampionData(latestVersion);
};

fetchData();
