"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ErrotCauseTable } from "@/components/ErrorCauseTable";
import { PAGES } from "@/constants";

export default function Page() {
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
          <span>Condition</span>
          <button className="bg-neutral-50 p-2" onClick={() => toggleExpansion()}>
            Enlargement / Reduction
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Error code</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Customer ID</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Customer tel</span>
              <Input className="h-7 w-40" />
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
      {isExpanded ? (
        <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input className="h-7 w-40" type="date" />
              <span className="text-sm">
                ~
                <Input className="h-7 w-40" type="date" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <ErrotCauseTable />
    </>
  );
}
