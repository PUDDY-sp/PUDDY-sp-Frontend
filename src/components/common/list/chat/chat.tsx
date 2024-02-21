import { ChatProfileType } from "../../../../types/chat";

interface ChatProps extends ChatProfileType {
  goToProfile: (personId: number) => void;
  enterChat: (chatId: number) => void;
}
export const Chat = (props: ChatProps) => {
  const gender = props.person?.gender ? "아빠" : "엄마";
  const message = `${props.person?.dog.name} ${gender}님과 채팅을 시작해보세요 !`;
  return (
    <div
      className="py-2.5 w-full border-b-2 hover:bg-bgWhiteHover"
      onClick={() => props.enterChat(props.id)}
    >
      <div className="flex flex-row justify-start items-center w-full">
        <img
          src={props.person?.dog.image}
          className="w-20 h-20 mr-4 rounded-full"
          alt="dog"
        />
        <p className="flex items-center text-middleFont h-10 text-fontBlack">
          {message}
        </p>
      </div>
    </div>
  );
};
