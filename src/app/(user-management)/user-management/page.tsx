"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon, exportIcon, printIcon } from "@progress/kendo-svg-icons";
import { useTab } from "@/providers/TabProvider";
import { PAGES, SPORTS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";

export default function Page() {
  const { selectedTab } = useTab();

  return (
    <div className="page-container">
      {/* title bar */}
      <div className="page-titlebar">
        <div className="title">{selectedTab?.text}</div>
        <div className="actions">
          <Button svgIcon={exportIcon}>Export</Button>
          <Button svgIcon={printIcon}>Print</Button>
          <Button svgIcon={searchIcon} />
        </div>
      </div>

      {/* filter */}
      <div className="page-subtitle">
        <div className="dot"></div>
        <span>Condition</span>
      </div>
      <div className="table-filter">
        <div className="filter">
          <div className="start">
            <DropDownList
              className="h-7 w-32"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />

            <Input className="h-7 w-40" />

            <div className="filter-item">
              <span>User status:</span>
              <DropDownList
                className="h-7 w-24"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>

            <div className="filter-item">
              <span>Auth:</span>
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>

            <div className="filter-item">
              <span>Rank:</span>
              <DropDownList
                className="w-25 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
          </div>
          <div className="end">
            <div className="filter-item">
              <DropDownList className="h-7 w-16" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span>Items</span>
            </div>

            <Button size={"small"} svgIcon={searchIcon}>
              Find
            </Button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="page-subtitle">
        <div className="dot"></div>
        <span>List</span>
      </div>
      <div className="table-container">
        <UserManagementTable />
      </div>

      <div className="table-b-actions">
        <Button svgIcon={arrowRightIcon}>ADD</Button>
      </div>
    </div>
  );
}
