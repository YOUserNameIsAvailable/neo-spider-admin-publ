import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { get } from "jquery";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ErrorCodeManagementDetailModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
  errorCode?: string;
}> = ({ setShowModal, errorCode }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 250,
    top: 20,
    width: 924,
    height: 680,
  });
  const [form, setForm] = useState<any>({});

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

  const getDetail = async () => {
    try {
      const resultJson = await fetch("/api/spider/errCodeMng/detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          errorCode: errorCode,
        }),
      });

      const result = await resultJson.json();
      const errordesc = result?.body?.detail?.errordesc;
      const errorrecord = result?.body?.detail?.errorrecord[0];
      console.log("detail: ", errordesc);
      setForm({
        trxId: "",
        errorTitle: errorrecord.errortitle,
        orgId: "",
        orgErrorCode: errorrecord.orgErrorode,
        errorLevel: errorrecord.errorLevel,
        errorCode: errorrecord.errorCode,
        errordesc: errordesc,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("errorCode: ", errorCode);
    if (errorCode !== "") {
      getDetail();
    }
  }, [errorCode]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        initialLeft={400}
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"오류코드 수정"}
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
              <div className="text-[14px] font-bold text-[#656565]">오류 코드 정보</div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-[30px] w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    오류코드
                  </label>
                  <input
                    className="ml-[2px] mr-[15px] w-[57%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                    disabled={true}
                  />
                  <span className="required">*</span>
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    오류레벨
                  </label>
                  <div className="flex">
                    <DropDownList
                      style={{ width: "100%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                      size={"small"}
                      data={["선택 안 함", "안전", "주의", "경계"]}
                      defaultValue={"선택 안 함"}
                    />
                    <span className="required">*</span>
                  </div>
                </div>
              </div>
              <div className="flex h-[30px]  border-[1px]">
                <div className="flex w-full items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    오류제목
                  </label>
                  <input className="ml-[2px] mr-[15px] w-[78%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                  <span className="required">*</span>
                </div>
              </div>
              <div className="flex h-[30px] border-[1px]">
                <div className="flex w-full items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    기관명
                  </label>
                  <DropDownList
                    style={{ width: "20%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                  />
                </div>
              </div>
              <div className="flex h-[30px]  border-[1px]">
                <div className="flex w-full items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    기관명
                  </label>
                  <input className="ml-[2px] mr-[2px] w-[80%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">언어별 오류코드</div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-[30px] w-full  border-[1px]">
                <label className="flex h-full w-[50%] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  한국(KO)
                </label>
                <label className="flex h-full w-[50%] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  영어(EN)
                </label>
              </div>
              <div className="flex h-[30px] w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    오류제목
                  </label>
                  <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    오류제목
                  </label>
                  <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                </div>
              </div>
              <div className="flex h-[30px] w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    오류조치방법
                  </label>
                  <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    오류조치방법
                  </label>
                  <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                </div>
              </div>
              <div className="flex h-auto w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    오류 발생원인
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    오류 발생원인
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
              </div>
              <div className="flex h-auto w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    관련도움말 URL
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    관련도움말 URL
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
              </div>
              <div className="flex h-auto w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    관련 FAQ URL
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    관련 FAQ URL
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">폰뱅킹 오류메세지</div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-auto w-full  border-[1px]">
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                    한국어(KO)
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                </div>
                <div className="flex w-[50%] items-center">
                  <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                    영어(EN)
                  </label>
                  <textarea className="my-[2px] ml-[2px] w-[62%] border-[1px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="my-[10px] flex flex-row-reverse gap-[2px]">
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
