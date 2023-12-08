"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { ErrorCodeTable } from "@/components/ErrorCodeTable";
import { ErrorCodeManagementAddModal } from "@/components/modal/ErrorCodeManagementAddModal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<any[]>([]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async () => {
    try {
      const dataJson = await fetch("/api/spider/errCodeMng/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (err) {
      console.error(err);
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
              className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
              style={{ width: "148px" }}
            />

            <Input className="h-[24px] w-[148px]" />

            <div className="ml-2 flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">Error handler</span>
              <DropDownList
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "200px" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="h-[24px]" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button svgIcon={searchIcon}>Find</Button>
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
      <ErrorCodeTable getHandler={getHandler} result={result} />
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
