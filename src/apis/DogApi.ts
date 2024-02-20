import { PostDogInputType } from "../types/sign";
import { apiClient } from "./ApiClient";

export const GetDogTypes = () => {
  return apiClient.get("/api/dogtype");
};
export const GetDogTags = () => {
  return apiClient.get("/api/dogtag");
};
export const PostDogWithSignUp = (
  personId: string,
  postDogInputType: PostDogInputType
) => {
  return apiClient.post(
    `/api/${personId}/dog`,
    JSON.stringify(postDogInputType),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
export const PostDog = (postDogInputType: PostDogInputType) => {
  return apiClient.post(`/api/dog`, JSON.stringify(postDogInputType), {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};
export const CheckRegisterNum = (registerNum: string) => {
  return apiClient.get(`/api/dog/check?registerNum=${registerNum}`);
};
