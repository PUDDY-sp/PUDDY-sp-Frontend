import { PostDetailType } from "../../types/community";
import thumbUp from "../../assets/Community/ThumbUp.svg";
import chatBubble from "../../assets/Community/ChatBubble.svg";
import { CommentTemplate } from "./CommentTemplate";

interface PostProps {
  post: PostDetailType;
  onClickLike: () => void;
}

export const PostTemplate = (props: PostProps) => {
  const gender = props.post.person.gender ? "아빠" : "엄마";

  return (
    <div className="h-haveHeaderAndFooter px-4 w-full">
      <div className="border-t px-1 h-550 overflow-auto scrollbar-hide w-full">
        <div className="flex flex-row">
          <img
            src={props.post.person.dog.image}
            className="w-9 h-9 mr-1 mt-1 rounded-full"
            alt="dog"
          />
          <div className="flex flex-col w-full justify-start items-start">
            <p className="text-default">
              {props.post.person.dog.name} {gender}
            </p>
            <p className="text-smallFont text-fontGray">
              {props.post.createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-col text-ellipsis overflow-hidden">
          <p className="pt-1 text-middleFont text-start ">{props.post.title}</p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-smallFont text-start">{props.post.content}</p>
        </div>
        <div className="flex mt-4">
          <button className="m-0 p-0" onClick={() => props.onClickLike()}>
            <img className="w-5 h-5" src={thumbUp} />
          </button>
          <p className="ml-1">{props.post.likeCount}</p>
          <img className="w-5 h-5 ml-4" src={chatBubble} />
          <p className="ml-1">{props.post.comments.length}</p>
        </div>
        <div className="flex w-full mt-2 mb-4">
          <CommentTemplate PostDetailValue={props.post} />
        </div>
      </div>
      <div className="h-20 py-2 bg-bgGray rounded-xl">
        <p>댓글작성</p>
      </div>
    </div>
  );
};
