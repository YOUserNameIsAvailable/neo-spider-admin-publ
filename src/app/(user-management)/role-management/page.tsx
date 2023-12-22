"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { RoleManagementTable } from "@/components/RoleManagementTable";
import React, { KeyboardEvent, use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { validateResult } from "@/utils/util";

export default function Page() {
  const router = useRouter();
  const childRef = useRef<any>();
  const [searchText, setSearchText] = useState<string>("");
  const [form, setForm] = useState<any>({
    _search_type: "_search_roleName",
    _search_roleId: null,
    _search_roleName: null,
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/role-management/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
          ...(searchText !== "" && form._search_type === "_search_roleName"
            ? { _search_roleName: searchText }
            : { _search_roleId: searchText }),
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

  const updateHandler = async () => {
    try {
      const dataResult = childRef?.current?.dataResult?.data;
      console.log("dataResult: ", dataResult);
      if (dataResult.length === 0) {
        alert("저장할 데이터가 없습니다.");
        return;
      }

      const modifyData = dataResult
        .filter((item: any) => item.CRUD === "수정" || item.CRUD === "추가" || item.CRUD === "삭제")
        .map((item: any) => {
          const rest = { ...item, CRUD: item.CRUD === "추가" ? "C" : item.CRUD === "수정" ? "U" : "D" };
          return rest;
        });

      const dataJson = await fetch("/api/spider/role-management/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gridData: modifyData,
        }),
      });

      const data = await dataJson.json();
      console.log("data: ", data, data?.result?.httpCode, data?.result?.status, data?.result?.status !== "success");

      if (data?.result?.error?.code === "FRU00001") {
        console.error(data?.result?.error);
        alert("로그인이 만료되었습니다.");
        sessionStorage.removeItem("isLogin");
        router.push("/login");
        return;
      } else if (data?.result?.status !== "success") {
        alert("실행에 실패하였습니다.");
        return;
      }

      alert("저장되었습니다.");
    } catch (err) {
      console.error(err);
    } finally {
      getHandler(currentPage, displayCount);
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
                className="mr-2 h-[30px] w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  { VALUE: "_search_roleName", NAME: "권한명" },
                  { VALUE: "_search_roleId", NAME: "권한ID" },
                ]}
                defaultValue={{ VALUE: "_search_roleName", NAME: "권한명" }}
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
      </>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <RoleManagementTable
          getHandler={getHandler}
          result={result}
          count={count}
          displayCount={displayCount}
          ref={childRef}
        />
      </div>

      <div className="flex justify-end gap-6">
        <div className="flex flex-row gap-1">
          <Button
            imageUrl=""
            className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]"
            onClick={() => childRef.current.addRow()}>
            Add row
          </Button>
          <Button
            imageUrl=""
            className="mt-2 flex h-7 items-center justify-start px-[4px] py-[2px] text-[12px]"
            onClick={() => childRef.current.delRow()}>
            Del row
          </Button>
        </div>
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={updateHandler}>
          Save
        </Button>
      </div>
    </>
  );
}
