import { Checkbox, Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ClientWebProps } from "@/types";
import { ClientWebDetailTable } from "@/components/ClientWebDetailTable";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { useState } from "react";

const TabTitle = ({ text = "" }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <span>{text}</span>
    </div>
  );
};

export const ClientWebAppDetail: React.FC<ClientWebProps> = ({
  setIsDetail,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelectedTab(e.selected);
  };

  return (
    <>
      {/* filters */}
      <div>
        <div className="flex w-[100%]">
          <div className="flex items-center gap-2 py-4 w-[50%]">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span>Basic Info</span>
          </div>
          <div className="flex w-[90%] justify-end items-center">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="flex items-center justify-start w-30 h-7 mx-[2px] basic-btn"
            >
              유사 속성의 신규 Web app등록
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="flex items-center justify-start w-46 h-7 mx-[2px] basic-btn"
            >
              Del
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="flex items-center justify-start h-7 mx-[2px] basic-btn"
            >
              Save
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="flex items-center justify-start h-7 mx-[2px] basic-btn"
              onClick={() => setIsDetail && setIsDetail(false)}
            >
              List
            </Button>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Menu url
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                IN/OUTMessageUse
              </span>
              <div className="grow">
                <DropDownList
                  className="min-w-[180px] h-7 w-0"
                  size={"small"}
                  data={["미사용", "사용"]}
                  defaultValue="미사용"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Menu name
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                View number
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
                <span className="required">*</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Site type
              </span>
              <div className="grow">
                <DropDownList
                  className="min-w-[180px] h-7 w-0"
                  size={"small"}
                  data={["공통", "공통"]}
                  defaultValue="공통"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Request channel code
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} defaultValue={"*.web"} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Biz class
              </span>
              <div className="grow">
                <DropDownList
                  className="min-w-[180px] h-7 w-0"
                  size={"small"}
                  data={["공통[CM]", "공통[CM]"]}
                  defaultValue="공통[CM]"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Input Type
              </span>
              <div className="grow">
                <DropDownList
                  className="min-w-[180px] h-7 w-0"
                  size={"small"}
                  data={["일반", "사용"]}
                  defaultValue="일반"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                요청처리 Web App
              </span>
              <div className="grow">
                <DropDownList
                  className="min-w-[180px] h-7 w-0"
                  size={"small"}
                  data={["단순화면이동", "사용"]}
                  defaultValue="단순화면이동"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Input Validation Rule
              </span>
              <div className="flex w-[100%] flex-row items-center">
                <Input className="h-7" disabled={true} />
                <span className="flex mx-[10px] text-[11px]">X</span>
                <div className="flex gap-1 w-[90%] justify-start ml-[5px]">
                  <Button
                    imageUrl=""
                    className="flex items-center justify-start text-[12px] py-[2px] px-[4px] h-7"
                  >
                    Find
                  </Button>
                  <Button
                    imageUrl=""
                    className="flex items-center justify-start text-[12px] py-[2px] px-[4px] h-7"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Last update user
              </span>
              <div className="grow">{`spider_all`}</div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Last update time
              </span>
              <div className="grow">{`2014/09/26 20:06:59`}</div>
            </div>
          </div>
        </div>
        <div className="flex w-[100%]">
          <div className="flex items-center gap-2 py-4 w-[50%]">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span>Validity check information</span>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Required
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Whether encryption is required
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Whether electronic signature is required
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                이중 submit 체크 여부
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Bizday only
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No(Include Holidays)", value: "false" },
                  ]}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                시간 체크 여부
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Check status of other banks
              </span>
              <div className="grow">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                />
              </div>
            </div>
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                타행 정보 필드 KEY
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
              </div>
            </div>
          </div>
        </div>
        <div className="selection:gap-4 h-[80px] border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-stretch justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[100%]">
              <span className="h-full flex  items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                e채널 로그 분류 코드
              </span>
              <div className="grow flex-col px-[2px] py-[4px]">
                <div className="flex flex-row items-center px-[2px] py-[4px]">
                  <DropDownList
                    className="flex items-center min-w-[180px] h-7 w-0"
                    size={"small"}
                    data={["단순화면이동", "사용"]}
                    defaultValue="단순화면이동"
                    filterable={false}
                  />
                  <Checkbox
                    className="text-[12px] text-[#000] font-bold p-[4px] leading-[20px]"
                    label={"금액/수수료산출대상"}
                  />
                  <Checkbox
                    className="text-[12px] text-[#000] font-bold p-[4px] leading-[20px]"
                    label={"미호환산금액산출대상"}
                  />
                </div>
                <div className="flex flex-row items-center px-[2px] py-[4px] ml-[120px]">
                  <span className="flex w-[50px]">메모</span>
                  <Input className="w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] selection:gap-4 border-spacing-1 border border-x-gray-300 border-t-gray-300">
          <div className="h-full flex items-center justify-between gap-4 grow">
            <div className="flex h-full items-center gap-2 w-[50%]">
              <span className="h-full flex items-center min-w-[150px] p-[4px] text-sm bg-cell ">
                Service state
              </span>
              <div className="flex flex-row">
                <RadioGroup
                  value={"false"}
                  layout="horizontal"
                  data={[
                    { label: "Normal", value: "true" },
                    { label: "Normal+guidance message", value: "false" },
                    { label: "Stop", value: "false" },
                  ]}
                />
                <Checkbox
                  className="text-[12px] text-[#000] p-[4px] leading-[20px]"
                  label={"Enter stop reason"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="flex w-[100%]">
        <div className="flex items-center gap-2 py-4 w-[60%] font-bold">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="text-[#656565]">조건별 분기 페이지</span>
          <div className="text-[#FF5761]" style={{ fontSize: "10px" }}>
            *분기코드, 분기코드설명, Forward유형, Layout Page, Content Page는
            필수 입력사항입니다.
          </div>
        </div>
        <div className="flex gap-1 w-[90%] justify-end">
          <Button
            imageUrl=""
            className="flex items-center justify-start text-[12px] py-[2px] px-[4px] h-7 mt-2"
          >
            Add row
          </Button>
          <Button
            imageUrl=""
            className="flex items-center justify-start text-[12px] py-[2px] px-[4px] h-7 mt-2"
          >
            Del row
          </Button>
        </div>
      </div>
      <div className="pane-content">
        <TabStrip selected={selectedTab} onSelect={handleSelect}>
          <TabStripTab title={<TabTitle text="웹" />}></TabStripTab>
          <TabStripTab title={<TabTitle text="모바일" />}></TabStripTab>
        </TabStrip>
        <div className="w-full px-4 bg-[#f3f3f3]">
          <ClientWebDetailTable />
        </div>
      </div>
    </>
  );
};
