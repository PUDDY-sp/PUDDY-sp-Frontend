import {
  UpdateProfileInputType,
  UpdateDogProfileInputType,
} from "../types/update";
import { apiClient } from "./ApiClient";

export const getMyPage = () => {
  return apiClient.get(`/api/person/mypage`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const patchProfile = (profile: UpdateProfileInputType) => {
  return apiClient.patch(`/api/person`, JSON.stringify(profile), {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const getUserInfo = () => {
  return apiClient.get(`/api/person`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const getDogInfo = (dogId: number) => {
  return apiClient.get(`/api/dog/${dogId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const patchMainDog = (dogId: number) => {
  return apiClient.patch(`/api/dog/${dogId}/change-main`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const patchDog = (dogId: number, dog: UpdateDogProfileInputType) => {
  return apiClient.patch(`/api/dog/${dogId}`, JSON.stringify(dog), {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const deleteDog = (dogId: number) => {
  return apiClient.delete(`/api/dog/${dogId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const logOut = () => {
  return apiClient.delete(`/api/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      ReAuthorization: localStorage.getItem("refreshToken"),
      withCredentials: true,
    },
  });
};
