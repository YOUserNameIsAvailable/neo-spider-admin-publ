"use client";

import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import React, { useState } from "react";
import { PAGES, SPORTS } from "@/constants";
import { ServiceManagementTable } from "@/components/ServiceManagementTable";
import { ComponentManagementTable } from "@/components/ComponentManagementTable";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Expand/Colapse
          </button>
        </div>
        <div className="bg-[#dde6f0] px-[10px]">
          <div className="flex justify-between gap-4 bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <DropDownList
                className="h-[30px] min-w-[120px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option"
                filterable={false}
              />
              <div className="flex items-center gap-2">
                <Input className="w-[148px] border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Class</span>
                <Input className="w-[148px] border border-[#999999]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Biz class</span>
                <DropDownList
                  className="h-[30px] min-w-[120px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />{" "}
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
                <span className="">Items</span>
              </div>

              <Button svgIcon={searchIcon} className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          {isExpanded ? (
            <div className="flex justify-between gap-4 border-t border-[#ccc]  bg-[#dde6f0] p-[5px]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">Component type</span>
                  <DropDownList
                    className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                    size={"small"}
                    data={SPORTS}
                    defaultValue="Option 1"
                    filterable={false}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">Creation type</span>
                  <DropDownList
                    className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                    size={"small"}
                    data={SPORTS}
                    defaultValue="Option 1"
                    filterable={false}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">select order</span>
                  <DropDownList
                    className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                    size={"small"}
                    data={SPORTS}
                    defaultValue="Option 1"
                    filterable={false}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* table */}

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
      </div>
      <ComponentManagementTable />
      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
    </>
  );
}
