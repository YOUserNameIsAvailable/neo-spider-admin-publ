import { Dispatch, FC, SetStateAction, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Splitter } from "@progress/kendo-react-layout";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const UserManagementRoleModal: FC<{ setShowRoleModal: Dispatch<SetStateAction<boolean>> }> = ({
  setShowRoleModal,
}) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 111,
    top: 37,
    width: 1107,
    height: 735,
  });
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

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"사용자 메뉴 권한 관리"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowRoleModal(false);
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
                      {
                        메뉴ID: "neb_msg_trx_manage",
                        메뉴명: "Framework 관리메뉴 > 거래전문 관리 > N_전문등록조회",
                      },
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
            <button
              style={{
                background: "url(./images/btn_user_close.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-[23px] w-[40px]"
              onClick={() => {
                setShowRoleModal(false);
              }}
            />
            <button
              style={{
                background: "url(./images/btn_rolemenu_save.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-[23px] w-[80px]"
            />
          </div>
        </div>
      </Window>
    </>
  );
};
