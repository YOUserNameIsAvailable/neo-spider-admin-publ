"use client";

import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { OrganizationGatewayTable } from "@/components/OrganizationGatewayTable";
import { XmlPropertyManagementTable } from "@/components/XmlPropertyManagementTable";

export default function Page() {
  return (
    <>
      <div></div>
      <div className="flex w-[100%]">
        <div className="flex w-[90%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <div className="flex w-[20%] gap-4 ">
          <Button className="w-15 mt-2 flex h-7 items-center justify-start" svgIcon={arrowRightIcon}>
            Reload All
          </Button>
          <Button svgIcon={arrowRightIcon} className="w-15 mt-2 flex h-7 items-center justify-start">
            Add
          </Button>
        </div>
      </div>
      <XmlPropertyManagementTable />
    </>
  );
}
