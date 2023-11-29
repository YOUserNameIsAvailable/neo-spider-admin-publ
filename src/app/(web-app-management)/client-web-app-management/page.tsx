"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon, exportIcon, printIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ClientWebTable } from "@/components/ClientWebTable";
import { PAGES, SPORTS } from "@/constants";
import { useTab } from "@/providers/TabProvider";

export default function Page() {
  const { selectedTab } = useTab();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
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
          <Button size={"small"} onClick={() => toggleExpansion()}>
            Expand/Collapse
          </Button>
        </div>
        <div className="table-filter">
          <div className="filter">
            <div className="start">
              <div className="filter-item">
                <span>Menu Url:</span>
                <Input className="h-7 w-40" />
              </div>
              <div className="filter-item">
                <span>Menu Name:</span>
                <Input className="h-7 w-40" />
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
          <div className="filter">
            <div className="first">
              <div className="filter-item">
                <span>Custom Action class:</span>
                <Input className="h-7 w-40" />
              </div>
              <div className="filter-item">
                <span>View number:</span>
                <Input className="h-7 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* filters */}
      <div>
        <div className="flex justify-between gap-4 bg-neutral-50 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Menu url</span>
              <Input className="h-7 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Menu name</span>
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
        <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Custom Action class</span>
              <Input className="h-7 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">View number</span>
              <Input className="h-7 w-40" />
            </div>
          </div>
        </div>
        <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Site type</span>
              <DropDownList
                className="h-7 w-40"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Check status of other banks</span>
              <DropDownList
                className="h-7 w-40"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Service state</span>
              <DropDownList
                className="h-7 w-40"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {isExpanded ? (
        <>
          <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">e채널 로그 분류코드</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Required</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Whether electronic signature is required</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
          <div className="border-grey-500 flex justify-between gap-4 border-t-2 bg-neutral-50  p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">입력유형</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">IN/OUTuse message</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Biz class</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* table */}
    </>
  );
}
