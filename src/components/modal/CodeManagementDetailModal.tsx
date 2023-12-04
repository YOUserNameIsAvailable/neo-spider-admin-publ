import { Dispatch, FC, SetStateAction, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const CodeManagementDetailModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 810,
    height: 284,
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
        title={"코드 정보"}
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
          <div className="flex items-center gap-1 pb-[4px]">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">코드 수정</div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  코드그룹
                </label>
                <input
                  className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                  disabled={true}
                />
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  코드
                </label>
                <input
                  className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                  disabled={false}
                />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  코드명
                </label>
                <input
                  className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                  disabled={false}
                />
                <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  코드영문명
                </label>
                <input
                  className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                  disabled={false}
                />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-full items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  코드설명
                </label>
                <input className="ml-[2px] w-[70%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  정렬순서
                </label>
                <input className="ml-[2px] w-[20%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
                <div className="text-[11px] text-[#285BA2]">등록된 코드: 261</div>
              </div>
              <div className="flex w-[50%] items-center">
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
                    color: "#656565",
                  }}
                  size={"small"}
                  data={["사용", "안전", "주의", "경계"]}
                  defaultValue={"사용"}
                />
                <span className="required">*</span>
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
              삭제
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              저장
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
