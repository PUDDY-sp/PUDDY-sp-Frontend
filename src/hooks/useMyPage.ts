import { useEffect, useState } from "react";
import { getMyPage, logOut, patchMainDog } from "../apis/MyPageApi";
import { MyPageType } from "../types/myPage";
import { useNavigate } from "react-router-dom";
import { useReissueToken } from "./useCommon";

export const useMyPage = () => {
  const { getReissueToken } = useReissueToken();
  const navigate = useNavigate();
  const [myPageValue, setMyPageValue] = useState<MyPageType>({
    dogs: [],
    gender: true,
  });

  const getMyPageInfo = async () => {
    try {
      const res = await getMyPage();
      const datas = res.data;
      setMyPageValue(datas);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    logOut()
      .then(() => {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/mypage");
        }
      });
  };

  const buttonNavigate = (props: string) => {
    navigate(props);
  };

  const buttonDogNavigate = (props: string) => {
    navigate(props);
  };

  const updateMainDog = (id: number) => {
    patchMainDog(id)
      .then(() => {
        alert("메인 강아지가 변경되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/mypage");
        } else if (err.response.status === 404) {
          alert("존재하지 않는 강아지입니다.");
        }
      });
  };

  const goToPostDog = () => {
    navigate("/mypage/postdog");
  };

  useEffect(() => {
    getMyPageInfo().catch((err) => {
      if (err.response.status === 403) {
        getReissueToken("/mypage");
      }
    });
    console.log(localStorage.getItem("accessToken"));
  }, []);

  return {
    myPageValue,
    logout,
    buttonNavigate,
    updateMainDog,
    buttonDogNavigate,
    goToPostDog,
  };
};
