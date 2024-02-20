import { DogTag } from "../../../../types/sign";

export const Tag = (props: DogTag) => {
  return (
    <div className="flex items-center justify-center rounded-2xl h-6 text-smallFont bg-bgGray px-2 mr-2 mb-2">
      {props.content}
    </div>
  );
};
