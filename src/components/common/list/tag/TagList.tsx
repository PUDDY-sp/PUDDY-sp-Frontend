import { DogTag } from "../../../../types/sign";
import { Tag } from "./tag";

interface TagListProps {
  tags: DogTag[];
}
export const TagList = (props: TagListProps) => {
  return (
    <div className="w-full flex flex-wrap mb-1">
      {props.tags.map((tag, index) => (
        <Tag key={index} content={tag.content} />
      ))}
    </div>
  );
};
