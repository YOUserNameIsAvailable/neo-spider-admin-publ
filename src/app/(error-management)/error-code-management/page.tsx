"use client";

import React, { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { ErrorCodeTable } from "@/components/ErrorCodeTable";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(false); // <8-2> Error code management - Modify error code
  const [position, setPosition] = useState<PositionInterface>({
    left: 250,
    top: 20,
    width: 924,
    height: 680,
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

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Enlargement/Reduction
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex w-full flex-row items-center">
            <DropDownList
              className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
              style={{ width: "148px" }}
            />

            <Input className="h-[24px] w-[148px]" />

            <div className="ml-2 flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">Error handler</span>
              <DropDownList
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "200px" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="h-[24px]" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
        {/* exandable */}
        {isExpanded ? (
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Tran name</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <ErrorCodeTable />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setVisible(true);
          }}>
          ADD
        </Button>
      </div>
      {/*<8-2> Error code management - Modify error code */}
      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            initialLeft={400}
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={"오류코드 등록"}
            left={position.left}
            top={position.top}
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
                  <div className="text-[14px] font-bold text-[#656565]">오류 코드 정보</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex h-[30px] w-full  border-[1px]">
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        오류코드
                      </label>
                      <input className="ml-[2px] mr-[15px] w-[57%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                        오류레벨
                      </label>
                      <div className="flex">
                        <DropDownList
                          style={{ width: "100%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                          size={"small"}
                          data={["선택 안 함", "안전", "주의", "경계"]}
                          defaultValue={"선택 안 함"}
                        />
                        <span className="required">*</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[30px]  border-[1px]">
                    <div className="flex w-full items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        오류제목
                      </label>
                      <input className="ml-[2px] mr-[15px] w-[78%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                  <div className="flex h-[30px] border-[1px]">
                    <div className="flex w-full items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        기관명
                      </label>
                      <DropDownList
                        style={{ width: "20%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                      />
                    </div>
                  </div>
                  <div className="flex h-[30px]  border-[1px]">
                    <div className="flex w-full items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        기관명
                      </label>
                      <input className="ml-[2px] mr-[2px] w-[80%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">언어별 오류코드</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex h-[30px] w-full  border-[1px]">
                    <label className="flex h-full w-[50%] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                      한국(KO)
                    </label>
                    <label className="flex h-full w-[50%] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                      영어(EN)
                    </label>
                  </div>
                  {[
                    { title: "오류제목", title2: "오류제목" },
                    { title: "오류조치방법", title2: "오류조치방법" },
                    { title: "오류 발생원인", title2: "오류 발생원인" },
                    { title: "관련도움말 URL", title2: "관련도움말 URL" },
                    { title: "관련 FAQ URL", title2: "관련 FAQ URL" },
                  ].map((v) => {
                    return (
                      <>
                        {v.title === "오류제목" || v.title === "오류조치방법" ? (
                          <div className="flex h-[30px] w-full  border-[1px]">
                            <div className="flex w-[50%] items-center">
                              <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                                {v.title}
                              </label>
                              <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                            </div>
                            <div className="flex w-[50%] items-center">
                              <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                                {v.title2}
                              </label>
                              <input className="ml-[2px] w-[62%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-auto w-full  border-[1px]">
                            <div className="flex w-[50%] items-center">
                              <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                                {v.title}
                              </label>
                              <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                            </div>
                            <div className="flex w-[50%] items-center">
                              <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                                {v.title2}
                              </label>
                              <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">폰뱅킹 오류메세지</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex h-auto w-full  border-[1px]">
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        한국어(KO)
                      </label>
                      <textarea className="my-[2px] ml-[2px] w-[62%]  border-[1px]" />
                    </div>
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                        영어(EN)
                      </label>
                      <textarea className="my-[2px] ml-[2px] w-[62%] border-[1px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-[10px] flex flex-row-reverse gap-[2px]">
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
