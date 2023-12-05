"use client";

import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { ApprovalManagementTable } from "@/components/ApprovalManagementTable";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn as Column, getSelectedState, GridHeaderCellProps } from "@progress/kendo-react-grid";
import { TabStrip, TabStripTab, TabStripSelectEventArguments } from "@progress/kendo-react-layout";

import { getter } from "@progress/kendo-react-common";
const SELECTED_FIELD = "selected";
const DATA_ITEM_KEY = "id";
const idGetter = getter(DATA_ITEM_KEY);

export default function Page() {
  const [showApprovalRequest, setShowApprovalRequest] = React.useState(false);
  const [position, setPosition] = React.useState({
    left: 400,
    top: 182,
    width: 1100,
    height: 700,
  });
  const [selected, setSelected] = React.useState<number>(-1);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
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

  const historyGridDummy = [
    {
      id: 1,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 2,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 3,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 4,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 5,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 6,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 7,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 8,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 9,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 10,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 11,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
  ];

  const [dataState, setDataState] = React.useState(
    historyGridDummy.map((dataItem) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem,
      ),
    ),
  );
  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = React.useCallback(
    (event: any) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState],
  );
  const onHeaderSelectionChange = React.useCallback((event: any) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: { [key: string]: boolean } = {};
    event.dataItems.forEach((item: any) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  return (
    <>
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList
                size={"small"}
                data={PAGES}
                defaultValue="20"
                filterable={false}
                style={{ width: "80px" }}
              />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>

      {/* table */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <ApprovalManagementTable />
      </>

      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="basic-btn flex items-center justify-start"
            onClick={() => setShowApprovalRequest(true)}>
            등록
          </Button>
        </div>
      </div>
      {showApprovalRequest && (
        <div className="k-overlay">
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            title={"결제요청서"}
            width={position.width} // 1100
            height={position.height} // 700
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setShowApprovalRequest(false);
            }}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 pb-4">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">신규 결제요청서 작성</div>
              </div>
              <TabStrip className="approval-tab" selected={selected} onSelect={handleSelect}>
                <TabStripTab title={<span className="p-[5px] font-bold text-[#656565]">결재요청</span>}>
                  <div className="flex flex-col border-[1px] border-[#dfe1e1]">
                    <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                      <div className="flex w-[70%] flex-row">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          제목
                        </label>
                        <input className="my-[2px] ml-[2px] w-[70%] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                        <span className="required">*</span>
                      </div>
                      <div className="flex w-[30%] flex-row">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          작업구분
                        </label>
                        <DropDownList
                          style={{ width: 100, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                          size={"small"}
                          data={["선택 안 함", "안전", "주의", "경계"]}
                          defaultValue={"선택 안 함"}
                          className="my-[2px]"
                        />
                        <span className="required">*</span>
                      </div>
                    </div>
                    <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                      <div className="flex w-full flex-row items-center">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          배포예약
                        </label>
                        <div className="flex items-center gap-4">
                          <Input className="ml-[2px] w-48 border border-[#999999]" type="date" />
                          <input className="my-[2px] ml-[2px] w-[70px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <div>시</div>
                          <input className="my-[2px] ml-[2px] w-[70px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <div>분</div>
                          <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                            즉시반영
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[59px] w-full flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                      <div className="flex h-full w-full flex-row items-center">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          설명
                        </label>
                        <div className="flex h-full w-full items-center py-[2px] pr-8">
                          <textarea className="ml-[2px] h-full w-[100%] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[200px] w-full flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                      <div className="flex h-full w-full flex-row items-center">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          첨부파일
                        </label>
                        <div className="flex h-full w-[600px] items-center py-[2px] pl-[2px]">
                          <Grid
                            style={{ height: "195px", width: "550px" }}
                            data={dataState.map((item) => ({
                              ...item,
                              [SELECTED_FIELD]: selectedState[idGetter(item) as keyof typeof selectedState],
                            }))}
                            sortable={true}
                            pageable={true}
                            dataItemKey={DATA_ITEM_KEY}
                            selectedField={SELECTED_FIELD}
                            onSelectionChange={onSelectionChange}
                            onHeaderSelectionChange={onHeaderSelectionChange}
                            pageSize={8}>
                            <Column
                              editable={false}
                              field={SELECTED_FIELD}
                              width="30px"
                              headerSelectionValue={
                                dataState.findIndex(
                                  (item: any) => !selectedState[idGetter(item) as keyof typeof selectedState],
                                ) === -1
                              }
                            />
                            <Column
                              field="modificationDate"
                              title="파일이름"
                              headerClassName="justify-center bg-[#adc6f4]"
                            />
                          </Grid>
                        </div>
                        <div className="shrink-1 flex flex-grow gap-4">
                          <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                            등록
                          </Button>
                          <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                            취소
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[28px] flex-row justify-between">
                      <div className="flex w-[70%] flex-row">
                        <label className="flex h-full w-[70px] min-w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                          최종결재자
                        </label>
                        <DropDownList
                          style={{ width: 100, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                          size={"small"}
                          data={["선택 안 함", "안전", "주의", "경계"]}
                          defaultValue={"선택 안 함"}
                          className="my-[2px]"
                        />
                      </div>
                    </div>
                  </div>
                </TabStripTab>

                <TabStripTab title={<span className="p-[5px] font-bold text-[#656565]">결재 요청 항목 리스트</span>}>
                  <div className="flex items-center gap-1 pb-4">
                    <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                    <div className="text-[14px] font-bold text-[#656565]">검색조건</div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
                    <div className="flex items-center gap-4">
                      <DropDownList
                        className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                        size={"small"}
                        data={SPORTS}
                        defaultValue="Option 1"
                        filterable={false}
                      />
                      <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <DropDownList
                          size={"small"}
                          data={PAGES}
                          defaultValue="20"
                          filterable={false}
                          style={{ width: "80px" }}
                        />
                        <span className="font-bold text-[#333333]">Items</span>
                      </div>

                      <Button imageUrl="/images/refresh.png" className="basic-btn">
                        Find
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 py-4">
                    <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
                    <span className="font-bold text-[#656565]">리스트</span>
                  </div>
                </TabStripTab>
              </TabStrip>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  저장
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={() => setShowApprovalRequest(false)}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </div>
      )}
    </>
  );
}
