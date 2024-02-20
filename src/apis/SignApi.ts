import { SignInInputType, SignUpInputType } from "../types/sign";
import { apiClient } from "./ApiClient";

export const SignIn = (signInValue: SignInInputType) => {
  return apiClient.post("/api/auth/login", JSON.stringify(signInValue), {
    headers: { "Content-Type": "application/json" },
  });
};
export const SignUp = (signUpValue: SignUpInputType) => {
  return apiClient.post("/api/auth/signup", JSON.stringify(signUpValue), {
    headers: { "Content-Type": "application/json" },
  });
};
export const CheckLogin = (login: string) => {
  return apiClient.get(`/api/auth/findsamelogin?login=${login}`);
};
export const CheckAddress = (mainAddress: string) => {
  return apiClient.get(`/api/kakao/address?mainAddress=${mainAddress}`);
};
export const ReissueToken = () => {
  return apiClient.post("/api/auth/reissue", {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      Reauthorization: localStorage.getItem("refreshToken"),
    },
  });
};
