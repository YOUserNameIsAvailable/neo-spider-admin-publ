"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { RoleManagementTable } from "@/components/RoleManagementTable";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import React from "react";

export default function Page() {
  return (
    <>
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center justify-center">
              <DropDownList
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "148px" }}
              />
              <Input className="h-[24px] w-[148px]" />
            </div>
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
        <RoleManagementTable />
      </div>

      <div className="flex justify-end gap-6">
        <div className="flex flex-row gap-1">
          <Button imageUrl="" className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
            Add row
          </Button>
          <Button imageUrl="" className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]">
            Del row
          </Button>
        </div>
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          Save
        </Button>
      </div>
    </>
  );
}
