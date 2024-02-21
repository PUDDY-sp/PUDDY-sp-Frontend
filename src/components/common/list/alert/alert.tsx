import { AlertProfileType } from "../../../../types/alert";
import { Button } from "../../Button";

interface AlertProps extends AlertProfileType {
  goToProfile: (personId: number) => void;
}

export const Alert = (props: AlertProps) => {
  const gender = props.gender ? "아빠" : "엄마";
  const message = `${props.dog.name} ${gender}님이 Like를 보냈습니다.`;
  return (
    <div className="py-2.5 w-full border-b-2">
      <div className="flex flex-row justify-start w-full h-10">
        <img
          src={props.dog.image}
          className="w-10 h-10 mr-1 rounded-full"
          alt="dog"
        />
        <p className="flex items-center text-middleFont h-10 text-fontBlack">
          {message}
        </p>
      </div>
      <div className="flex justify-end w-full h-7.5 mr-2.5">
        <Button
          style="bg-bgYellow text-fontBlack text-smallFont"
          text={"자세히 보기"}
          onClick={() => props.goToProfile(props.id)}
        />
      </div>
    </div>
  );
};
