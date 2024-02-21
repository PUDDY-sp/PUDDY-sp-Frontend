import { DateType } from "../../types/date";
import { SignUpInputType } from "../../types/sign";
import { Button } from "../common/Button/Button";
import { InputBox } from "../common/Input";
import { GenderRadio } from "../common/Radio";
import { SelectDay, SelectMonth, SelectYear } from "../common/SelectBox";
import { SignUpCheckText, SignUpMiddleTitle } from "../common/Text";

interface SignUpProps {
  signUpValue: SignUpInputType;
  isSameLogin: number;
  checkPassword: string;
  dateValue: DateType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onGenderCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onLoginCheck: () => void;
  onAddressCheck: () => void;
}
export const SignUpTemplate = (props: SignUpProps) => {
  return (
    <div className="flex flex-col w-full px-4 ">
      <div className="flex flex-row w-f h-9">
        <p className="h-f text-fontYellow text-middleTitle">유저 정보</p>
        <p className="h-f text-fontBlack text-middleTitle">를 입력해주세요.</p>
      </div>
      <SignUpMiddleTitle text={"아이디"} />
      <div className="flex flex-row w-f justify-stretch">
        <InputBox
          style={"bg-bGray text-fontBlack text-default"}
          placeholder={"아이디를 입력해주세요."}
          type={"text"}
          value={props.signUpValue.login}
          name={"login"}
          onChange={props.onChange}
        />
        <Button
          style="bg-bgYellow text-fontBlack text-default ml-2 h-9 text-nowrap"
          text={"중복확인"}
          onClick={props.onLoginCheck}
        />
      </div>
      {props.isSameLogin === 0 && <SignUpCheckText color={""} text={""} />}
      {props.isSameLogin === 1 && (
        <SignUpCheckText
          color={"text-fontGreen"}
          text={"사용 가능한 아이디입니다."}
        />
      )}
      {props.isSameLogin === 2 && (
        <SignUpCheckText
          color={"text-fontRed"}
          text={"사용 불가능한 아이디입니다."}
        />
      )}
      {props.isSameLogin === 3 && (
        <SignUpCheckText
          color={"text-fontRed"}
          text={"아이디를 입력해주세요."}
        />
      )}
      <SignUpMiddleTitle text={"비밀번호"} />
      <InputBox
        style={"bg-bGray text-fontBlack text-default"}
        placeholder={"비밀번호를 입력해주세요."}
        type={"password"}
        value={props.signUpValue.password}
        name={"password"}
        onChange={props.onChange}
      />
      <InputBox
        style={"bg-bGray mt-2.5 text-fontBlack text-default"}
        placeholder={"비밀번호 확인"}
        type={"password"}
        value={props.checkPassword}
        name={"checkPassword"}
        onChange={props.onPasswordCheck}
      />
      {props.signUpValue.password == "" && props.checkPassword == "" && (
        <SignUpCheckText color={""} text={""} />
      )}

      {props.checkPassword === props.signUpValue.password &&
        props.signUpValue.password != "" && (
          <SignUpCheckText
            color={"text-fontGreen"}
            text={"비밀번호가 일치합니다."}
          />
        )}
      {props.checkPassword !== props.signUpValue.password &&
        props.signUpValue.password != "" && (
          <SignUpCheckText
            color={"text-fontRed"}
            text={"비밀번호가 일치하지 않습니다."}
          />
        )}
      <SignUpMiddleTitle text={"생년월일"} />
      <div className="flex flex-row w-64 h-9">
        <SelectYear year={props.dateValue.year} onChange={props.onSelect} />
        <SelectMonth month={props.dateValue.month} onChange={props.onSelect} />
        <SelectDay day={props.dateValue.day} onChange={props.onSelect} />
      </div>
      <SignUpMiddleTitle text={"주소"} />
      <div className="flex flex-row w-f justify-stretch">
        <InputBox
          style={"bg-bGray text-fontBlack text-default"}
          placeholder={"주소를 입력해주세요."}
          type={"text"}
          value={props.signUpValue.mainAddress}
          name={"mainAddress"}
          onChange={props.onChange}
        />
        <Button
          style="bg-bgYellow text-fontBlack text-default ml-2 h-9 text-nowrap"
          text={"주소확인"}
          onClick={props.onAddressCheck}
        />
      </div>
      <InputBox
        style={"bg-bGray text-fontBlack text-default mt-2.5"}
        placeholder={"상세주소"}
        type={"text"}
        value={props.signUpValue.subAddress}
        name={"subAddress"}
        onChange={props.onChange}
      />
      <SignUpMiddleTitle text={"성별"} />
      <GenderRadio
        gender={props.signUpValue.gender}
        onChange={props.onGenderCheck}
      />
      <Button
        style="bg-bgYellow text-fontBlack text-buttonFont mt-12 h-12"
        text={"다음"}
        onClick={props.onClick}
      />
    </div>
  );
};
