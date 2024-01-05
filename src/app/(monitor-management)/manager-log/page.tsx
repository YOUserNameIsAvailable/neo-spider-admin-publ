"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES } from "@/constants";
import { ManageLogTable } from "@/components/ManageLogTable";
import { useRecoilState } from "recoil";
import { isExportExcelState } from "@/store";
import { useRouter } from "next/navigation";
import { validateResult } from "@/utils/util";

export default function Page() {
  const router = useRouter();
  const [isExportExcel, setIsExportExcel] = useRecoilState<any>(isExportExcelState);
  const [form, setForm] = useState<any>({
    _search_traceNo: null,
    _search_channelId: null,
    _search_userId: null,
    _search_resultCode: null,
    _search_ioType: null,
    _search_type: null,
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/user-management/list", {
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
            Expand / Colapse
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Log tracking number</span>
              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={form?._search_traceNo}
                onInput={(e) => setForm({ ...form, _search_traceNo: e.currentTarget.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">Channel ID</span>
              <DropDownList
                className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "_search_userName", NAME: "사용자명" },
                  { VALUE: "_search_userId", NAME: "사용자ID" },
                ]}
                defaultValue={{ VALUE: "_search_userName", NAME: "사용자명" }}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_type: e.value.VALUE }))}
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
        <div className="flex gap-4 border-t border-[#ccc] bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">User ID</span>
              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={form?._search_userId}
                onInput={(e) => setForm({ ...form, _search_userId: e.currentTarget.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Result code</span>
              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={form?._search_resultCode}
                onInput={(e) => setForm({ ...form, _search_resultCode: e.currentTarget.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Outgoing/Incomming</span>
              <DropDownList
                className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "", NAME: "전체" },
                  { VALUE: "O", NAME: "기동" },
                  { VALUE: "I", NAME: "수동" },
                ]}
                defaultValue={{ VALUE: "", NAME: "전체" }}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_ioType: e.value.VALUE }))}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Req/Res</span>
              <DropDownList
                className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "", NAME: "전체" },
                  { VALUE: "Q", NAME: "요청" },
                  { VALUE: "S", NAME: "응답" },
                ]}
                defaultValue={{ VALUE: "", NAME: "전체" }}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_type: e.value.VALUE }))}
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
      <ManageLogTable />
    </>
  );
}
