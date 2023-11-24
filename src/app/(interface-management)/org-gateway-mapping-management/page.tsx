"use client";

import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { OrganizationGatewayTable } from "@/components/OrganizationGatewayTable";

export default function Page() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Org</span>
            <DropDownList className="h-7 w-40" size={"small"} data={SPORTS} defaultValue="Option 1" filterable={true} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Adapter/Listener</span>
            <DropDownList
              className="h-7 w-40"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Req/Res</span>
            <DropDownList
              className="w-30 h-7"
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
      <div className="flex w-[100%]">
        <div className="flex w-[90%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <div className="flex w-[20%] gap-4 ">
          <Button className="w-15 mt-2 flex h-7 items-center justify-start">Add row</Button>
          <Button className="w-15 mt-2 flex h-7 items-center justify-start">Del row</Button>
        </div>
      </div>
      <OrganizationGatewayTable />
      <div className="flex justify-end gap-2 ">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          Save
        </Button>
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          GATEWAY ADD
        </Button>
      </div>
    </>
  );
}
