import { apiClient } from "./ApiClient";
import { apiTmap } from "./apiTmap.ts";
import { WalkRoadType } from "../types/walkRoad.ts";
import { FeatureCollection } from "../types/walkRoadRoute.ts";
import { AxiosResponse } from "axios";

export const GetRecommendWalkRoad = () => {
  return apiClient.get("/api/trail", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const GetWalkRoadRoute = (
  road: WalkRoadType
): Promise<AxiosResponse<FeatureCollection>> => {
  return apiTmap.post(
    `tmap/routes/pedestrian?version=1&format=json&appKey=${import.meta.env.VITE_TMAP_API_KEY}`,
    {
      startX: road.startLong,
      startY: road.startLat,
      endX: road.endLong,
      endY: road.endLat,
      reqCoordType: `WGS84GEO`,
      resCoordType: `EPSG3857`,
      startName: `출발지`,
      endName: `도착지`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
