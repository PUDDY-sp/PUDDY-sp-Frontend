import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostInputType, PostListType } from "../types/community";
import { getPostList, postCreatePost } from "../apis/CommunityApi";
import { useReissueToken } from "./useCommon";

export const useCommunity = () => {
  const { getReissueToken } = useReissueToken();
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostListType>({
    count: 0,
    posts: [],
  });
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPostList(page)
      .then((res) => {
        setPostList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/post");
        }
      });
  }, [page]);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleWritePost = (postInputType: PostInputType) => {
    postCreatePost(postInputType)
      .then(() => {
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/post");
        }
      });
    navigate("/post");
    window.location.reload();
  };

  const handlePageChange = async (direction: "prev" | "next") => {
    let nextPage = direction === "prev" ? page - 1 : page + 1;
    if (nextPage > 0) {
      const response = await getPostList(nextPage);
      const postData = response.data;

      if (postData && postData.posts && postData.posts.length > 0) {
        setPage(nextPage);
      }
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return {
    postList,
    currentPage: page,
    title,
    content,
    handlePostClick,
    handleWritePost,
    handlePageChange,
    handleTitle,
    handleContent,
  };
};
