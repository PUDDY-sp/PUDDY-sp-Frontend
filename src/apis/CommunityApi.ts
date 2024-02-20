import { PostInputType } from "../types/community";
import { apiClient } from "./ApiClient";

export const postCreatePost = (postInputType: PostInputType) => {
  return apiClient.post("api/post", JSON.stringify(postInputType), {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const patchPost = (postId: number, postInputType: PostInputType) => {
  return apiClient.patch(`/api/post/${postId}`, JSON.stringify(postInputType), {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const deletePost = (postId: number) => {
  return apiClient.delete(`/api/post/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const postLikePost = (postId: number) => {
  return apiClient.post(
    `/api/post/${postId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        withCredentials: true,
      },
    }
  );
};

export const getPostList = (pageNum: number) => {
  return apiClient.get("api/post", {
    params: {
      pageNum: pageNum,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const getPostDetail = (postId: number) => {
  return apiClient.get(`/api/post/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};

export const postComment = (postId: number, content: string) => {
  return apiClient.post(
    `/api/${postId}/comment`,
    { content },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        withCredentials: true,
      },
    }
  );
};

export const patchComment = (
  postId: number,
  commentId: number,
  content: string
) => {
  return apiClient.patch(
    `/api/${postId}/comment/${commentId}`,
    { content },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
        withCredentials: true,
      },
    }
  );
};

export const deleteComment = (postId: number, commentId: number) => {
  return apiClient.delete(`/api/${postId}/comment/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
      withCredentials: true,
    },
  });
};
