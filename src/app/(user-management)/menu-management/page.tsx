"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { MenuManagementTable } from "@/components/MenuManagementTable";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [form, setForm] = useState<any>({
    _search_type: "_search_menuName",
    _search_menuId: null,
    _search_menuName: null,
    _search_menuUrl: "",
    _search_priorMenuId: "",
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const loginJson = sessionStorage.getItem("isLogin") || "";
      const login = JSON.parse(loginJson);
      const dataJson = await fetch("/api/spider/menu-management/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: login?.userId,
          ...form,
          ...(searchText !== "" && form._search_type === "_search_menuName"
            ? { _search_menuName: searchText }
            : { _search_menuId: searchText }),
        }),
      });

      const data = await dataJson.json();
      console.log("results: ", data);

      if (data?.result?.error?.code === "FRU00001") {
        console.error(data?.result?.error);
        alert("로그인이 만료되었습니다.");
        sessionStorage.removeItem("isLogin");
        router.push("/login");
        return;
      }

      setResult(data?.body?.list);
      setCount(data?.body?.count);
      setCurrentPage(page || 1);
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
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center justify-center">
              <DropDownList
                className="mr-2 h-[30px] w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "_search_menuName", NAME: "메뉴명" },
                  { VALUE: "_search_menuId", NAME: "메뉴ID" },
                ]}
                defaultValue={{ VALUE: "_search_menuName", NAME: "메뉴명" }}
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

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Menu URL</span>
              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={form._search_menuUrl}
                id="_search_menuUrl"
                onInput={(e) => setForm({ ...form, _search_menuUrl: e?.currentTarget?.value })}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Top menu ID</span>
              <Input
                className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
                value={form._search_priorMenuId}
                onInput={(e) => setForm({ ...form, _search_priorMenuId: e?.currentTarget?.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              imageUrl="/images/search.gif"
              className="search_btn no-text"
              aria-disabled="false"
              onClick={() => getHandler(currentPage, displayCount)}
            />
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
      </>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <MenuManagementTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
      </div>

      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
    </>
  );
}
