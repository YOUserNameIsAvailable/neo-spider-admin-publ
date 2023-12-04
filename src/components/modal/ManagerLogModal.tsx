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

export const ManagerLogModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 400,
    top: 200,
    width: 746,
    height: 402,
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
        title={"사용자 페이지 접속 로그"}
        // style={{minWidth:'90px',minHeight:'50px',width:"auto",height:'auto'}}
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
              <div className="text-[14px] font-bold text-[#656565]">기본 정보</div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-[30px] w-full border-[1px]">
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    로그 일련번호
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]">
                    63
                  </div>
                </div>
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    로그 추적번호
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]">
                    203012040140120421401240124210420
                  </div>
                </div>
              </div>
              <div className="flex h-[30px] w-full border-[1px]">
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    사용자ID
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]">
                    GUEST
                  </div>
                </div>
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    채널 ID
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]"></div>
                </div>
              </div>
              <div className="flex h-[30px] w-full border-[1px]">
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    기동/수동
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]"></div>
                </div>
                <div className="flex h-auto w-[50%]">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    요청/응답
                  </label>
                  <div className="flex items-center break-all px-[2px] py-[2px] text-[11px] font-bold text-[#656565]"></div>
                </div>
              </div>
              <div className="flex h-[30px] w-full border-[1px]">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  처리결과 코드
                </label>
                <span className="flex items-center px-[2px] py-[2px] text-[11px] font-bold text-[#656565]"></span>
              </div>
              <div className="flex h-[60px] w-full border-[1px]">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  처리결과 메시지
                </label>
                <span className="flex items-center px-[2px] py-[2px] text-[11px] font-bold text-[#656565]"></span>
              </div>
              <div className="flex h-[60px] w-full border-[1px]">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  로그 데이터
                </label>
                <textarea className="h-auto w-full" />
              </div>
            </div>
          </div>
          <div className="my-[10px] flex flex-row-reverse">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start"
              onClick={() => {
                setShowModal(false);
              }}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
