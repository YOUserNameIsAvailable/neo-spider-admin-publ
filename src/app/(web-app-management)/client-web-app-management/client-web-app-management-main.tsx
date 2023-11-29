import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ClientWebTable } from "@/components/ClientWebTable";
import { PAGES, SPORTS } from "@/constants";
import { ClientWebProps } from "@/types";
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ClientWebAppMain: React.FC<ClientWebProps> = ({ onRowClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [visible,setVisible] = useState(false);  // <5-3> Client WebApp Manage - stop selection
  const [position, setPosition] = useState<PositionInterface>({
    left: 320,
    top:188,
    width: 810,
    height: 450,
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
        <div className="bg-[#dde6f0] px-[10px]">
          <div className="flex justify-between gap-4 bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Menu url</span>
                <Input className="w-48 border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Menu name</span>
                <Input className="w-48 border border-[#999999]" />
              </div>
            </div>

            <div className="mla flex items-center gap-8">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={PAGES}
                  defaultValue="20"
                  filterable={false}
                />
                <span className="font-bold">Items</span>
              </div>

              <Button imageUrl="/images/refresh.png" className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Custom Action class</span>
                <Input className="w-48 border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">View number</span>
                <Input className="w-48 border border-[#999999]" />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex w-full items-center gap-4">
              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Site type</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>

              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Check status of other banks</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] p-0 text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Service state</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] p-0 text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <>
          <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">e채널 로그 분류코드</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Required</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Whether electronic signature is required</span>
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
          <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">입력유형</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">IN/OUTuse message</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Biz class</span>
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
        </>
      ) : null}
      {/* table */}

      <div className="flex w-[100%]">
        <div className="flex w-[50%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <div className="flex w-[90%] justify-end gap-1">
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="w-30 basic-btn mt-2 flex  h-7 items-center justify-start"
            onClick={()=>{setVisible(true)}}
            >
            stop selection
          </Button>
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="w-46 basic-btn mt-2 flex h-7 items-center justify-start">
            Selection guide message
          </Button>
          <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
            Group manage
          </Button>
          <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
            Del select
          </Button>
        </div>
      </div>
      <ClientWebTable onRowClick={onRowClick} />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
       {/* <5-3> Client WebApp Manage - stop selection */}

       {visible && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'중지 사유 등록'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
            <div className="flex flex-col gap-[12px]">
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             중지 메세지
              </div>
              <div className="text-[11px] text-[#656565] font-bold">
          (선택된 web app의 상태를 중지로 변경하고, 중지 사유를 입력합니다. )
              </div>
            </div>
            <div className="flex flex-col">
              {[
                {id:'중지 사유(국문)'},
                {id:'중지 사유(영문)'},
            ].map((v)=>{
              return(
                 <div key={v.id} className={`flex w-full border-[1px] h-[137px]`}>
                   <div className={`flex items-center w-full`} >
                   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
                     <textarea className="w-full h-[108px] rounded-[3px] border-[1px] border-[#999999] my-[10px] mx-[15px]" />
                    </div>
                  </div>
              )
            })}
            </div>
            </div>
            <div className="flex flex-row-reverse gap-[24px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        <button style={{background:"url(./images/btn_client_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[90px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
    </>
  );
};
