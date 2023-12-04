import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";

const columns = [
  { field: "오류처리 핸들러 목록", title: "오류처리 핸들러 목록" },
  { field: "", title: "" },
];

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ErrorCodeManagementHandlerModal: FC<{
  setHandlerModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setHandlerModal }) => {
  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };

  const [position, setPosition] = useState<PositionInterface>({
    left: 400,
    top: 170,
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
        initialLeft={400}
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"오류코드별 핸들러 등록"}
        style={{ minWidth: "90px", minHeight: "50px", width: "749px", height: "400px" }}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onClose={() => {
          setHandlerModal(false);
        }}
        onMove={handleMove}
        onResize={handleResize}>
        <div className="flex flex-col">
          <div className="flex h-[30px] items-center rounded-t-[4px] bg-[#d1daec] px-[5px]">
            [ UME10116 ] - 서비스 미가입 오류
          </div>
          <form className="flex h-full w-full">
            <Grid
              style={{ height: "200px" }}
              data={[
                { "핸들러 명": "MSN 오류전송 핸들러", 파라미터: "" },
                { "핸들러 명": "중복확인", 파라미터: "" },
                { "핸들러 명": "333333", 파라미터: "" },
                { "핸들러 명": "123123123", 파라미터: "" },
              ]}>
              {["핸들러 명", "파라미터"].map((v) => {
                return <Column key={v} field={v} title={v} />;
              })}
            </Grid>
            <div
              className="flex h-[200px] w-[55px] flex-col items-center justify-center"
              style={{ maxWidth: "55px", minWidth: "55px", borderLeftColor: "#eee", borderLeftWidth: "20px" }}>
              <img src="./images/left-arrow-red.png" className="my-[10px]" />
              <img src="./images/right-arrow-blue.png" className="my-[10px]" />
            </div>
            <Grid
              style={{ height: "200px" }}
              data={[
                { "오류처리 핸들러 목록": "이메일 오류전송 핸들러", "": "" },
                { "오류처리 핸들러 목록": "HANDLE_NAME", "": "" },
                { "오류처리 핸들러 목록": "이메일 오류전송 핸들러", "": "" },
                { "오류처리 핸들러 목록": "TSETS", "": "" },
              ]}>
              {columns.map((column, index) => {
                return (
                  <Column
                    field={column.field}
                    title={column.title}
                    key={index}
                    width={setPercentage(column.title === "" ? 10 : 90)}
                  />
                );
              })}
            </Grid>
          </form>
          <div className="my-[10px] flex flex-row-reverse gap-7">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start"
              onClick={() => setHandlerModal(false)}>
              닫기
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              변경사항 저장
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
