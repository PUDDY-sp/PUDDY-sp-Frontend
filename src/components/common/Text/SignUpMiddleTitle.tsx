interface SignUpMiddleTitleProps {
  text: string;
}
export const SignUpMiddleTitle = (props: SignUpMiddleTitleProps) => {
  return (
    <p className="flex h-9 text-middleTitle text-start items-center mt-2.5 text-fontBlack">
      {props.text}
    </p>
  );
};
