import { TrailReviewInputType } from "../types/trailReview";
import { apiClient } from "./ApiClient";

export const GetTrailReviewList = (trailId: number, pageNum: number) => {
  return apiClient.get(`/api/trail/${trailId}/review`, {
    params: {
      pageNum: pageNum,
    },
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const PostTrailReview = (
  trailId: number,
  trailReviewInputType: TrailReviewInputType
) => {
  return apiClient.post(
    `/api/trail/${trailId}/review`,
    JSON.stringify(trailReviewInputType),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        withCredentials: true,
      },
    }
  );
};

export const DeleteTrailReview = (trailId: number, reviewId: number) => {
  return apiClient.delete(`/api/trail/${trailId}/review/${reviewId}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};
