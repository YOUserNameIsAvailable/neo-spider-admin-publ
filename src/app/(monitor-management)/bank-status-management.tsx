"use client";

import { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { CodeManageTable } from "@/components/CodeManageTable";

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
            Expand / Colapse
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Log tracking number</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Channel ID</span>
            <DropDownList
              className="h-7 w-48"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
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
              <span className="text-sm">User ID</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Result code</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Outgoing/Incomming</span>
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Req/Res</span>
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <CodeManageTable />
    </>
  );
}
