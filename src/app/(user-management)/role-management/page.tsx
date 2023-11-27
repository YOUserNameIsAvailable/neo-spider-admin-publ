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
          <span>Condition</span>
        </div>
        <div className="searchbox flex min-h-[40px] justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="minw input-group" style={{ minWidth: "120px", marginLeft: "2px" }}>
              <DropDownList
                className="ml-5 mr-2 h-7 w-32 text-xs"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />

              <Input className="h-7 w-40" />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="w-18 h-7" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-xs">Items</span>
            </div>
            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>
      <div>
        <div className="flex items-center gap-2 pb-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <RoleManagementTable />
      </div>

      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
    </>
  );
}
