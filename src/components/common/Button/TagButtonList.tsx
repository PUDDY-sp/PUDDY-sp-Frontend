import { useEffect, useState } from "react";
import { TagButton } from "./TagButton";
import { GetDogTags } from "../../../apis/DogApi";
import { DogTag } from "../../../types/sign";

interface TagButtonListProps {
  onChange: (content: string) => void;
  tags: DogTag[];
}
interface Tags {
  dogTags: DogTag[];
}
export const TagButtonList = (props: TagButtonListProps) => {
  const [tagList, setTagList] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean[]>([]);
  useEffect(() => {
    GetDogTags()
      .then((res) => {
        const tags: Tags = res.data;
        const tagContents = tags.dogTags.map((tag) => tag.content);
        if (props.tags.length !== 0) {
          setCheck(
            tags.dogTags.map((tag) =>
              props.tags.some((propTag) => propTag.content === tag.content)
            )
          );
        }
        setTagList(tagContents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.tags]);
  return (
    <div className="w-full flex flex-wrap">
      {tagList.map((tag, index) => (
        <TagButton
          key={index}
          content={tag}
          onChange={props.onChange}
          check={check[index]}
        />
      ))}
    </div>
  );
};
