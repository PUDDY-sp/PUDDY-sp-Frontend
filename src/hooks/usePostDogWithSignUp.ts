import { useState } from "react";
import { PostDogInputType } from "../types/sign";
import { CheckRegisterNum, PostDogWithSignUp } from "../apis/DogApi";
import { DateType } from "../types/date";
import AWS from "aws-sdk";
window.AWS = AWS;
export const usePostDogWithSignUp = () => {
  const config = {
    bucketName: import.meta.env.VITE_BUCKET_NAME,
    region: import.meta.env.VITE_REGION,
    accessKeyId: import.meta.env.VITE_ACCESS,
    secretAccessKey: import.meta.env.VITE_SECRET,
  };
  AWS.config.update({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  });
  const s3 = new AWS.S3();
  const [file, setFile] = useState<File | null>(null);
  const [postDogValue, setPostDogValue] = useState<PostDogInputType>({
    image: "",
    registerNum: "",
    name: "",
    type: "Type1",
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
  const upLoadS3 = async () => {
    const uploadPromise = () => {
      const params = {
        Bucket: config.bucketName,
        Key: postDogValue.name + "_" + postDogValue.registerNum,
        Body: file,
      };
      return s3.upload(params).promise();
    };
    try {
      const result = await Promise.resolve(uploadPromise());
      return result.Location;
    } catch (err) {
      console.log(err);
      throw err;
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
      postDogValue.type === "" ||
      postDogValue.tags.length === 0
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const id = localStorage.getItem("id");
    if (id) {
      postDogValue.image = await upLoadS3();
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
        .then((res) => {
          alert("강아지 등록이 완료되었습니다.");
          window.location.reload();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      postDogValue.image = await upLoadS3();
      let month = `${dateValue.month}`;
      let day = `${dateValue.day}`;
      if (dateValue.month < 10) {
        month = `0${dateValue.month}`;
      }
      if (dateValue.day < 10) {
        day = `0${dateValue.day}`;
      }
      postDogValue.birth = `${dateValue.year}-${month}-${day}`;
      console.log(postDogValue);
      PostDogWithSignUp(id, postDogValue)
        .then((res) => {
          alert("강아지 등록이 완료되었습니다.");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
  };
};
