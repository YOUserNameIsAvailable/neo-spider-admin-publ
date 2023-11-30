"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { MenuManagementTable } from "@/components/MenuManagementTable";
import React from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";

export default function Page() {
  const [visible, setVisible] = React.useState(false);
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
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">컴포넌트 정보</div>
                </div>
              </div>
              <div className="flex h-full w-full flex-row">
                <div className="flex w-[60%] flex-col border-[1px] border-[#dfe1e1] bg-red-100">
                  <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[70%] flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        업무분류
                      </label>
                      <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                    </div>
                    <div className="flex w-[30%] flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
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
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        컴포넌트ID
                      </label>
                      <input className="my-[2px] ml-[2px] w-[170px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-full flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        컴포넌트명
                      </label>
                      <input className="my-[2px] ml-[2px] w-[170px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-full flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
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
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
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
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        수정자
                      </label>
                      <input className="my-[2px] ml-[2px] w-[200px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[45px] flex-row border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-full flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        설명
                      </label>
                      <textarea className="my-[2px] ml-[2px] w-[430px] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[44px] flex-row">
                    <div className="flex w-full flex-row">
                      <label className="flex h-full w-[70px]  items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        상세설명
                      </label>
                      <textarea className="my-[2px] ml-[2px] w-[430px] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                </div>
                <div className="flex h-[100px] w-[40%] bg-blue-100"></div>
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
