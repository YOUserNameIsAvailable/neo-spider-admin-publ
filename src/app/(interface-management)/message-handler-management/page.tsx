"use client";

import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { MessagehandlerTable } from "@/components/MessagehandlerTable";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
          <button className="bg-neutral-50 p-2" onClick={() => toggleExpansion()}>
            Expand / Colapse
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Org name</span>
              <DropDownList
                className="h-7 w-40"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Transaction division</span>
              <DropDownList
                className="h-7 w-40"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
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
        {isExpanded ? (
          <div className="flex justify-between gap-4 bg-neutral-50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">I/O type</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Operating mode classification</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <MessagehandlerTable />
      <div className="flex justify-end gap-2 ">
        <Button className="mt-2 flex items-center justify-end">Add row</Button>
        <Button className="mt-2 flex items-center  justify-end">Del row</Button>
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          Save
        </Button>
      </div>
    </>
  );
}
