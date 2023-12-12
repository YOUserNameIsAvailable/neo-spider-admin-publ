import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { FC, useState } from "react";
import { ClientWebTable } from "@/components/ClientWebTable";
import { PAGES, SPORTS } from "@/constants";
import { ClientWebAppManagementModal } from "@/components/modal/ClientWebAppManagementModal";

export const ClientWebAppMain: FC<{
  onRowClick?: (event: any) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ onRowClick, result, count, displayCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [showModal, setShowModal] = useState(false); // <5-3> Client WebApp Manage - stop selection

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
        <div className="overflow-x-scroll bg-[#dde6f0] px-[10px]">
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
                <span className="font-bold text-[#333333]">Items</span>
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
            <div className="flex w-full flex-wrap items-center gap-4">
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
                  className="h-[30px] min-w-[90px] border bg-[#f6f6f6f6] p-0 text-[#656565]"
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
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">e채널 로그 분류코드</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Required</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">
                  Whether electronic signature is required
                </span>
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
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">입력유형</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">IN/OUTuse message</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Biz class</span>
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
            onClick={() => {
              setShowModal(true);
            }}>
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
      <ClientWebTable onRowClick={onRowClick} result={result} count={count} displayCount={displayCount} />
      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
      {showModal && <ClientWebAppManagementModal setShowModal={setShowModal} />}
    </>
  );
};
