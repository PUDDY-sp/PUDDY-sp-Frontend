import { GetWalkRoadRoute } from "../apis/RecommendWalkRoadApi";
import { WalkRoadType } from "../types/walkRoad.ts";

export const handleWalkRoadRoute = async (road: WalkRoadType) => {
  try {
    const response = await GetWalkRoadRoute(road);
    return response.data;
  } catch (e) {
    console.error(e);
    alert("산책로 도보 경로 정보를 못 받아왔습니다.");
    throw e;
  }
};
