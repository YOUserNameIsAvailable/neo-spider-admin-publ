import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn, getSelectedState } from "@progress/kendo-react-grid";
import { LocalizationProvider } from "@progress/kendo-react-intl";
import { process } from "@progress/kendo-data-query";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

const createDataState = (dataState: any) => {
  return {
    result: process(data.slice(0), dataState),
    dataState: dataState,
  };
};

let data = [
  { codeGroupID: "GT00010", codeGroupName: "GT 대량거래구분" },
  { codeGroupID: "TST1213", codeGroupName: "테스트그룹" },
  { codeGroupID: "GT00009", codeGroupName: "GT_대량상태코드" },
  { codeGroupID: "GT00005", codeGroupName: "GT_사전등록이체사유" },
  { codeGroupID: "GT00008", codeGroupName: "GT_휴일처리" },
  { codeGroupID: "GT00007", codeGroupName: "GT 이체주기" },
  { codeGroupID: "GT00006", codeGroupName: "GT_송금인과의관계" },
  { codeGroupID: "GT00011", codeGroupName: "GT_거래구분" },
  { codeGroupID: "GT00012", codeGroupName: "GT 테스트구분" },
  { codeGroupID: "GT00013", codeGroupName: "GT_구분" },
  { codeGroupID: "GT00014", codeGroupName: "GT_대량거래구분" },
];

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const CodeManagementAddModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState<PositionInterface>({
    left: 307,
    top: 225,
    width: 905,
    height: 308,
  });

  const [position2, setPosition2] = useState<PositionInterface>({
    left: 383,
    top: 116,
    width: 747,
    height: 572,
  });

  let initialState = createDataState({
    take: 8,
    skip: 0,
  });
  const [result, setResult] = useState(initialState.result);
  const [dataState, setDataState] = useState(initialState.dataState);
  const dataStateChange = (event: any) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const handleMove2 = (event: WindowMoveEvent) => {
    setPosition2({ ...position2, left: event.left, top: event.top });
  };
  const handleResize2 = (event: WindowMoveEvent) => {
    setPosition2({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
  };

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
            <div className="text-[14px] font-bold text-[#656565]">코드 생성</div>
          </div>
          <div className="flex w-full flex-col">
            {[
              {
                id: "코드그룹ID",
                id2: "코드",
                type: "input2",
                disabled: true,
                disabled2: false,
                dot1: false,
                dot2: true,
              },
              {
                id: "코드명",
                id2: "코드영문명",
                type: "input2",
                disabled: false,
                disabled2: false,
                dot1: true,
                dot2: true,
              },
              {
                id: "코드설명",
                id2: "",
                type: "input",
                disabled: false,
                disabled2: false,
                dot1: false,
                dot2: false,
              },
              {
                id: "정렬순서",
                id2: "사용여부",
                type: "select",
                disabled: false,
                disabled2: false,
                dot1: true,
                dot2: true,
              },
              {
                id: "라벨등록 여부",
                id2: "",
                type: "select2",
                disabled: false,
                disabled2: false,
                dot1: true,
                dot2: false,
              },
            ].map((v) => {
              return (
                <>
                  {v.type === "input" ? (
                    <div className="flex h-[30px] w-full  border-[1px]" key={v.id}>
                      <div className="flex w-full items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id}
                        </label>
                        <input className="ml-[2px] w-[70%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                      </div>
                    </div>
                  ) : v.type === "select" ? (
                    <div className="flex h-[30px] w-full  border-[1px]" key={v.id}>
                      <div className="flex w-[50%] items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id}
                        </label>
                        <input
                          className="ml-[2px] w-[20%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                          disabled={v.disabled}
                        />
                        {v.dot1 && <span className="required">*</span>}
                      </div>
                      <div className="flex w-[50%] items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id2}
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
                        {v.dot2 && <span className="required">*</span>}
                      </div>
                    </div>
                  ) : v.type === "input2" ? (
                    <div className="flex h-[30px] w-full  border-[1px]" key={v.id}>
                      <div className="flex w-[50%] items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id}
                        </label>
                        <input
                          className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                          disabled={v.disabled}
                        />
                        {v.id === "코드그룹ID" && (
                          <button
                            className="mx-1 flex h-[23px] w-[23px] items-center justify-center rounded-[3px] border-[1px] border-[#999999]"
                            onClick={() => {
                              setVisible(true);
                            }}>
                            <img src="./images/search.gif" />
                          </button>
                        )}
                        {v.dot1 && <span className="required">*</span>}
                      </div>
                      <div className="flex w-[50%] items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id2}
                        </label>
                        <input
                          className="ml-[2px] w-[40%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]"
                          disabled={v.disabled2}
                        />
                        {v.dot2 && <span className="required">*</span>}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[30px] w-full  border-[1px]" key={v.id}>
                      <div className="flex w-[50%] items-center">
                        <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                          {v.id}
                        </label>
                        <DropDownList
                          style={{
                            width: "30%",
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
                        {v.dot1 && <span className="required">*</span>}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
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
              저장
            </Button>
          </div>
        </div>
      </Window>
      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={"코드 그룹 검색"}
            left={position2.left}
            top={position2.top}
            width={position2.width}
            height={position2.height}
            onMove={handleMove2}
            onResize={handleResize2}
            onClose={() => {
              setVisible(false);
            }}>
            <div className="flex flex-col gap-[15px]">
              <div className="flex items-center gap-1 pb-[4px]">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">검색 조건</div>
              </div>
              <div className="flex h-[40px] justify-between bg-[#DDE6F0] p-[5px]">
                <div className="flex w-[40%]  items-center">
                  <DropDownList
                    style={{
                      width: "60%",
                      fontSize: "12px",
                      marginLeft: "8px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      marginRight: "8px",
                      color: "#656565",
                      fontWeight: "bold",
                    }}
                    size={"small"}
                    data={["코드그룹ID", "안전", "주의", "경계"]}
                    defaultValue={"코드그룹ID"}
                  />
                  <input className="ml-[2px] w-[60%] rounded-[2px] border-[1px] border-[#999999] py-[5px]" />
                </div>
                <div className="flex w-[30%] items-center justify-end gap-[9px]">
                  <DropDownList
                    style={{
                      width: "30%",
                      fontSize: "12px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      color: "#656565",
                    }}
                    size={"small"}
                    data={["20", "안전", "주의", "경계"]}
                    defaultValue={"20"}
                  />
                  <div className="text-[14px] font-bold">건씩</div>
                  <button
                    style={{
                      background: "url(./images/btn_codegroup_search.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="h-[23px] w-[51px]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 pb-[4px]">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">리스트</div>
              </div>
              <LocalizationProvider language="es">
                <Grid
                  data={result}
                  {...dataState}
                  onDataStateChange={dataStateChange}
                  sortable={true}
                  pageable={true}
                  pageSize={8}>
                  <GridColumn field="codeGroupID" title="코드그룹ID" />
                  <GridColumn field="codeGroupName" title="코드그룹명" />
                </Grid>
              </LocalizationProvider>
              <div className="flex flex-row-reverse gap-1">
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
      )}
    </>
  );
};