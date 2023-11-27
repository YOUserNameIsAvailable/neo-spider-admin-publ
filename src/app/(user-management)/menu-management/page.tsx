"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import { MenuManagementTable } from "@/components/MenuManagementTable";
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

            <div className="minw input-group" style={{ minWidth: "120px", marginLeft: "2px" }}>
              <span className="mr-2 text-xs">Menu URL</span>
              <Input className="h-7 w-40" />
            </div>

            <div className="minw input-group" style={{ minWidth: "120px", marginLeft: "2px" }}>
              <span className="mr-2 text-xs">Top menu ID</span>
              <Input className="h-7 w-40" />
            </div>
            <button data-role="button" role="button" className="search_btn no-text" aria-disabled="false">
              <img src="/images/search.gif" alt="" />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="h-7 w-16" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
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
        <MenuManagementTable />
      </div>

      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
    </>
  );
}
