"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import React, { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { CodeGroupManagementTable } from "@/components/CodeGroupMangementTable";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* filters */}
      <>
        <div>
          <div className="flex items-center gap-2 py-4">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span className="font-bold text-[#656565]">Condition</span>
            <button
              className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
              onClick={() => toggleExpansion()}>
              Expand / Colapse
            </button>
          </div>
          <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
                <Input className="h-[24px] w-[148px] border border-[#999999]" />
              </div>
            </div>
            <div className="flex items-center gap-8">
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
              <Button svgIcon={searchIcon}>Find</Button>
            </div>
          </div>
        </div>
        {isExpanded ? (
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Sort division</span>
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
        ) : null}
      </>
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <CodeGroupManagementTable />
    </>
  );
}
