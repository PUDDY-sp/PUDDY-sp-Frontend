import { apiClient } from "./ApiClient";

export const getChatList = () => {
  return apiClient.get(`/api/chat`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};
export const getChatDetail = (chatId: number) => {
  return apiClient.get(`/api/chat/${chatId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const deleteChat = (chatId: number) => {
  return apiClient.delete(`/api/chat/${chatId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};
