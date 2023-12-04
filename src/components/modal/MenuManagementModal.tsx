import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const MenuManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 400,
    top: 182,
    width: 760,
    height: 463,
  });

  const handleMove = (event: WindowMoveEvent) => {
    setPosition({ ...position, left: event.left, top: event.top });
  };
  const handleResize = (event: WindowMoveEvent) => {
    setPosition({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
  };
  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"메뉴상세"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">상세정보</div>
            </div>
            <div className="flex flex-col">
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    메뉴ID
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={true}
                  />
                </div>
                <span className="required">*</span>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    메뉴명
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={false}
                  />
                </div>
                <span className="required">*</span>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    영문메뉴명
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={false}
                  />
                </div>
                <span className="required">*</span>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    상위메뉴ID
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={true}
                  />
                </div>
                <span className="required">*</span>
                <div className="flex items-center text-[12px] text-[#FF575E]">
                  <button className="mx-1 flex h-[23px] w-[23px] items-center justify-center rounded-[3px] border-[1px] border-[#999999]">
                    <img src="./images/search.gif" />
                  </button>
                  (상위메뉴는 검색으로만 등록 가능)
                </div>
              </div>
              <div className={`flex w-full border-[1px] h-${"auto"}`}>
                <div className={`flex items-center w-[${100}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    메뉴URL
                  </label>
                  <textarea className="my-[2px] ml-[2px] h-auto w-full rounded-[3px] border-[1px] border-[#999999]" />
                </div>
                <span className="required">*</span>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    메뉴 IMAGE
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={false}
                  />
                </div>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${50}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    정렬순서
                  </label>
                  <input
                    className="ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                    disabled={false}
                  />
                  <span className="required">*</span>
                </div>
              </div>
              <div className={`flex w-full border-[1px] h-${"auto"}`}>
                <div className={`flex items-center w-[${100}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    web App ID
                  </label>
                  <textarea className="my-[2px] ml-[2px] h-auto w-full rounded-[3px] border-[1px] border-[#999999]" />
                </div>
              </div>
              <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                <div className={`flex items-center w-[${100}%]`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    출력여부
                  </label>
                  <DropDownList
                    style={{
                      width: "40%",
                      fontSize: "12px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                    size={"small"}
                    data={["미사용", "안전", "주의", "경계"]}
                    defaultValue={"미사용"}
                  />
                </div>
                <div className="flex w-full items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    사용여부
                  </label>
                  <DropDownList
                    style={{
                      width: "40%",
                      fontSize: "12px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                    size={"small"}
                    data={["미사용", "안전", "주의", "경계"]}
                    defaultValue={"미사용"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-[3px]">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start"
              onClick={() => {
                setShowModal(false);
              }}>
              닫기
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              삭제
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
