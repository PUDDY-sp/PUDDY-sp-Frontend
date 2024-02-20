import { useCallback, useEffect, useState } from "react";
import { FilterDogType } from "../types/match";
import { getRandomMatch, postmatch } from "../apis/MatchApi";
import useMatchListStore from "../store/useMatchListStore";
import { useReissueToken } from "./useCommon";

export const useMatch = () => {
  const { getReissueToken } = useReissueToken();
  const { setMatchListValue } = useMatchListStore();
  const [filterValue, setFilterValue] = useState<FilterDogType>({
    type: "",
    neuter: null,
    tags: [],
  });
  const [filter, setFilter] = useState<FilterDogType>({
    type: "",
    neuter: null,
    tags: [],
  });

  const handleDogTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "true") {
      setFilter({
        ...filter,
        [e.target.name]: true,
      });
    } else if (e.target.value === "false") {
      setFilter({
        ...filter,
        [e.target.name]: false,
      });
    } else {
      setFilter({
        ...filter,
        [e.target.name]: null,
      });
    }
  };

  const handlePostDogTag = (content: string) => {
    const tagExists = filterValue.tags.some((tag) => tag.content === content);
    if (tagExists) {
      setFilter({
        ...filter,
        tags: filter.tags.filter((tag) => tag.content !== content),
      });
    } else {
      setFilter({
        ...filter,
        tags: [...filter.tags, { content: content }],
      });
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/match") {
      getRandomMatch(filterValue)
        .then((res) => {
          setMatchListValue(res.data);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            getReissueToken("/match");
          }
        });
    }
  }, [filterValue]);

  const handleMatchCancel = () => {
    alert("ok");
  };
  const handlepostMatch = useCallback((personId: number) => {
    postmatch(personId)
      .then((res) => {
        alert("매칭신청을 전송하였습니다.");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/match");
        } else if (err.response.status === 404) {
          alert("존재하지 않는 유저입니다.");
        }
      });
  }, []);

  return {
    filter,
    handleMatchCancel,
    handlepostMatch,
    handleDogTypeSelect,
    handleRadioCheck,
    handlePostDogTag,
    setFilterValue,
  };
};
