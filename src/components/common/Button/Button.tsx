interface ButtonProps {
  style: string;
  text: string;
  onClick: () => void;
}
export const Button = (props: ButtonProps) => {
  const style = "flex justify-center items-center text-nowrap " + props.style;
  return (
    <button className={style} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
