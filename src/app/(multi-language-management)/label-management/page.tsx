"use client";

import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { PAGES, SPORTS } from "@/constants";
import { ComponentManagementTable } from "@/components/ComponentManagementTable";
import { LabelManagementTable } from "@/components/LabelManagementTable";

export default function Page() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-7 w-32"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <Input className="h-7 w-40" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">LABEL Distinction</span>
              <DropDownList
                className="h-7 w-32"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />{" "}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="h-7 w-16" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-sm">Items</span>
            </div>

            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
      </div>

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
      </div>
      <LabelManagementTable />
    </>
  );
}
