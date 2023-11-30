"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import React, { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { CodeGroupManagementTable } from "@/components/CodeGroupMangementTable";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { ColumnMenu } from "@/components/ColumnMenu";
import { Grid, GridColumn as Column, getSelectedState } from "@progress/kendo-react-grid";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const SELECTED_FIELD = "selected";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 860,
    height: 640,
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
      {/* filters */}
      <>
        <div>
          <div className="flex items-center gap-2 py-4">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span className="font-bold text-[#656565]">Condition</span>
            <button
              className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
              onClick={() => toggleExpansion()}>
              Expand / Colapse
            </button>
          </div>
          <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
                <Input className="h-[24px] w-[148px] border border-[#999999]" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={PAGES}
                  defaultValue="20"
                  filterable={false}
                />
                <span className="font-bold text-[#333333]">Items</span>
              </div>
              <Button svgIcon={searchIcon}>Find</Button>
            </div>
          </div>
        </div>
        {isExpanded ? (
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Sort division</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <CodeGroupManagementTable />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => setVisible(true)}>
          ADD
        </Button>
      </div>
      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={"코드 정보 상세"}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setVisible(false);
            }}>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col gap-[12px]">
                <div className="flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">코드 그룹 정보</div>
                </div>
              </div>
              <div className="flex flex-col border-[1px] border-[#dfe1e1]">
                <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                  <div className="flex flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      코드그룹ID
                    </label>
                    <input
                      className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                      disabled={true}
                    />
                  </div>
                </div>
                {/*  */}
                <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      코드그룹
                    </label>
                    <input className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      최종수정사용자
                    </label>
                    <div className="break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">Admin</div>
                  </div>
                </div>
                {/*  */}
                <div className="flex h-[57px] flex-row">
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      코드그룹설명
                    </label>
                    <textarea className="m-[2px] w-full resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      최종수정일시
                    </label>
                    <div className="flex items-center break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">
                      Admin
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="my-4 flex w-full flex-row">
                <div className="shrink-1 flex flex-grow items-center text-[#656565]">
                  ※Excel데이터 Copy는 Excel복사버튼 클릭하세요!
                </div>
                <div className="flex flex-row gap-[2px]">
                  <button
                    className="k-button"
                    style={{
                      height: "23px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#656565",
                      borderRadius: "2px",
                      paddingRight: "4px",
                      paddingLeft: "4px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}>
                    Excel복사
                  </button>
                  <button
                    className="k-button"
                    style={{
                      height: "23px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#656565",
                      borderRadius: "2px",
                      paddingRight: "4px",
                      paddingLeft: "4px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}>
                    행 추가
                  </button>
                  <button
                    className="k-button"
                    style={{
                      height: "23px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#656565",
                      borderRadius: "2px",
                      paddingRight: "4px",
                      paddingLeft: "4px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}>
                    선택형 삭제
                  </button>
                </div>
              </div>
              {/*  */}
              <Grid
                style={{
                  height: "300px",
                }}
                rowHeight={29}
                fixedScroll={true}
                data={[
                  {
                    CRUD: "ADD",
                    CODE: "",
                    CODE_DESC: "",
                    CODE_NAME: "",
                    CODE_ENGNAME: "",
                    SORT_ORDER: "",
                    USE_YN: "",
                  },
                ]}
                selectedField={SELECTED_FIELD}>
                <Column
                  filterable={false}
                  sortable={false}
                  field={SELECTED_FIELD}
                  headerClassName="bg-[#adc6f4] overflow-none"
                  className="overflow-none"
                  width={30}
                />
                <Column field="CRUD" title="CRUD" headerClassName="justify-center bg-[#adc6f4]" width={53} />
                <Column
                  field="CODE"
                  headerClassName="justify-center w-[6%]"
                  className="w-[6%]"
                  title="코드"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="CODE_NAME"
                  headerClassName="justify-center w-[17%]"
                  className="w-[17%]"
                  title="코드한글명"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="CODE_ENGNAME"
                  headerClassName="justify-center w-[17%]"
                  className="w-[17%]"
                  title="코드영문명"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="CODE_DESC"
                  headerClassName="justify-center w-[26%]"
                  className="w-[26%]"
                  title="코드설명"
                  columnMenu={ColumnMenu}
                />{" "}
                <Column
                  field="SORT_ORDER"
                  headerClassName="justify-center w-[9%]"
                  className="w-[9%]"
                  title="정렬순서"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="USE_YN"
                  headerClassName="justify-center w-[13%]"
                  className="w-[13%]"
                  title="사용여부"
                  columnMenu={ColumnMenu}
                />
              </Grid>
              {/*  */}
              <div className="my-4 flex w-full flex-row justify-end gap-[4px]">
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={undefined}>
                  전체삭제
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={undefined}>
                  저장
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={undefined}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
