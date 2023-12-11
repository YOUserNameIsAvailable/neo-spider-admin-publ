"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { SPORTS, PAGES } from "@/constants";
import { ErrorCodeTable } from "@/components/ErrorCodeTable";
import { ErrorCodeManagementAddModal } from "@/components/modal/ErrorCodeManagementAddModal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [form, setForm] = useState<any>({
    _search_type: "_search_errorCode",
    _search_errorTitle: null,
    _search_errorCode: null,
    _search_trxId: null,
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/errCodeMng/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
          ...(searchText !== "" && form._search_type === "_search_errorCode"
            ? { _search_errorCode: searchText }
            : { _search_errorTitle: searchText }),
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
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Enlargement/Reduction
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex w-full flex-row items-center">
            <DropDownList
              className="mr-2 h-[30px] w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
              textField="NAME"
              dataItemKey="VALUE"
              data={[
                { VALUE: "_search_errorCode", NAME: "오류코드" },
                { VALUE: "_search_errorTitle", NAME: "오류제목" },
              ]}
              defaultItem={{ VALUE: "_search_errorCode", NAME: "오류코드" }}
              size={"small"}
              onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_type: e.value.VALUE }))}
            />

            <Input
              className="h-[24px] w-[148px] border border-[#999999]"
              value={searchText}
              onInput={(e) => setSearchText(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="ml-2 flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">Error handler</span>
              <DropDownList
                className="mr-2 h-[30px] w-[200px] border bg-[#f6f6f6f6] text-[#656565]"
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
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_userStateCode: e.value.VALUE }))}
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
        {/* exandable */}
        {isExpanded ? (
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Tran name</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <ErrorCodeTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setShowModal(true);
          }}>
          ADD
        </Button>
      </div>
      {showModal && <ErrorCodeManagementAddModal setShowModal={setShowModal} />}
    </>
  );
}
