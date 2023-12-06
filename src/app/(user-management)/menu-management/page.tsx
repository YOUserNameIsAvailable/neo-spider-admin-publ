"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { MenuManagementTable } from "@/components/MenuManagementTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [result, setResult] = useState<any[]>([]);

  const getHandler = async () => {
    try {
      const dataJson = await fetch("/api/spider/userMng/menuList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await dataJson.json();
      console.log("results: ", data);

      if (data?.result?.error?.code === "FRU00001") {
        sessionStorage.removeItem("isLogin");
        router.push("/login");
        return;
      }

      setResult(data?.body?.list);
    } catch (err) {
      console.error(err);
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
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "100px" }}
              />

              <Input className="h-[24px] w-[148px] border border-[#999999]" />
            </div>

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Menu URL</span>
              <Input className="h-[24px] w-[148px]" />
            </div>

            <div className="flex items-center">
              <span className="mr-2 whitespace-nowrap font-bold text-[#6f7071]">Top menu ID</span>
              <Input className="h-[24px] w-[148px]" />
            </div>
            <button data-role="button" role="button" className="search_btn no-text" aria-disabled="false">
              <img src="/images/search.gif" alt="" />
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button imageUrl="/images/refresh.png" className="basic-btn">
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
        <MenuManagementTable getHandler={getHandler} result={result} />
      </div>

      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
    </>
  );
}
