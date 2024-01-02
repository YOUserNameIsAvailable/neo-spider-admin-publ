"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { ErrotCauseTable } from "@/components/ErrorCauseTable";
import { PAGES } from "@/constants";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isExportExcelState } from "@/store";
import { validateResult } from "@/utils/util";

export default function Page() {
  const router = useRouter();
  const [isExportExcel, setIsExportExcel] = useRecoilState<any>(isExportExcelState);

  const [form, setForm] = useState<any>({
    _search_errorCode: null,
    _search_custUserId: null,
    _search_errorSerNo: null,
    _search_errorOccurDateStart: null,
    _search_errorOccurDate: null,
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/errHstr/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
        }),
      });

      const data = await dataJson.json();
      console.log("data: ", data);

      if (validateResult(data, router) && !isExportExcel) {
        setResult(data?.body?.list);
        setCount(data?.body?.count);
        setCurrentPage(page || 1);
      } else if (isExportExcel) {
        return data?.body?.list;
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
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Enlargement / Reduction
          </button>
        </div>
        <div className="flex flex-col gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px] px-[10px]">
          <div className="flex flex-wrap justify-between gap-4 bg-[#dde6f0]">
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">Error code</span>
                  <Input
                    className="w-48 border border-[#999999]"
                    value={form?._search_errorCode}
                    onInput={(e) => setForm({ ...form, _search_errorCode: e.currentTarget.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">Customer ID</span>
                  <Input
                    className="w-48 border border-[#999999]"
                    value={form?._search_custUserId}
                    onInput={(e) => setForm({ ...form, _search_custUserId: e.currentTarget.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-bold text-[#6f7071]">Customer tel</span>
                  <Input
                    className="w-48 border border-[#999999]"
                    value={form?._search_errorSerNo}
                    onInput={(e) => setForm({ ...form, _search_errorSerNo: e.currentTarget.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
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
          {isExpanded ? (
            <div className="flex w-full justify-between border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    className="w-48 border border-[#999999]"
                    type="date"
                    value={form?._search_errorOccurDateStart}
                    onInput={(e) => setForm({ ...form, _search_errorOccurDateStart: e.currentTarget.value })}
                    onKeyDown={handleKeyDown}
                  />
                  <span className="">~</span>
                  <Input
                    className="w-48 border border-[#999999]"
                    type="date"
                    value={form?._search_errorOccurDate}
                    onInput={(e) => setForm({ ...form, _search_errorOccurDate: e.currentTarget.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <ErrotCauseTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
    </>
  );
}
