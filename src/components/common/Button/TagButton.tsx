import { useEffect, useState } from "react";

export interface TagButtonProps {
  content: string;
  onChange: (content: string) => void;
  check: boolean;
}

export const TagButton = (props: TagButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const style =
    "rounded-2xl h-6 px-2 mr-2 mb-2 text-smallFont text-fontBlack" +
    (clicked ? "bg-bgYellow" : "bg-bgGray");
  useEffect(() => {
    if (props.check) {
      setClicked(props.check);
    }
  }, [props.check]);
  return (
    <input
      className={style}
      type="button"
      onClick={() => {
        setClicked(!clicked);
        props.onChange(props.content);
      }}
      name="tag"
      value={props.content}
    />
  );
};
