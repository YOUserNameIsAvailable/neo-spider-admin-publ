"use client";

import React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { ApprovalManagementTable } from "@/components/ApprovalManagementTable";
import { ApprovalManagementAddRequest } from "@/components/modal/ApprovalManagementAddRequest";
import { ApprovalManagementAddApprovalItem } from "@/components/modal/ApprovalManagementAddApprovalItem";

export default function Page() {
  const [showAddApprovalRequest, setShowAddApprovalRequest] = React.useState(false);
  const [showApprovalAddItem, setShowApprovalAddItem] = React.useState(false);

  return (
    <>
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList
                size={"small"}
                data={PAGES}
                defaultValue="20"
                filterable={false}
                style={{ width: "80px" }}
              />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>

      {/* table */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <ApprovalManagementTable />
      </>

      <div className="mt-4 flex w-full items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="basic-btn flex items-center justify-start"
            onClick={() => setShowAddApprovalRequest(true)}>
            등록
          </Button>
        </div>
      </div>
      {showAddApprovalRequest && (
        <ApprovalManagementAddRequest
          setShowApprovalAddItem={setShowApprovalAddItem}
          setShowAddApprovalRequest={setShowAddApprovalRequest}
        />
      )}
      {showApprovalAddItem && <ApprovalManagementAddApprovalItem setShowApprovalAddItem={setShowApprovalAddItem} />}
    </>
  );
}
