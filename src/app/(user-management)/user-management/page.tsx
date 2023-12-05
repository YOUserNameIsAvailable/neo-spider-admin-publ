"use client";

import React, { use, useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS, USERS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { selTheme } = useTheme();
  const [result, setResult] = useState<any[]>([]);

  console.log(123123, selTheme);

  const getUsers = async () => {
    try {
      const usersJson = await fetch("/api/spider/userMng/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const users = await usersJson.json();
      console.log("users: ", users);

      if (users?.result?.error?.code === "FRU00001") {
        sessionStorage.removeItem("isLogin");
        router.push("/login");
        return;
      }

      setResult(users?.body?.list);
    } catch (err) {
      console.error(err);

      // TODO: remove this after testing
      setResult(USERS);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selTheme && selTheme?.conditionPreview) {
      const id = Object.keys(selTheme)[0] || null;

      if (id) {
        const element = document.getElementById(id);
        if (!element) return;

        console.log(123123, selTheme?.conditionPreview?.style?.color, selTheme?.condition?.text, element.nodeName);

        if (selTheme?.conditionPreview?.style) {
          element.style.color = selTheme?.conditionPreview?.style.color || "";
          element.style.fontWeight = selTheme?.conditionPreview?.style.fontWeight || "";
          element.style.fontSize = selTheme?.conditionPreview?.style.textSize || "";
        }

        if (element.nodeName === "SPAN") {
          element.innerHTML = selTheme?.conditionPreview?.text || selTheme?.condition?.text;
          element.style.textDecorationLine = "underline";
        }
      }
    }
  }, [selTheme]);

  return (
    <>
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span id="condition" className="font-bold text-[#656565]">
            Condition
          </span>
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

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">User status:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Auth:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Rank:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
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
        <UserManagementTable getUsers={getUsers} result={result} />
      </>

      <div className="flex justify-end">
        <Button className="basic-btn mt-2 flex h-7 items-center justify-start">+ ADD</Button>
      </div>
    </>
  );
}
