"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS, USERS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [result, setResult] = useState<any[]>([]);

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

  return (
    <>
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          {/* JSON 파일 스타일 변경 테스트 */}
          <img  id="user_img" src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <Image id="user_img_upper" src={""} alt="" />
          <span id="condition" className="font-bold text-[#656565]">
            Condition
          </span>
          <a href="#list" id="user_link" className="flex items-center gap-2">Test</a>
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
          <span id="list" className="font-bold text-[#656565]">
            List
          </span>
        </div>
        <UserManagementTable getUsers={getUsers} result={result} />
      </>

      <div className="flex justify-end">
        <Button className="basic-btn mt-2 flex h-7 items-center justify-start">+ ADD</Button>
      </div>
    </>
  );
}
