import { apiClient } from "./ApiClient";
import { FilterDogType } from "../types/match";

export const getRandomMatch = (filter: FilterDogType) => {
  const { type, neuter, tags } = filter;
  return apiClient.get(`/api/random`, {
    params: {
      type: type === "" ? null : type,
      neuter: neuter === null ? null : neuter,
      tags: tags.length === 0 ? null : tags.map((tag) => tag.content).join(","),
    },
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const postmatch = (personId: number) => {
  return apiClient.post(
    `/api/match/${personId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
};
export const getMatch = () => {
  return apiClient.get(`/api/match`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};
export const getPersonDetail = (personId: number) => {
  return apiClient.get(`/api/random/${personId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};
