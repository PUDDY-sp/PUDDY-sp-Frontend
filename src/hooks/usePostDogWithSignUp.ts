import { useState } from "react";
import { PostDogInputType } from "../types/sign";
import { CheckRegisterNum, PostDog, PostDogWithSignUp } from "../apis/DogApi";
import { DateType } from "../types/date";
import { useNavigate } from "react-router-dom";
import { upLoadS3 } from "./useS3";
import { useReissueToken } from "./useCommon";
export const usePostDogWithSignUp = () => {
  const { getReissueToken } = useReissueToken();
  const navigate = useNavigate();
  const [file, setFile] = useState<File>(new File([""], "filename"));
  const [postDogValue, setPostDogValue] = useState<PostDogInputType>({
    image: "",
    registerNum: "",
    name: "",
    type: "",
    gender: true,
    neuter: true,
    birth: "",
    tags: [],
  });
  const [isCorrectRegisterNum, setIsCorrectRegisterNum] = useState<number>(0);
  const [dateValue, setDateValue] = useState<DateType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const handlePostDogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDogValue({
      ...postDogValue,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostDogSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostDogValue({
      ...postDogValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "true") {
      setPostDogValue({
        ...postDogValue,
        [e.target.name]: true,
      });
    } else {
      setPostDogValue({
        ...postDogValue,
        [e.target.name]: false,
      });
    }
  };
  const handlePostDogImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostDogValue({
          ...postDogValue,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateValue({
      ...dateValue,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostDogTag = (content: string) => {
    const tagExists = postDogValue.tags.some((tag) => tag.content === content);
    const updatedTags = tagExists
      ? postDogValue.tags.filter((tag) => tag.content !== content)
      : [...postDogValue.tags, { content: content }];
    setPostDogValue({
      ...postDogValue,
      tags: updatedTags,
    });
  };
  const handlePostDog = async () => {
    if (
      isCorrectRegisterNum !== 1 ||
      postDogValue.image === "" ||
      postDogValue.name === "" ||
      postDogValue.tags.length === 0 ||
      postDogValue.type === ""
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const id = localStorage.getItem("id");
    if (id) {
      postDogValue.image = await upLoadS3(
        postDogValue.name,
        postDogValue.registerNum,
        file
      );
      let month = `${dateValue.month}`;
      let day = `${dateValue.day}`;
      if (dateValue.month < 10) {
        month = `0${dateValue.month}`;
      }
      if (dateValue.day < 10) {
        day = `0${dateValue.day}`;
      }
      postDogValue.birth = `${dateValue.year}-${month}-${day}`;
      PostDogWithSignUp(id, postDogValue)
        .then(() => {
          alert("강아지 등록이 완료되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("존재하지 않는 회원입니다.");
            navigate("/");
          }
        });
    }
  };
  const handlePostDogWithOutSignUp = async () => {
    if (
      isCorrectRegisterNum !== 1 ||
      postDogValue.image === "" ||
      postDogValue.name === "" ||
      postDogValue.tags.length === 0 ||
      postDogValue.type === ""
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    postDogValue.image = await upLoadS3(
      postDogValue.name,
      postDogValue.registerNum,
      file
    );
    let month = `${dateValue.month}`;
    let day = `${dateValue.day}`;
    if (dateValue.month < 10) {
      month = `0${dateValue.month}`;
    }
    if (dateValue.day < 10) {
      day = `0${dateValue.day}`;
    }
    postDogValue.birth = `${dateValue.year}-${month}-${day}`;
    PostDog(postDogValue)
      .then(() => {
        alert("강아지 등록이 완료되었습니다.");
        navigate("/mypage");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/mypage/postdog");
        }
      });
  };
  const handlePostDogFinish = async () => {
    if (
      isCorrectRegisterNum !== 1 ||
      postDogValue.image === "" ||
      postDogValue.name === "" ||
      postDogValue.tags.length === 0 ||
      postDogValue.type === "" ||
      postDogValue.tags.length === 0
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const id = localStorage.getItem("id");
    if (id) {
      postDogValue.image = await upLoadS3(
        postDogValue.name,
        postDogValue.registerNum,
        file
      );
      let month = `${dateValue.month}`;
      let day = `${dateValue.day}`;
      if (dateValue.month < 10) {
        month = `0${dateValue.month}`;
      }
      if (dateValue.day < 10) {
        day = `0${dateValue.day}`;
      }
      postDogValue.birth = `${dateValue.year}-${month}-${day}`;
      PostDogWithSignUp(id, postDogValue)
        .then(() => {
          alert("강아지 등록이 완료되었습니다.");
          navigate("/");
          localStorage.removeItem("id");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("존재하지 않는 회원입니다.");
            navigate("/");
          }
        });
    }
  };
  const handleCheckRegisterNum = () => {
    if (postDogValue.registerNum.length !== 10) {
      alert("10자리의 등록번호를 입력해주세요.");
      setIsCorrectRegisterNum(3);
      return;
    }
    CheckRegisterNum(postDogValue.registerNum).then((res) => {
      if (res.data === true) {
        setIsCorrectRegisterNum(1);
        alert("사용 가능한 등록번호입니다.");
      } else {
        setIsCorrectRegisterNum(2);
        alert("존재하지 않는 등록번호입니다.");
      }
    });
  };
  return {
    postDogValue,
    dateValue,
    isCorrectRegisterNum,
    handlePostDogChange,
    handlePostDogImage,
    handlePostDogTag,
    handleRadioCheck,
    handleDateSelect,
    handlePostDogSelect,
    handleCheckRegisterNum,
    handlePostDog,
    handlePostDogFinish,
    handlePostDogWithOutSignUp,
  };
};
