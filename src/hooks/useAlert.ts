import { useEffect, useState } from "react";
import { AlertListType } from "../types/alert";
import { getMatch } from "../apis/MatchApi";
import { useNavigate } from "react-router-dom";
import usePersonIdStore from "../store/usePersonIdStore";
import { useReissueToken } from "./useCommon";

export const useAlert = () => {
  const navigate = useNavigate();
  const { setPersonId } = usePersonIdStore();
  const { getReissueToken } = useReissueToken();
  const [alertValue, setAlertValue] = useState<AlertListType>({
    matches: [],
  });
  useEffect(() => {
    getMatch()
      .then((res) => {
        setAlertValue(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          getReissueToken("/alert");
        }
      });
  }, []);
  const goToProfile = (personId: number) => {
    setPersonId(personId);
    navigate("/wholike");
  };

  return { alertValue, goToProfile };
};
