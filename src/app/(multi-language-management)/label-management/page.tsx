"use client";

import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { PAGES, SPORTS } from "@/constants";
import { LabelManagementTable } from "@/components/LabelManagementTable";
import dynamic from "next/dynamic";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function Page() {
  const [visible, setVisible] = React.useState(false); // <12-2> Label Management - LABEL Manage Detail search
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 336,
    top: 100,
    width: 810,
    height: 620,
  });

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    // editorState에 값 설정
    setEditorState(editorState);
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
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <Input className="h-[24px] w-[148px] border border-[#999999]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold">LABEL Distinction</span>
              <DropDownList
                className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />{" "}
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
              <span>Items</span>
            </div>

            <Button svgIcon={searchIcon} className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
      </div>
      <LabelManagementTable />
      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>

      {/* <12-2> Label Management - LABEL Manage Detail search */}

      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={"LABEL 등록"}
            left={position.left}
            top={position.top}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setVisible(false);
            }}>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-1 pb-[4px]">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">Lable 정보</div>
              </div>
              <div className="flex w-full flex-col">
                {[
                  { id: "LABEL ID", id2: "LABEL 구분", type: "input", dot1: true, dot2: false },
                  { id: "LABEL 설명", id2: "", type: "input1", dot1: false, dot2: true },
                  { id: "변경사유", id2: "", type: "input1", dot1: false, dot2: true },
                ].map((v) => {
                  return (
                    <>
                      {v.type === "input" ? (
                        <div className="flex h-[30px] w-full  border-[1px]" key={v.id}>
                          <div className="flex w-[50%] items-center">
                            <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                              {v.id}
                            </label>
                            <input className="ml-[2px] w-[50%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                            {v.dot1 && <span className="required">*</span>}
                          </div>
                          <div className="flex w-[50%] items-center">
                            <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                              {v.id2}
                            </label>
                            <DropDownList
                              style={{
                                width: "35%",
                                fontSize: "12px",
                                marginLeft: "2px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                color: "#656565",
                              }}
                              size={"small"}
                              data={["선택 안 함", "안전", "주의", "경계"]}
                              defaultValue={"선택 안 함"}
                            />
                            {v.dot2 && <span className="required">*</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-[30px] w-full border-[1px]" key={v.id}>
                          <div className="flex w-full items-center">
                            <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                              {v.id}
                            </label>
                            <input className="ml-[2px] w-[75%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                            {v.dot1 && <span className="required">*</span>}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <div className="my-[10px] flex items-center gap-1">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">LABEL TEXT</div>
              </div>
              <Editor
                // 에디터와 툴바 모두에 적용되는 클래스
                wrapperClassName="wrapper-class"
                // 에디터 주변에 적용된 클래스
                editorClassName="editor"
                // 툴바 주위에 적용된 클래스
                toolbarClassName="toolbar-class"
                // 툴바 설정
                toolbar={{
                  // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: false },
                }}
                placeholder="내용을 작성해주세요."
                // 한국어 설정
                localization={{
                  locale: "ko",
                }}
                // 초기값 설정
                editorState={editorState}
                // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                onEditorStateChange={onEditorStateChange}
              />
              <div className="flex flex-row-reverse">
                <button
                  style={{
                    background: "url(./images/btn_error_report_close.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="h-[23px] w-[54px]"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
                <button
                  style={{
                    background: "url(./images/btn_error_report_save.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="h-[23px] w-[54px]"
                />
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
