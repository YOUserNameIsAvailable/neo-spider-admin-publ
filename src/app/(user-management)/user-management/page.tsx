"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS, USERS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserManagementAddModal } from "@/components/modal/UserManagementAddModal";

export default function Page() {
  const router = useRouter();
  const [searchTypes, setSearchTypes] = useState<any>({
    _search_userType: "_search_userName",
    _search_userId: null,
    _search_userName: null,
    _search_state: null,
    _search_roleId: null,
    _search_class: null,
  });
  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/userMng/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...searchTypes,
        }),
      });

      const data = await dataJson.json();
      console.log("data: ", data);

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
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          {/* JSON 파일 스타일 변경 테스트 */}
          <img id="user_img" src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <Image id="user_img_upper" src={""} alt="" />
          <span id="condition" className="font-bold text-[#656565]">
            Condition
          </span>
          <a href="#list" id="user_link" className="flex items-center gap-2">
            Test
          </a>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
              textField="NAME"
              dataItemKey="VALUE"
              data={[
                { VALUE: "_search_userName", NAME: "사용자명" },
                { VALUE: "_search_userId", NAME: "사용자ID" },
              ]}
              defaultItem={{ VALUE: "_search_userName", NAME: "사용자명" }}
              size={"small"}
              onChange={(e) => setSearchTypes((prev: any) => ({ ...prev, _search_userType: e.target.value }))}
            />

            <Input
              className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]"
              onChange={(e) =>
                setSearchTypes((prev: any) =>
                  searchTypes._search_userType === "_search_userId"
                    ? { ...prev, _search_userId: e.target.value }
                    : { ...prev, _search_userName: e.target.value },
                )
              }
              onKeyDown={handleKeyDown}
            />

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">User status:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[
                  {
                    VALUE: null,
                    NAME: "전체",
                  },
                  {
                    VALUE: "1",
                    NAME: "정상",
                  },
                  {
                    VALUE: "2",
                    NAME: "삭제",
                  },
                  {
                    VALUE: "3",
                    NAME: "정지",
                  },
                ]}
                defaultItem={{ VALUE: null, NAME: "전체" }}
                size={"small"}
                onChange={(e) => setSearchTypes((prev: any) => ({ ...prev, _search_state: e.target.value }))}
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
                onChange={(e) => setSearchTypes((prev: any) => ({ ...prev, _search_roleId: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Rank:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={["사장", "전무", "부장", "차장", "과장"]}
                defaultValue="전체"
                filterable={true}
                onChange={(e) => setSearchTypes((prev: any) => ({ ...prev, _search_class: e.target.value }))}
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

      {/* table */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span id="list" className="font-bold text-[#656565]">
            List
          </span>
        </div>
        <UserManagementTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
      </>

      <div className="flex justify-end">
        <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={() => setShowAddModal(true)}>
          + ADD
        </Button>
      </div>
      {showAddModal && <UserManagementAddModal setShowAddModal={setShowAddModal} userId={""} />}
    </>
  );
}
