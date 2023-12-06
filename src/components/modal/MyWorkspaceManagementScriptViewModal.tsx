import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import { EditorState } from "draft-js";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const MyWorkspaceManagementScriptViewModal: FC<{
  setScriptView: Dispatch<SetStateAction<boolean>>;
}> = ({ setScriptView }) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };
  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
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

  return (
    <>
      <div className="k-overlay" />
      <Window
        className="workspace-window"
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setScriptView(false);
        }}>
        <div className="flex w-full flex-col p-4">
          <div className="mb-4 flex w-full flex-row items-center border-[1px] border-[#dfe1e1]">
            <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
              파일명
            </label>
            <input className="my-[2px] ml-[2px] mr-8 w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
          </div>
          <Editor
            // 에디터와 툴바 모두에 적용되는 클래스
            wrapperClassName="wrapper-class h-full"
            // 에디터 주변에 적용된 클래스
            editorClassName="editor !h-[500px] bg-[#fff]"
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
          <div className="mt-4 flex w-full items-center justify-end gap-2">
            <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
              소스저장하기
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={() => {
                setScriptView(false);
              }}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
