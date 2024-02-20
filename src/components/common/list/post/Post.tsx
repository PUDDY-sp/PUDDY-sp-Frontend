import { PostType } from "../../../../types/community";
import thumbUp from "../../../../assets/Community/ThumbUp.svg";
import chatBubble from "../../../../assets/Community/ChatBubble.svg";

interface PostProps extends PostType {
  onClick: (postId: number) => void;
}

export const Post = (props: PostProps) => {
  const gender = props.person.gender ? "아빠" : "엄마";
  const smallContent =
    props.content.length > 60
      ? props.content.slice(0, 60) + "..."
      : props.content;
  return (
    <div className="w-full border-b-2 py-2">
      <div
        className="w-full px-0.5 bg-bgWhite"
        onClick={() => props.onClick(props.id)}
      >
        <div className="flex flex-row items-center w-full">
          <img
            src={props.person.dog.image}
            className="w-16 h-16 ml-2 mr-2 rounded-full"
            alt="dog"
          />
          <div className="ml-1 flex flex-col justify-start items-start flex-1">
            <div className="h-6 text-ellipsis overflow-hidden">
              <p className="text-default text-start text-fontBlack mt-0.5">
                {props.title}
              </p>
            </div>

            <div className="flex min-h-10 text-ellipsis overflow-hidden">
              <p className="text-smallFont text-start text-fontBlack mt-1 break-all">
                {smallContent}
              </p>
            </div>

            <div className="flex mt-1 w-full">
              <p className="text-smallFont text-fontGray w-40 text-start flex-1">
                {props.createdAt} {" | "} {props.person.dog.name} {gender}
              </p>
              <div className="flex ml-0">
                <img className="w-5 h-5" src={thumbUp} alt="thumbUp" />
                <p className="ml-1 text-fontBlack">{props.likeCount}</p>
                <img
                  className="w-5 h-5 ml-4 mt-0.5"
                  src={chatBubble}
                  alt="chatBubble"
                />
                <p className="ml-1 text-fontBlack">{props.commentCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
