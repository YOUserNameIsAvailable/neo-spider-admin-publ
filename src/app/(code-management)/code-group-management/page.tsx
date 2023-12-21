"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { PAGES } from "@/constants";
import { CodeGroupManagementTable } from "@/components/CodeGroupMangementTable";
import { CodeGroupManagementAddModal } from "@/components/modal/CodeGroupManagementAddModal";
import { validateResult } from "@/utils/util";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [form, setForm] = useState<any>({
    _search_type: "_search_codeGroupNm",
    _order_type: "",
    _search_codeGroupId: null,
    _search_codeGroupNm: null,
  });
  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/codeGroup/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
          ...(searchText !== "" && form._search_type === "_search_codeGroupNm"
            ? { _search_codeGroupNm: searchText }
            : { _search_codeGroupId: searchText }),
        }),
      });

      const data = await dataJson.json();
      console.log("data: ", data);

      if (validateResult(data, router)) {
        setResult(data?.body?.list);
        setCount(data?.body?.count);
        setCurrentPage(page || 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getHandler(currentPage, displayCount);
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Expand / Colapse
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DropDownList
                className="mr-2 h-[30px] w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "_search_codeGroupNm", NAME: "코드그룹명" },
                  { VALUE: "_search_codeGroupId", NAME: "코드그룹ID" },
                ]}
                defaultValue={{ VALUE: "_search_codeGroupNm", NAME: "권한명" }}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_type: e.value.VALUE }))}
              />

              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={searchText}
                onInput={(e) => setSearchText(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList
                size={"small"}
                data={PAGES}
                defaultValue={displayCount}
                style={{ width: "80px" }}
                onChange={(e) => {
                  setDisplayCount(e.target.value);
                  getHandler(currentPage, e.target.value);
                }}
              />
              <span className="font-bold text-[#333333]">Items</span>
            </div>
            <Button
              imageUrl="/images/refresh.png"
              className="basic-btn"
              onClick={() => getHandler(currentPage, displayCount)}>
              Find
            </Button>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">Sort division</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "", NAME: "전체" },
                  { VALUE: "CODE_GROUP_NAME", NAME: "그룹명" },
                  { VALUE: "CODE_GROUP_ID", NAME: "그룹ID" },
                ]}
                defaultValue={{ VALUE: "", NAME: "전체" }}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _order_type: e.value.VALUE }))}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <CodeGroupManagementTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => setShowAddModal(true)}>
          ADD
        </Button>
      </div>
      {showAddModal && <CodeGroupManagementAddModal setShowAddModal={setShowAddModal} />}
    </>
  );
}
