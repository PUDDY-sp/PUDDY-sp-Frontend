import { DateType } from "../../types/date";
import { PostDogInputType } from "../../types/sign";
import { Button, TagButtonList } from "../common/Button";
import { InputBox } from "../common/Input";
import { GenderRadio, NeuterRadio } from "../common/Radio";
import {
  SelectDay,
  SelectDogType,
  SelectMonth,
  SelectYear,
} from "../common/SelectBox";
import { SignUpMiddleTitle } from "../common/Text";

interface PostDogProps {
  postDogValue: PostDogInputType;
  dateValue: DateType;
  isCorrectRegisterNum: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTag: (content: string) => void;
  onRadioCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectDate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCheckRegisterNum: () => void;
  onClick: () => void;
  onClickNext: () => void;
}
export const PostDogTemplate = (props: PostDogProps) => {
  return (
    <div className=" flex-col px-4 w-full max-h-haveHeader overflow-auto scrollbar-hide">
      <div className="flex flex-row w-full h-9">
        <p className="h-f text-fontYellow text-middleTitle">반려동물 정보</p>
        <p className="h-f text-middleTitle">를 입력해주세요.</p>
      </div>
      <SignUpMiddleTitle text={"프로필 이미지"} />
      <div className="flex justify-center w-f mb-8">
        {props.postDogValue.image === "" ? (
          <div
            className="bg-cover w-36 h-36"
            style={{ backgroundImage: `url(/inputImage.svg)` }}
          >
            <input
              type="file"
              name="image"
              accept="image/png, image/jpg, image/jpeg"
              onChange={props.onChangeImage}
              className="opacity-0 w-36 h-36 cursor-pointer"
            ></input>
          </div>
        ) : (
          <div
            className="bg-cover w-36 h-36"
            style={{ backgroundImage: `url(${props.postDogValue.image})` }}
          >
            <input
              type="file"
              name="image"
              accept="image/png, image/jpg, image/jpeg"
              onChange={props.onChangeImage}
              className="opacity-0 w-36 h-36 cursor-pointer"
            ></input>
          </div>
        )}
      </div>
      <SignUpMiddleTitle text={"반려동물 등록번호"} />
      <div className="flex flex-row w-full justify-stretch">
        <InputBox
          style={"bg-bGray text-fontBlack text-default"}
          placeholder={"등록번호를 입력해주세요."}
          type={"text"}
          value={props.postDogValue.registerNum}
          name={"registerNum"}
          onChange={props.onChange}
        />
        <Button
          style="bg-bgYellow text-fontBlack text-default ml-2 h-9 text-nowrap"
          text={"번호확인"}
          onClick={props.onCheckRegisterNum}
        />
      </div>
      {props.isCorrectRegisterNum === 0 && <p className="mt-1 h-4"> </p>}
      {props.isCorrectRegisterNum === 1 && (
        <p className="text-start text-smallFont mt-1 text-fontGreen h-4">
          사용 가능한 등록번호입니다.
        </p>
      )}
      {props.isCorrectRegisterNum === 2 && (
        <p className="text-start text-smallFont mt-1 text-fontRed h-4">
          존재하지 않는 등록번호입니다.
        </p>
      )}
      {props.isCorrectRegisterNum === 3 && (
        <p className="text-start text-smallFont mt-1 text-fontRed h-4">
          10자리의 등록번호를 입력해주세요.
        </p>
      )}
      <SignUpMiddleTitle text={"이름"} />
      <div className="flex w-full">
        <InputBox
          style={"bg-bGray text-fontBlack text-default"}
          placeholder={"이름 입력해주세요."}
          type={"text"}
          value={props.postDogValue.name}
          name={"name"}
          onChange={props.onChange}
        />
      </div>
      <SignUpMiddleTitle text={"견종"} />
      <div className="flex w-full">
        <SelectDogType
          content={props.postDogValue.type}
          onChange={props.onSelect}
        />
      </div>
      <SignUpMiddleTitle text={"생년월일"} />
      <div className="flex flex-row w-64 h-9">
        <SelectYear year={props.dateValue.year} onChange={props.onSelectDate} />
        <SelectMonth
          month={props.dateValue.month}
          onChange={props.onSelectDate}
        />
        <SelectDay day={props.dateValue.day} onChange={props.onSelectDate} />
      </div>
      <SignUpMiddleTitle text={"성별"} />
      <GenderRadio
        gender={props.postDogValue.gender}
        onChange={props.onRadioCheck}
      />
      <SignUpMiddleTitle text={"중성화 유무"} />
      <NeuterRadio
        neuter={props.postDogValue.neuter}
        onChange={props.onRadioCheck}
      />
      <SignUpMiddleTitle text={"반려동물을 소개해주세요."} />
      <TagButtonList
        onChange={props.onChangeTag}
        tags={props.postDogValue.tags}
      />
      {window.location.pathname === "/postdog" && (
        <Button
          style="bg-bgBlack text-fontWhite text-buttonFont mt-12 h-12 w-full"
          text={"다른 반려동물 추가"}
          onClick={props.onClickNext}
        />
      )}
      <Button
        style="bg-bgYellow text-fontBlack text-buttonFont mt-2.5 mb-8 h-12 w-full"
        text={"완료"}
        onClick={props.onClick}
      />
    </div>
  );
};
