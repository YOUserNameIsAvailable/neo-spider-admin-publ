"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { MenuManagementTable } from "@/components/MenuManagementTable";
import React from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

export default function Page() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [position, setPosition] = React.useState({
    left: 400,
    top: 182,
    width: 1000,
    height: 700,
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

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <>
      <>
        <div className="flex items-center gap-2 py-4" onClick={() => setVisible(true)}>
          <img src={"/images/dot_subtitle.gif"} alt="" />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center justify-center">
              <DropDownList
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "100px" }}
              />

              <Input className="h-[24px] w-[148px] border border-[#999999]" />
            </div>

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Menu URL</span>
              <Input className="h-[24px] w-[148px]" />
            </div>

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Top menu ID</span>
              <Input className="h-[24px] w-[148px]" />
            </div>
            <button data-role="button" role="button" className="search_btn no-text" aria-disabled="false">
              <img src="/images/search.gif" alt="" />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <MenuManagementTable />
      </div>

      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
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
            title={"컴포넌트 정보"}
            // left={position.left}
            // top={position.top}
            width={position.width}
            height={position.height}
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
                <div className="flex h-fit w-[60%] flex-col border-[1px] border-[#dfe1e1]">
                  <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[60%] flex-row">
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

                <div className="flex w-[40%] flex-col">
                  <div className="flex h-[29px] flex-row border-[1px] border-[#dfe1e1] ">
                    <div className="flex w-full flex-row">
                      <label className="flex h-full w-[70px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        파일명
                      </label>
                      <input className="my-[2px] ml-[2px] w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>

                  {/*  */}
                  <div className="flex flex-row  border-b-[1px] border-[#dfe1e1] pt-2">
                    <div className="flex h-[29px] w-full flex-row justify-between rounded-t-[4px] bg-[#d1daec]">
                      <div className="flex h-full items-center p-[4px] text-[12px] text-black">소스보기</div>
                      <div className="flex h-full items-center gap-2 p-[4px] text-[12px] text-black">
                        <button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-6">
                          소스불러오기
                        </button>
                        <button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-2">
                          크게
                        </button>
                        <button className="component-info-btn rounded-[4px] border border-[1px] border-[#ccc] px-2">
                          작게
                        </button>
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
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  HISTORY보기
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </>
      )}

      {visible2 && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={""}
            // left={position.left}
            // top={position.top}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setVisible2(false);
            }}></Window>
        </>
      )}
    </>
  );
}
