import { Checkbox, Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ClientWebDetailTable } from "@/components/ClientWebDetailTable";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";
import { FC, useEffect, useState } from "react";

const TabTitle = ({ text = "" }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <span>{text}</span>
    </div>
  );
};

export const ClientWebAppDetail: FC<{
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  menuUrl: string;
}> = ({ setIsDetail, menuUrl }) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelectedTab(e.selected);
  };

  const getDetail = async () => {
    const detailJson = await fetch("/api/spider/clientWebappMng/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyMenuUrl: menuUrl,
      }),
    });

    const detailResult = await detailJson.json();
    const detail = detailResult?.body;

    console.log("detail: ", detail);
  };

  useEffect(() => {
    if (menuUrl && menuUrl !== "") {
      getDetail();
    }
  }, [menuUrl]);

  return (
    <>
      {/* filters */}
      <div>
        <div className="flex w-[100%]">
          <div className="flex w-[50%] items-center gap-2 py-4">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span>Basic Info</span>
          </div>
          <div className="flex w-[90%] items-center justify-end">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="w-30 basic-btn mx-[2px] flex h-7 items-center justify-start">
              유사 속성의 신규 Web app등록
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="w-46 basic-btn mx-[2px] flex h-7 items-center justify-start">
              Del
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mx-[2px] flex h-7 items-center justify-start">
              Save
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mx-[2px] flex h-7 items-center justify-start"
              onClick={() => setIsDetail && setIsDetail(false)}>
              List
            </Button>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Menu url</span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">IN/OUTMessageUse</span>
              <div className="grow">
                <DropDownList
                  className="h-7 w-0 min-w-[180px]"
                  size={"small"}
                  data={["미사용", "사용"]}
                  defaultValue="미사용"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Menu name</span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">View number</span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
                <span className="required">*</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Site type</span>
              <div className="grow">
                <DropDownList
                  className="h-7 w-0 min-w-[180px]"
                  size={"small"}
                  data={["공통", "공통"]}
                  defaultValue="공통"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
                Request channel code
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} defaultValue={"*.web"} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Biz class</span>
              <div className="grow">
                <DropDownList
                  className="h-7 w-0 min-w-[180px]"
                  size={"small"}
                  data={["공통[CM]", "공통[CM]"]}
                  defaultValue="공통[CM]"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Input Type</span>
              <div className="grow">
                <DropDownList
                  className="h-7 w-0 min-w-[180px]"
                  size={"small"}
                  data={["일반", "사용"]}
                  defaultValue="일반"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">요청처리 Web App</span>
              <div className="grow">
                <DropDownList
                  className="h-7 w-0 min-w-[180px]"
                  size={"small"}
                  data={["단순화면이동", "사용"]}
                  defaultValue="단순화면이동"
                  filterable={false}
                />
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
                Input Validation Rule
              </span>
              <div className="flex w-[100%] flex-row items-center">
                <Input className="h-7" disabled={true} />
                <span className="mx-[10px] flex text-[11px]">X</span>
                <div className="ml-[5px] flex w-[90%] justify-start gap-1">
                  <Button imageUrl="" className="flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
                    Find
                  </Button>
                  <Button imageUrl="" className="flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Last update user</span>
              <div className="grow">{`spider_all`}</div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Last update time</span>
              <div className="grow">{`2014/09/26 20:06:59`}</div>
            </div>
          </div>
        </div>
        <div className="flex w-[100%]">
          <div className="flex w-[50%] items-center gap-2 py-4">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span>Validity check information</span>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Required</span>
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
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
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
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
                Whether electronic signature is required
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" disabled={true} />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
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
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Bizday only</span>
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
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">시간 체크 여부</span>
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
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
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
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">
                타행 정보 필드 KEY
              </span>
              <div className="flex w-[40%] flex-row">
                <Input className="h-7" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[80px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-stretch justify-between gap-4">
            <div className="flex h-full w-[100%] items-center gap-2">
              <span className="bg-cell flex  h-full min-w-[150px] items-center p-[4px] text-sm ">
                e채널 로그 분류 코드
              </span>
              <div className="grow flex-col px-[2px] py-[4px]">
                <div className="flex flex-row items-center px-[2px] py-[4px]">
                  <DropDownList
                    className="flex h-7 w-0 min-w-[180px] items-center"
                    size={"small"}
                    data={["단순화면이동", "사용"]}
                    defaultValue="단순화면이동"
                    filterable={false}
                  />
                  <Checkbox
                    className="p-[4px] text-[12px] font-bold leading-[20px] text-[#000]"
                    label={"금액/수수료산출대상"}
                  />
                  <Checkbox
                    className="p-[4px] text-[12px] font-bold leading-[20px] text-[#000]"
                    label={"미호환산금액산출대상"}
                  />
                </div>
                <div className="ml-[120px] flex flex-row items-center px-[2px] py-[4px]">
                  <span className="flex w-[50px]">메모</span>
                  <Input className="w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] border-spacing-1 border border-x-gray-300 border-t-gray-300 selection:gap-4">
          <div className="flex h-full grow items-center justify-between gap-4">
            <div className="flex h-full w-[50%] items-center gap-2">
              <span className="bg-cell flex h-full min-w-[150px] items-center p-[4px] text-sm ">Service state</span>
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
                <Checkbox className="p-[4px] text-[12px] leading-[20px] text-[#000]" label={"Enter stop reason"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="flex w-[100%]">
        <div className="flex w-[60%] items-center gap-2 py-4 font-bold">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="text-[#656565]">조건별 분기 페이지</span>
          <div className="text-[#FF5761]" style={{ fontSize: "10px" }}>
            *분기코드, 분기코드설명, Forward유형, Layout Page, Content Page는 필수 입력사항입니다.
          </div>
        </div>
        <div className="flex w-[90%] justify-end gap-1">
          <Button imageUrl="" className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
            Add row
          </Button>
          <Button imageUrl="" className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
            Del row
          </Button>
        </div>
      </div>
      <div className="pane-content">
        <TabStrip selected={selectedTab} onSelect={handleSelect}>
          <TabStripTab title={<TabTitle text="웹" />}></TabStripTab>
          <TabStripTab title={<TabTitle text="모바일" />}></TabStripTab>
        </TabStrip>
        <div className="w-full bg-[#f3f3f3] px-4">
          <ClientWebDetailTable />
        </div>
      </div>
    </>
  );
};
