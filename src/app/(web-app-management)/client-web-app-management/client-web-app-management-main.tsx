import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ClientWebTable } from "@/components/ClientWebTable";
import { PAGES, SPORTS } from "@/constants";
import { ClientWebProps } from "@/types";

export const ClientWebAppMain: React.FC<ClientWebProps> = ({ onRowClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="text-[#656565] font-bold">Condition</span>
          <button
            className="bg-[#f6f6f6f6] px-[4px] py-[2px] border border-[#999999]"
            onClick={() => toggleExpansion()}
          >
            Enlargement/Reduction
          </button>
        </div>
        <div className="bg-[#dde6f0] px-[10px]">
          <div className="bg-[#dde6f0] flex justify-between p-[5px] gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6f7071] font-bold">
                  Menu url
                </span>
                <Input className="w-48 border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6f7071] font-bold">
                  Menu name
                </span>
                <Input className="w-48 border border-[#999999]" />
              </div>
            </div>

            <div className="flex items-center gap-8 mla">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={PAGES}
                  defaultValue="20"
                  filterable={false}
                />
                <span className="text-sm font-bold">Items</span>
              </div>

              <Button imageUrl="/images/refresh.png" className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          <div className="bg-[#dde6f0] flex justify-between p-[5px] gap-4 border-t border-[#ccc]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6f7071] font-bold">
                  Custom Action class
                </span>
                <Input className="w-48 border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6f7071] font-bold">
                  View number
                </span>
                <Input className="w-48 border border-[#999999]" />
              </div>
            </div>
          </div>
          <div className="bg-[#dde6f0] flex justify-between p-[5px] gap-4 border-t border-[#ccc]">
            <div className="w-full flex items-center gap-4">
              <div className="min-w-[195px] flex items-center gap-1">
                <span className="text-sm text-[#6f7071] font-bold whitespace-nowrap">
                  Site type
                </span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>

              <div className="min-w-[195px] flex items-center gap-1">
                <span className="text-sm text-[#6f7071] font-bold">
                  Check status of other banks
                </span>
                <DropDownList
                  className="p-0 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="min-w-[195px] flex items-center gap-1">
                <span className="text-sm text-[#6f7071] font-bold whitespace-nowrap">
                  Service state
                </span>
                <DropDownList
                  className="p-0 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
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
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">e채널 로그 분류코드</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Required</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Whether electronic signature is required
                </span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">입력유형</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">IN/OUTuse message</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Biz class</span>
                <DropDownList
                  className="w-40 h-7"
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
        <div className="flex items-center gap-2 py-4 w-[50%]">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="text-[#656565] font-bold">List</span>
        </div>
        <div className="flex gap-1 w-[90%] justify-end">
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="flex items-center justify-start w-30  h-7 mt-2 basic-btn"
          >
            stop selection
          </Button>
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="flex items-center justify-start w-46 h-7 mt-2 basic-btn"
          >
            Selection guide message
          </Button>
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="flex items-center justify-start h-7 mt-2 basic-btn"
          >
            Group manage
          </Button>
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="flex items-center justify-start h-7 mt-2 basic-btn"
          >
            Del select
          </Button>
        </div>
      </div>
      <ClientWebTable onRowClick={onRowClick} />
      <div className="flex justify-end">
        <Button
          svgIcon={arrowRightIcon}
          className="flex items-center justify-end  mt-2"
        >
          ADD
        </Button>
      </div>
    </>
  );
};
