import { useRef, useState } from "react";
import { arrow, alert, filters, plus } from "../../../assets/Header";
import { useHeader } from "../../../hooks/useHeader";
import { Button } from "../Button/Button";
import { SignUpMiddleTitle } from "../Text";
import { SelectDogType } from "../SelectBox";
import { NeuterRadio } from "../Radio";
import { TagButtonList } from "../Button";
import { useMatch } from "../../../hooks";
import { useParams } from "react-router-dom";

interface Title {
  title: string;
}

export const Header = (titleObject: Title) => {
  const { handleAlert, handleBack, handleWritePost, handleWriteTrail } =
    useHeader();
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef<HTMLDivElement>(null);
  const {
    filter,
    handleDogTypeSelect,
    handleRadioCheck,
    handlePostDogTag,
    setFilterValue,
  } = useMatch();
  const { trailId } = useParams();
  const trailIdNumber = Number(trailId);

  return (
    <div className="flex px-4 w-full h-16 px-1 py-2 items-center gap-1 shrink-0 text-fontBlack">
      {modalOpen && (
        <div
          className="w-393 h-donHave fixed top-0 left-0 bg-black bg-opacity-70 z-50 flex justify-center items-center text-fontBlack"
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className="w-80 h-360 bg-bgWhite flex flex-col items-start justify-center rounded-xl">
            <div className="flex w-full flex-col px-4">
              <SignUpMiddleTitle text={"견종"} />
              <SelectDogType
                content={filter.type}
                onChange={handleDogTypeSelect}
              />
            </div>
            <div className="flex w-full flex-col px-4">
              <SignUpMiddleTitle text={"중성화 유무"} />
              <NeuterRadio neuter={filter.neuter} onChange={handleRadioCheck} />
            </div>
            <div className="flex w-full flex-col px-4">
              <SignUpMiddleTitle text={"태그"} />
              <TagButtonList onChange={handlePostDogTag} tags={filter?.tags} />
            </div>

            <div className="flex flex-row w-full justify-center mt-4">
              <Button
                style={"bg-bgBlack text-fontWhite text-ButtonFont mr-2.5"}
                text={"취소하기"}
                onClick={() => {
                  setFilterValue({
                    type: "",
                    neuter: null,
                    tags: [],
                  });
                  setModalOpen(false);
                }}
              />
              <Button
                style={"bg-bgYellow text-fontBlack text-ButtonFont"}
                text={"적용하기"}
                onClick={() => {
                  setFilterValue({
                    type: filter?.type,
                    neuter: filter?.neuter,
                    tags: filter?.tags,
                  });
                  setModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {titleObject.title !== "강아지 매칭" && (
        <div className="flex justify-center items-center gap-2.5 text-fontBlack">
          <div
            className="flex justify-center items-center gap-2.5"
            onClick={() => handleBack()}
          >
            <img src={arrow} className="w-6 h-6" alt="arrow" />
          </div>
        </div>
      )}
      <p className="flex flex-1 items-center h-6 leading-7 font-normal text-bigTitle text-left">
        {titleObject.title}
      </p>
      {titleObject.title === "강아지 매칭" && (
        <>
          <div className="flex justify-center items-center px-2 gap-2.5 text-fontBlack">
            <img
              src={filters}
              className="w-6 h-6"
              alt="filter"
              onClick={() => setModalOpen(true)}
            />
          </div>
          <div
            className="flex justify-center items-center gap-2.5"
            onClick={() => handleAlert()}
          >
            <img src={alert} className="w-6 h-6" alt="alert" />
          </div>
        </>
      )}
      {titleObject.title === "커뮤니티" && (
        <>
          <div
            className="flex justify-center items-center gap-2.5"
            onClick={() => handleWritePost()}
          >
            <img src={plus} className="w-6 h-6" alt="alert" />
          </div>
        </>
      )}
      {titleObject.title === "산책로 후기" && (
        <>
          <div
            className="flex justify-center items-center gap-2.5 text-fontBlack"
            onClick={() => handleWriteTrail(trailIdNumber)}
          >
            <img src={plus} className="w-6 h-6" alt="alert" />
          </div>
        </>
      )}
    </div>
  );
};
