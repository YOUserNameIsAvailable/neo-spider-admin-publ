import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ClientWebAppManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 320,
    top: 188,
    width: 810,
    height: 450,
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
        title={"중지 사유 등록"}
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
              <div className="text-[14px] font-bold text-[#656565]">중지 메세지</div>
              <div className="text-[11px] font-bold text-[#656565]">
                (선택된 web app의 상태를 중지로 변경하고, 중지 사유를 입력합니다. )
              </div>
            </div>
            <div className="flex flex-col">
              <div className={`flex h-[137px] w-full border-[1px]`}>
                <div className={`flex w-full items-center`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    중지 사유(국문)
                  </label>
                  <textarea className="mx-[15px] my-[10px] h-[108px] w-full rounded-[3px] border-[1px] border-[#999999]" />
                </div>
              </div>
              <div className={`flex h-[137px] w-full border-[1px]`}>
                <div className={`flex w-full items-center`}>
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    중지 사유(영문)
                  </label>
                  <textarea className="mx-[15px] my-[10px] h-[108px] w-full rounded-[3px] border-[1px] border-[#999999]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-1">
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
              중지사유등록
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
