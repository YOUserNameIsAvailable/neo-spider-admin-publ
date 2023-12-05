"use client";

import React, { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useTab } from "@/providers/TabProvider";
import { PAGES, SPORTS } from "@/constants";
import { MyWorkSpaceManagementTable } from "@/components/MyWorkSpaceManagementTable";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { Grid, GridColumn as Column, getSelectedState, GridHeaderCellProps } from "@progress/kendo-react-grid";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import { getter } from "@progress/kendo-react-common";
const SELECTED_FIELD = "selected";
const DATA_ITEM_KEY = "id";
const idGetter = getter(DATA_ITEM_KEY);

export default function Page() {
  const { selectedTab } = useTab();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [groupManage, setGroupManage] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState(false);
  const [position, setPosition] = React.useState({
    left: 400,
    top: 182,
    width: 1000,
    height: 700,
  });
  const [hisPosition, setHisPosition] = React.useState({
    left: 400,
    top: 182,
    width: 600,
    height: 500,
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

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const [panes, setPanes] = React.useState<Array<any>>([{ size: "60%", min: "5%" }, { min: "5%" }]);

  const onChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

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
            <DropDownList
              className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <DropDownList
              className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />

            <DropDownList
              className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={true}
            />
          </div>

          <div className="flex items-center gap-8">
            <Button size={"small"} className="cell-inside-btn px-4 font-normal" onClick={() => setVisible(true)}>
              컴포넌트 정보 임시버튼
            </Button>
            <Button size={"small"} className="cell-inside-btn px-4 font-normal">
              내가 이양한 작업보기
            </Button>
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
        <MyWorkSpaceManagementTable />
      </>

      <div className="mt-4 flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>사용자명</span>
          <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
          <Button imageUrl="/images/refresh.png" className="basic-btn" onClick={() => setSearchUser(true)}>
            검색
          </Button>
          <Button className="btn_green">선택권한이양</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size={"small"}
            className="cell-inside-btn px-4"
            themeColor={"primary"}
            onClick={() => setGroupManage(true)}>
            그룹관리
          </Button>
          <DropDownList
            className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
            size={"small"}
            data={SPORTS}
            defaultValue="Option 1"
            filterable={false}
          />
          <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
            선택담기
          </Button>
        </div>
      </div>
      {searchUser && (
        <div className="k-overlay">
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            title={"사용자 검색"}
            width={hisPosition.width} // 600
            height={hisPosition.height} // 500
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setSearchUser(false);
            }}>
            <div className="flex flex-col">
              <div className="mb-4 flex w-full items-center bg-[#dde6f0] p-[5px]">
                <div className="shrink-1 flex flex-grow items-center gap-4">
                  <DropDownList
                    size={"small"}
                    data={PAGES}
                    defaultValue="20"
                    filterable={false}
                    style={{ width: "100px" }}
                  />
                  <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
                </div>
                <Button imageUrl="/images/refresh.png" className="basic-btn">
                  조회
                </Button>
              </div>
              <div className="flex items-center gap-1 pb-4">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">리스트</div>
                <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">전체 n 건</div>
              </div>
              <Grid
                style={{ height: "300px" }}
                data={dataState.map((item) => ({
                  ...item,
                  [SELECTED_FIELD]: selectedState[idGetter(item) as keyof typeof selectedState],
                }))}
                sortable={true}
                pageable={true}
                dataItemKey={DATA_ITEM_KEY}
                onSelectionChange={onSelectionChange}
                onHeaderSelectionChange={onHeaderSelectionChange}
                pageSize={8}>
                <Column field="modificationDate" title="사용자ID" headerClassName="justify-center bg-[#adc6f4]" />
                <Column field="modifier" title="사용자명" headerClassName="justify-center bg-[#adc6f4]" />
                <Column field="version" title="직급" headerClassName="justify-center bg-[#adc6f4]" />
                <Column field="reasonForChange" title="소속" headerClassName="justify-center bg-[#adc6f4]" />
              </Grid>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={() => {
                    setSearchUser(false);
                  }}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </div>
      )}
      {groupManage && (
        <div className="k-overlay">
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            width={hisPosition.width} // 600
            height={hisPosition.height} // 500
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setGroupManage(false);
            }}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 pb-4">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">그룹관리</div>
                <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
                  <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                    행 추가
                  </Button>
                  <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                    선택형 삭제
                  </Button>
                </div>
              </div>
              <Grid
                style={{ height: "300px" }}
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
                    dataState.findIndex((item: any) => !selectedState[idGetter(item) as keyof typeof selectedState]) ===
                    -1
                  }
                  headerCell={(props: GridHeaderCellProps) => <th {...props}></th>}
                />
                <Column
                  field="modificationDate"
                  title="CRUD"
                  headerClassName="justify-center bg-[#adc6f4] w-[50px]"
                  className="w-[50px]"
                />
                <Column
                  field="modifier"
                  title="그룹이름"
                  headerClassName="justify-center bg-[#adc6f4] w-[80px]"
                  className="w-[80px]"
                />
                <Column
                  field="version"
                  title="그룹설명"
                  headerClassName="justify-center bg-[#adc6f4] w-[40%]"
                  className="w-[40%]"
                />
                <Column
                  field="reasonForChange"
                  title="수정일"
                  headerClassName="justify-center bg-[#adc6f4] w-[30%]"
                  className="w-[30%]"
                />
              </Grid>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  변경사항 저장
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={() => setGroupManage(false)}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </div>
      )}
      {showHistory && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            width={hisPosition.width} // 600
            height={hisPosition.height} // 500
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setShowHistory(false);
            }}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 pb-[4px]">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">파일 History</div>
              </div>
              <div className="mb-4 flex flex-row">
                <div className="mr-2">파일:</div>
                <div className="mr-4">FreeRound</div>
                <div className="mr-2">타입:</div>
                <div className="mr-4">jsp</div>
                <div className="mr-2">경로:</div>
                <div>/cxc/FreeRound.jsp</div>
              </div>
              <Grid
                style={{ height: "300px" }}
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
                  title="체크"
                  headerSelectionValue={
                    dataState.findIndex((item: any) => !selectedState[idGetter(item) as keyof typeof selectedState]) ===
                    -1
                  }
                  headerCell={(props: GridHeaderCellProps) => <th {...props}>체크</th>}
                />
                <Column
                  field="modificationDate"
                  title="수정일"
                  headerClassName="justify-center bg-[#adc6f4] w-[30%]"
                  className="w-[30%]"
                />
                <Column
                  field="modifier"
                  title="수정자"
                  headerClassName="justify-center bg-[#adc6f4] w-[80px]"
                  className="w-[80px]"
                />
                <Column
                  field="version"
                  title="버전"
                  headerClassName="justify-center bg-[#adc6f4] w-[30px]"
                  className="w-[30px]"
                />
                <Column
                  field="reasonForChange"
                  title="변경사유"
                  headerClassName="justify-center bg-[#adc6f4] w-[60%]"
                  className="w-[60%]"
                />
              </Grid>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  소스비교
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={() => setShowHistory(false)}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </>
      )}
      {visible && (
        <>
          <>
            <div className="k-overlay" />
            <Window
              minimizeButton={() => null}
              maximizeButton={() => null}
              restoreButton={() => null}
              doubleClickStageChange={false}
              title={"컴포넌트 정보"}
              // left={position.left}
              // top={position.top}
              width={position.width} // 1000
              height={position.height} // 700
              onMove={handleMove}
              onResize={handleResize}
              onClose={() => {
                setVisible(false);
              }}>
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center gap-1 pb-[4px]">
                    <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                    <div className="text-[14px] font-bold text-[#656565]">컴포넌트 정보</div>
                  </div>
                </div>
                <div className="flex h-full w-full flex-row gap-2">
                  <Splitter panes={panes} onChange={onChange}>
                    <div className="flex h-fit min-w-[550px] flex-col border-[1px] border-[#dfe1e1]">
                      <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                        <div className="flex flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            업무분류
                          </label>
                          <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                        </div>
                        <div className="flex w-[40%] flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            유형
                          </label>
                          <DropDownList
                            style={{ width: "40%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                            size={"small"}
                            data={["선택 안 함", "안전", "주의", "경계"]}
                            defaultValue={"선택 안 함"}
                            className="my-[2px]"
                          />
                          <span className="required">*</span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            컴포넌트ID
                          </label>
                          <input className="my-[2px] ml-[2px] w-[170px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            컴포넌트명
                          </label>
                          <input className="my-[2px] ml-[2px] w-[170px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            경로
                          </label>
                          <input className="my-[2px] ml-[2px] w-[250px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                        <div className="ml-4 flex flex w-full flex-row items-center">http://</div>
                      </div>
                      {/*  */}
                      <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            논리경로
                          </label>
                          <input className="my-[2px] ml-[2px] w-[250px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                        <div className="ml-4 flex flex w-full flex-row items-center gap-2">
                          <Button
                            imageUrl="/images/dot-right-arrow.png"
                            className="basic-btn flex items-center justify-start">
                            폴더선택
                          </Button>
                          <Button
                            imageUrl="/images/dot-right-arrow.png"
                            className="basic-btn flex items-center justify-start">
                            폴더(로컬)
                          </Button>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            수정자
                          </label>
                          <input className="my-[2px] ml-[2px] w-[200px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[45px] flex-row border-b-[1px] border-[#dfe1e1]">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            설명
                          </label>
                          <textarea className="my-[2px] ml-[2px] w-[430px] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex h-[44px] flex-row">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            상세설명
                          </label>
                          <textarea className="my-[2px] ml-[2px] w-[430px] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>
                    </div>
                    {/* */}
                    <div className="flex min-w-[370px] flex-col">
                      <div className="flex h-[30px] flex-row border-[1px] border-[#dfe1e1] ">
                        <div className="flex w-full flex-row">
                          <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                            파일명
                          </label>
                          <input className="my-[2px] ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                          <span className="required">*</span>
                        </div>
                      </div>

                      {/*  */}
                      <div className="flex flex-row border-b-[1px] border-[#dfe1e1] pt-2">
                        <div className="flex h-[29px] w-full flex-row justify-between rounded-t-[4px] bg-[#d1daec]">
                          <div className="flex h-full items-center p-[4px] text-[12px] text-black">소스보기</div>
                          <div className="flex h-full items-center gap-2 p-[4px] text-[12px] text-black">
                            <Button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-6">
                              소스불러오기
                            </Button>
                            <Button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-2">
                              크게
                            </Button>
                            <Button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-2">
                              작게
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="h-[500px] rounded-b-[4px] bg-[#f3f3f3] px-2 pb-2">
                        <Editor
                          // 에디터와 툴바 모두에 적용되는 클래스
                          wrapperClassName="wrapper-class h-full"
                          // 에디터 주변에 적용된 클래스
                          editorClassName="editor !h-full bg-[#fff]"
                          // 툴바 주위에 적용된 클래스
                          toolbarClassName="!hidden"
                          // 한국어 설정
                          localization={{
                            locale: "ko",
                          }}
                          // 초기값 설정
                          editorState={editorState}
                          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                          onEditorStateChange={onEditorStateChange}
                        />
                        {/*<textarea className="my-[2px] h-full w-full resize-none rounded-[2px] border-[1px] border-[#e5e5e5] py-[2px]" />*/}
                      </div>
                    </div>
                  </Splitter>
                </div>
                <div className="flex flex-row justify-end gap-1">
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    DATA삭제
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    DATA복제
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    DATA저장
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    레이아웃 영역이름 보기
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    소스불러오기
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    소스저장하기
                  </Button>
                  <Button
                    imageUrl="/images/dot-right-arrow.png"
                    className="basic-btn flex items-center justify-start"
                    onClick={() => setShowHistory(true)}>
                    HISTORY보기
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    닫기
                  </Button>
                </div>
              </div>
            </Window>
          </>
        </>
      )}
    </>
  );
}
