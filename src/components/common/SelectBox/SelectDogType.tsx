import { useEffect, useState } from "react";
import { GetDogTypes } from "../../../apis/DogApi";
import React from "react";

interface SelectDogTypeProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
interface DogType {
  content: string;
}
interface DogTypes {
  dogTypes: DogType[];
}
export const SelectDogType = (props: SelectDogTypeProps) => {
  const [dogTypeList, setDogTypeList] = useState<string[]>([]);
  useEffect(() => {
    GetDogTypes()
      .then((res) => {
        const dogTypes: DogTypes = res.data;
        const types = dogTypes.dogTypes.map((dogType) => dogType.content);
        setDogTypeList(types);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return React.createElement(
    "select",
    {
      className: "rounded-lg pl-1 h-9 w-64 bg-bgGray",
      name: "type",
      value: props.content,
      onChange: props.onChange,
    },
    [
      React.createElement(
        "option",
        { key: "", value: "", disabled: true },
        "견종을 선택하세요."
      ),
      dogTypeList.map((dogType) =>
        React.createElement("option", { key: dogType, value: dogType }, dogType)
      ),
    ]
  );
};
