"use client";

import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { MenuManagementTable } from "@/components/MenuManagementTable";

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
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
            <Input className="h-7 w-20" />
            <div className="flex items-center gap-2">
              <span className="text-sm">Menu URL</span>
              <Input className="h-7 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Top menu ID</span>
              <Input className="h-7 w-40" />
            </div>
            <img src="http://tst.neobns.com:9480/images/search.gif" />
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
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>list</span>
      </div>
      <MenuManagementTable />
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
