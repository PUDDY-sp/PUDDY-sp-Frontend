import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useReissueToken } from "./useCommon";
import {
  TrailReviewInputType,
  TrailReviewListType,
} from "../types/trailReview";
import {
  DeleteTrailReview,
  GetTrailReviewList,
  PostTrailReview,
} from "../apis/TrailReviewApi";
import { useParams } from "react-router";

export const useTrailList = () => {
  const { getReissueToken } = useReissueToken();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const [star, setStar] = useState<number>(0);
  const [trailList, setTrailList] = useState<TrailReviewListType>({
    count: 0,
    trailReviews: [],
  });
  const { trailId } = useParams();
  const trailIdNumber = Number(trailId);

  useEffect(() => {
    GetTrailReviewList(trailIdNumber, page)
      .then((res) => {
        setTrailList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          getReissueToken("/trail");
        }
      });
  }, [page]);

  const handleWriteTrail = (
    trailId: number,
    trailReviewInputType: TrailReviewInputType
  ) => {
    PostTrailReview(trailIdNumber, trailReviewInputType)
      .then((res) => {})
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/trail");
        }
      });
    navigate(`/trail/${trailId}/review`);
    window.location.reload();
  };

  const handleDeleteTrail = (reviewId: number) => {
    DeleteTrailReview(trailIdNumber, reviewId);
    window.location.reload();
  };

  const handlePageChange = async (direction: "prev" | "next") => {
    let nextPage = direction === "prev" ? page - 1 : page + 1;
    if (nextPage > 0) {
      const response = await GetTrailReviewList(trailIdNumber, nextPage);
      const postData = response.data;

      if (
        postData &&
        postData.trailReviews &&
        postData.trailReviews.length > 0
      ) {
        setPage(nextPage);
      }
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return {
    trailList,
    currentPage: page,
    content,
    trailIdNumber,
    star,
    handleWriteTrail,
    handleDeleteTrail,
    handlePageChange,
    handleContent,
    setStar,
  };
};
