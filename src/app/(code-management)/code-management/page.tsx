"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import React, { useState } from "react";
import { SPORTS, PAGES } from "@/constants";

import { CodeManagementTable } from "@/components/CodeManagementTable";
import { CodeManagementAddModal } from "@/components/modal/CodeManagementAddModal";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(true);

  const [showModal, setShowModal] = React.useState(false);

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
            Expand / Colapse
          </button>
        </div>
        <div className="flex flex-wrap overflow-x-scroll bg-[#dde6f0] px-[10px]">
          <div className="flex w-full flex-wrap justify-between gap-4 bg-[#dde6f0] p-[5px]">
            <div className="flex min-w-[410px] items-center gap-4">
              <div className="flex w-full items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Code group per biz group</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                />
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
              <Button svgIcon={searchIcon} className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          {isExpanded ? (
            <div className="flex w-full justify-between bg-[#dde6f0] p-[5px]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DropDownList
                    className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                    size={"small"}
                    data={SPORTS}
                    defaultValue="Option 1"
                    filterable={false}
                  />
                </div>
                <Input className="w-48 border border-[#999999]" />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <CodeManagementTable />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setShowModal(true);
          }}>
          ADD
        </Button>
      </div>
      {showModal && <CodeManagementAddModal setShowModal={setShowModal} />}
    </>
  );
}
