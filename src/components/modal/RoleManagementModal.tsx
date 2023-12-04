import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const RoleManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 250,
    top: 45,
    width: 1092,
    height: 728,
  });

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };

  const [nestedPanes, setNestedPanes] = useState<Array<any>>([{ size: "50%", resizable: true }, {}]);

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
        title={"Role메뉴 권한 관리"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex w-full flex-col p-4">
          <div className="pb-[10px] text-[17px] font-bold text-[#656565]">권한ID별 메뉴 권한 체크</div>
          <div className="flex h-[75vh] w-full">
            <Splitter
              panes={nestedPanes}
              onChange={(e) => {
                setNestedPanes(e.newState);
              }}>
              <div className="flex w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴를 뺀 메뉴 목록</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex h-[40px] items-center gap-[8px] bg-[#dde6f0] px-[13px] py-[7px]">
                    <DropDownList
                      style={{
                        width: "40%",
                        fontSize: "12px",
                        marginLeft: "2px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                        fontWeight: "bold",
                        color: "#656565",
                      }}
                      size={"small"}
                      data={["메뉴명", "안전", "주의", "경계"]}
                      defaultValue={"메뉴명"}
                    />
                    <input className="ml-[2px] w-[30%] rounded-[2px] border-[1px] border-[#999999] py-[6px]" />
                  </div>
                  <Grid
                    className="h-[88%]"
                    rowHeight={29}
                    fixedScroll={true}
                    data={[
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "nsb_msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > M_거래관리" },
                      { 메뉴ID: "message_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 전문 관리" },
                      { 메뉴ID: "neb_msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > N_전문등록조회" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                      { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                    ]}>
                    {["메뉴ID", "메뉴명"].map((v) => {
                      return <Column key={v} field={v} title={v} width={setPercentage(v === "메뉴ID" ? 50 : 120)} />;
                    })}
                  </Grid>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴 목록</div>
                </div>
                <div className="flex flex-col">
                  <Grid className="h-[88%]" rowHeight={29} fixedScroll={true}>
                    {[
                      { id: "메뉴ID", w: 30 },
                      { id: "메뉴명", w: 80 },
                      { id: "Read", w: 20 },
                      { id: "R/Write", w: 25 },
                    ].map((v) => {
                      return <Column key={v.id} field={v.id} title={v.id} width={setPercentage(v.w)} />;
                    })}
                  </Grid>
                </div>
              </div>
            </Splitter>
          </div>
          <div className="my-[10px] flex flex-row-reverse gap-1">
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={() => setShowModal(false)}>
              닫기
            </Button>
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start">변경사항 저장</Button>
          </div>
        </div>
      </Window>
    </>
  );
};
