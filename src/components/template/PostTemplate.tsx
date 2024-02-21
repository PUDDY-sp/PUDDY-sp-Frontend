import { PostDetailType } from "../../types/community";
import { CommentTemplate } from "./CommentTemplate";
import { useState } from "react";
import { Button } from "../common/Button";
import { PostInputType } from "../../types/community";
import { useNavigate } from "react-router";
import thumbUp from "../../assets/Community/ThumbUp.svg";
import chatBubble from "../../assets/Community/ChatBubble.svg";
import menuVertical from "../../assets/Community/MenuVertical.svg";

interface PostProps {
  post: PostDetailType;
  comment: string;
  changeComment: string;
  onClickLike: () => void;
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCreateComment: (postId: number, content: string) => void;
  onPatchComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  onPatchPost: (postId: number, postInputType: PostInputType) => void;
  onDeletePost: (postId: number) => void;
}

export const PostTemplate = (props: PostProps) => {
  const navigate = useNavigate();
  const gender = props.post.person.gender ? "아빠" : "엄마";
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-haveHeaderAndFooter px-4 w-full">
      <div className="w-full h-550 overflow-auto scrollbar-hide border-t">
        <div className="flex flex-row mt-2">
          <img
            src={props.post.person.dog.image}
            className="w-9 h-9 mr-1 mt-1 rounded-full"
            alt="dog"
          />
          <div className="flex flex-col ml-1 w-317 justify-start items-start text-fontBlack">
            <p className="text-default">
              {props.post.person.dog.name} {gender}
            </p>
            <p className="flex text-smallFont text-fontGray h-4 w-72">
              {props.post.createdAt}
              {isMenuOpen && (
                <div className="flex ml-28">
                  <Button
                    text="수정하기"
                    style="px-0 py-0 ml-2 text-fontGray bg-bgWhite underline"
                    onClick={() => navigate(`/post-fix/${props.post.id}`)}
                  />
                  <Button
                    text="삭제하기"
                    style="px-0 py-0 ml-1 text-fontGray bg-bgWhite underline"
                    onClick={() => props.onDeletePost(props.post.id)}
                  />
                </div>
              )}
            </p>
          </div>
          {props.post.isMine && (
            <button onClick={toggleMenu} className="px-0 py-0 bg-bgWhite ml-0">
              <img src={menuVertical} className="w-5 h-5" alt="menu" />
            </button>
          )}
        </div>
        <div className="flex flex-col text-ellipsis overflow-hidden">
          <p className="mt-2 mx-2 text-middleFont text-start text-fontBlack">
            {props.post.title}
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-smallFont mx-2 text-start text-fontBlack">
            {props.post.content}
          </p>
        </div>
        <div className="flex mt-4">
          <button
            className="m-0 p-0 bg-bgWhite"
            onClick={() => props.onClickLike()}
          >
            <img className="w-5 h-5" src={thumbUp} />
          </button>
          <p className="ml-1 text-fontBlack">{props.post.likeCount}</p>
          <img className="w-5 h-5 ml-4 mt-1" src={chatBubble} />
          <p className="ml-1 text-fontBlack">{props.post.comments.length}</p>
        </div>
        <div className="flex w-full mt-3 mb-4">
          <CommentTemplate
            changeComment={props.changeComment}
            onChangeComment={props.onChangeComment}
            onPatchComment={props.onPatchComment}
            onDeleteComment={props.onDeleteComment}
            PostDetailValue={props.post}
          />
        </div>
      </div>
      <div className="flex flex-row h-20 py-2 bg-bgGray rounded-xl">
        <textarea
          className="bg-bgGray w-64 p-2 text-fontBlack text-default ml-3 overflow-auto scrollbar-hide "
          placeholder={"댓글을 입력해주세요."}
          value={props.comment}
          name={"comment"}
          onChange={props.onCheckComment}
        />
        <button
          className="ml-2 bg-bgYellow text-fontBlack text-buttonFont"
          onClick={() => props.onCreateComment(props.post.id, props.comment)}
        >
          등록
        </button>
      </div>
    </div>
  );
};
