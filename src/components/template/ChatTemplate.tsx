import sendIcon from "../../assets/chat/sendIcon.svg";
import { useEffect, useRef } from "react";
import { ChatDetailType } from "../../types/chat";

interface ChatTemplateProps {
  chatDetailValue: ChatDetailType;
  sendMessage: () => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
}

export const ChatTemplate = (props: ChatTemplateProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.chatDetailValue.messages]);

  return (
    <div className="flex flex-col items-center justify-end w-393 h-haveHeader bg-bgYellow font-abee">
      <div className="w-24 h-24 rounded-full flex items-center justify-center">
        <img
          src={props.chatDetailValue.person?.dog.image}
          className="w-24 h-24 rounded-full bg-bgWhite"
          alt=""
        ></img>
      </div>
      <p className="text-buttonFont my-2 font-abee text-fontWhite font-bold">
        {props.chatDetailValue.person?.dog.name}{" "}
        {props.chatDetailValue.person?.gender ? "아빠" : "엄마"}
      </p>
      <div className="bg-bgWhite w-full h-560 rounded-t-32 px-4">
        <div
          ref={scrollRef}
          className="justify-end w-full pt-10 h-500 overflow-y-auto scrollbar-hide"
        >
          {props.chatDetailValue.messages.map((message, index) => {
            const previousMessage = props.chatDetailValue.messages[index - 1];
            const isNewDate =
              (previousMessage && previousMessage.date !== message.date) ||
              index === 0;

            return (
              <>
                {isNewDate && (
                  <div className="w-full flex justify-center mb-6">
                    <div className="w-24 h-6 rounded-2xl bg-bgGrayHover flex justify-center items-center text-center">
                      <p className="w-full text-defalut text-fontWhite">
                        {message.date}
                      </p>
                    </div>
                  </div>
                )}
                {message.senderId !== props.chatDetailValue.currentUserId ? (
                  <div
                    key={index}
                    className="flex flex-row justify-start items-center w-full h-65 mb-6"
                  >
                    <img
                      className="w-14 h-14 rounded-full flex items-center justify-center z-10"
                      src={props.chatDetailValue.person?.dog.image}
                    ></img>
                    <div className="flex justify-center flex-wrap whitespace-normal max-w-60 ml-5 mb-11 min-h-14 bg-bgChat rounded-tl-25 rounded-tr-25 rounded-br-25 items-center p-4">
                      <p className="w-full break-words text-default text-fontBlack">
                        {message.content}
                      </p>
                    </div>
                    <div className="ml-2 mb-2 text-defalut text-fontGray">
                      <p>{message.time}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-end items-center w-full h-65 mb-6">
                    <div className="mr-2 mb-2 text-defalut text-fontGray">
                      <p>{message.time}</p>
                    </div>
                    <div className="flex justify-center flex-wrap whitespace-normal max-w-60 mb-11 min-h-14 bg-bgMyChat opacity-60 rounded-tl-25 rounded-tr-25 rounded-bl-25 items-center p-4">
                      <p className="w-full break-words text-default text-fontBlack">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
          <div ref={messageEndRef}></div>
        </div>
        <div className="flex justify-start items-center w-359 shadow-lg h-43 rounded-20 mb-3 pl-2">
          <input
            className="w-72 h-5/6 pl-2 text-fontBlack"
            placeholder="메세지를 입력하세요..."
            onChange={props.handleInput}
            value={props.content}
          />
          <div
            className="flex items-center w-30 h-30 bg-bgYellow ml-4 pl-2 rounded-full hover:bg-bgYellowHover cursor-pointer"
            onClick={props.sendMessage}
          >
            <img src={sendIcon} className="w-4 h-4" alt="sendIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};
