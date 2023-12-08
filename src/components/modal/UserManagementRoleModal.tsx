import { Dispatch, FC, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Splitter } from "@progress/kendo-react-layout";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const UserManagementRoleModal: FC<{ setShowRoleModal: Dispatch<SetStateAction<boolean>>; userId: string }> = ({
  setShowRoleModal,
  userId,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [dataResult, setDataResult] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});

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

  const getDetail = async () => {
    const resultJson = await fetch("/api/spider/userMng/menuList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const result = await resultJson.json();
    const detail = result?.body?.menulist;
    console.log("detail: ", detail);
    setDataResult(detail);
  };

  const updateDetail = async (e: any) => {
    e.preventDefault();
    if (Object.keys(form).length === 0) {
      alert("수정할 내용이 없습니다.");
      return;
    }
    console.log("form: ", form);

    const userJson = await fetch("/api/spider/userMng/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
      }),
    });

    const updated = await userJson.json();
    console.log("user updated: ", updated);
    if (updated?.body !== "SUCCESS" && updated?.result?.status) {
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getDetail();
    }
  };

  useEffect(() => {
    if (userId) {
      getDetail();
    }
  }, [userId]);

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
        <form className="k-form" onSubmit={updateDetail}>
          <fieldset>
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
                        <Input
                          className="ml-[2px] w-[30%] rounded-[2px] border-[1px] border-[#999999] py-[6px]"
                          value={searchText}
                          onInput={(e) => setSearchText(e.currentTarget.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <Grid className="h-[88%]" rowHeight={29} fixedScroll={true} data={dataResult} resizable={true}>
                        <Column
                          field="menuId"
                          title="메뉴ID"
                          headerClassName="justify-center bg-[#adc6f4] col-width30per"
                          className="col-width30per"
                        />
                        <Column field="menuPath" title="메뉴명" headerClassName="justify-center bg-[#adc6f4]" />
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
                <Button
                  className="basic-btn mt-2 flex h-7 items-center justify-start"
                  onClick={() => setShowRoleModal(false)}>
                  닫기
                </Button>
                <Button className="basic-btn mt-2 flex h-7 items-center justify-start">변경사항 저장</Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Window>
    </>
  );
};
