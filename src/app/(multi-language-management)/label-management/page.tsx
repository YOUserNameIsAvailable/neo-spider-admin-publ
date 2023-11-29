"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { PAGES, SPORTS } from "@/constants";
import { LabelManagementTable } from "@/components/LabelManagementTable";

export default function Page() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <Input className="h-[24px] w-[148px] border border-[#999999]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold">LABEL Distinction</span>
              <DropDownList
                className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />{" "}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={PAGES}
                defaultValue="20"
                filterable={false}
              />
              <span>Items</span>
            </div>

            <Button svgIcon={searchIcon} className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
      </div>
      <LabelManagementTable />
      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
    </>
  );
}
