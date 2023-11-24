"use client";

import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { PAGES, SPORTS } from "@/constants";
import { ServiceManagementTable } from "@/components/ServiceManagementTable";

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
            Expand/Colapse
          </button>
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
          <div className="flex items-center gap-2">
            <span className="text-sm">Biz class</span>
            <DropDownList
              className="h-7 w-32"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">Service state</span>
              <DropDownList
                className="h-7 w-32"
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
                <span className="text-sm">Service type</span>
                <DropDownList
                  className="h-7 w-40"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Request channel</span>
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
                <span className="text-sm">SELECT SORT</span>
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
              <p className="pr-12">Option</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Check login</span>

                <Checkbox />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Save secure sign</span>

                <Checkbox />
              </div>{" "}
              <div className="flex items-center gap-2">
                <span className="text-sm">Check status of other banks</span>

                <Checkbox />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 bg-neutral-50 p-4 ">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2  pl-20">
                <span className="text-sm ">Bizday service</span>

                <Checkbox />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Saturday service</span>

                <Checkbox />
              </div>{" "}
              <div className="flex items-center gap-2">
                <span className="text-sm">Holiday service</span>

                <Checkbox />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* table */}

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <div className="flex w-[10%] gap-4 ">
          <Button svgIcon={arrowRightIcon} className="w-50 mt-2 flex h-7  items-center justify-start ">
            View service naming rule
          </Button>
          <Button svgIcon={arrowRightIcon} className="mt-2 flex h-7 w-32 items-center justify-start">
            Access user list
          </Button>
        </div>
      </div>
      <ServiceManagementTable />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
    </>
  );
}
