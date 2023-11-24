"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useTab } from "@/providers/TabProvider";
import { PAGES, SPORTS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";

export default function Page() {
  const { selectedTab } = useTab();

  return (
    <>
      {/* filters */}
      <>
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

            <Input className="h-7 w-40" />

            <div className="flex items-center gap-2">
              <span className="text-sm">User status:</span>
              <DropDownList
                className="h-7 w-20"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Auth:</span>
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Rank:</span>
              <DropDownList
                className="w-25 h-7"
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
      </>

      {/* table */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <UserManagementTable />
      </>

      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
    </>
  );
}
