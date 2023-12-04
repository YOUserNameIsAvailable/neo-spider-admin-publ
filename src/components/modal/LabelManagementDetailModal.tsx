import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const LabelManagementDetailModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 336,
    top: 100,
    width: 810,
    height: 620,
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"LABEL 관리 상세조회"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-1 pb-[4px]">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">Lable 정보</div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  LABEL ID
                </label>
                <input className="ml-[2px] w-[50%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  LABEL 구분
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
              </div>
            </div>
            <div className="flex h-[30px] w-full border-[1px]">
              <div className="flex w-full items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  LABEL 설명
                </label>
                <input className="ml-[2px] w-[75%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
              </div>
            </div>
            <div className="flex h-[30px] w-full border-[1px]">
              <div className="flex w-full items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  변경사유
                </label>
                <input className="ml-[2px] w-[75%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
              </div>
            </div>
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
          <div className="flex flex-row-reverse gap-[3px]">
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
    </>
  );
};
