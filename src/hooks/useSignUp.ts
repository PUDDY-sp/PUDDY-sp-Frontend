import { useState } from "react";
import { SignUpInputType } from "../types/sign";
import { CheckLogin, SignUp, CheckAddress } from "../apis/SignApi";
import { DateType } from "../types/date";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [signUpValue, setSignUpValue] = useState<SignUpInputType>({
    login: "",
    password: "",
    birth: "",
    mainAddress: "",
    subAddress: "",
    gender: true,
  });
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isSameLogin, setIsSameLogin] = useState<number>(0);
  const [isCorrectAddress, setIsCorrectAddress] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<DateType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpValue({
      ...signUpValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUpSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateValue({
      ...dateValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };
  const handleGenderCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "true") {
      setSignUpValue({
        ...signUpValue,
        [e.target.name]: true,
      });
    } else {
      setSignUpValue({
        ...signUpValue,
        [e.target.name]: false,
      });
    }
  };
  const handleSignUp = () => {
    if (
      isSameLogin === 1 &&
      isCorrectAddress === true &&
      checkPassword === signUpValue.password &&
      signUpValue.login !== "" &&
      signUpValue.password !== "" &&
      signUpValue.mainAddress !== "" &&
      signUpValue.subAddress !== ""
    ) {
      let month = `${dateValue.month}`;
      let day = `${dateValue.day}`;
      if (dateValue.month < 10) {
        month = `0${dateValue.month}`;
      }
      if (dateValue.day < 10) {
        day = `0${dateValue.day}`;
      }
      signUpValue.birth = `${dateValue.year}-${month}-${day}`;
      if (passwordRegEx.test(signUpValue.password) === false) {
        alert("비밀번호는 8~20자의 영문 대소문자, 숫자로만 입력해주세요.");
        return;
      }
      SignUp(signUpValue).then((res) => {
        localStorage.setItem("id", res.data.id);
        alert("회원가입이 완료되었습니다.");
        navigate("/postdog");
      });
    } else {
      alert("입력값을 확인해주세요.");
    }
  };
  const handleCheckLogin = () => {
    if (signUpValue.login === "") {
      alert("아이디를 입력해주세요.");
      setIsSameLogin(3);
      return;
    }
    CheckLogin(signUpValue.login).then((res) => {
      if (res.data === false) {
        alert("사용 가능한 아이디입니다.");
        setIsSameLogin(1);
      } else {
        alert("이미 사용중인 아이디입니다.");
        setIsSameLogin(2);
      }
    });
  };
  const handleCheckAddress = () => {
    CheckAddress(signUpValue.mainAddress).then((res) => {
      if (res.data === false) {
        alert("존재하지 않는 주소입니다.");
        setIsCorrectAddress(false);
      } else {
        alert("사용 가능한 주소입니다.");
        setIsCorrectAddress(true);
      }
    });
  };
  return {
    signUpValue,
    isSameLogin,
    checkPassword,
    dateValue,
    passwordRegEx,
    handleSignUpChange,
    handleCheckPassword,
    handleSignUpSelect,
    handleGenderCheck,
    handleSignUp,
    handleCheckLogin,
    handleCheckAddress,
  };
};
