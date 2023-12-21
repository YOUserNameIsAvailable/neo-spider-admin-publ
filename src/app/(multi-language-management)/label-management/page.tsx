"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { PAGES, SPORTS } from "@/constants";
import { LabelManagementTable } from "@/components/LabelManagementTable";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { LabelManagementAddModal } from "@/components/modal/LabelManagementAddModal";
import { useRouter } from "next/navigation";
import { validateResult } from "@/utils/util";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [form, setForm] = useState<any>({
    _search_type: "_search_labelId",
    _search_labelType: null,
    _search_labelDesc: null,
    _search_labelId: null,
  });
  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [showModal, setShowModal] = useState(false);

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/label/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
          ...(searchText !== "" && form._search_type === "_search_labelId"
            ? { _search_labelId: searchText }
            : { _search_labelDesc: searchText }),
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
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
          <div className="flex items-center gap-4">
            <DropDownList
              className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
              textField="NAME"
              dataItemKey="VALUE"
              data={[
                { VALUE: "_search_labelId", NAME: "LABEL ID" },
                { VALUE: "_search_labelDesc", NAME: "LABEL 설명" },
              ]}
              defaultValue={{ VALUE: "_search_labelId", NAME: "LABEL ID" }}
              size={"small"}
              onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_type: e.value.VALUE }))}
            />
            <div className="flex items-center gap-2">
              <Input
                className="h-[24px] w-[148px] border border-[#999999]"
                value={searchText}
                onInput={(e) => setSearchText(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold">LABEL Distinction</span>
              <DropDownList
                className="h-[30px] min-w-[148px] border bg-[#f6f6f6f6] text-[#656565]"
                textField="NAME"
                dataItemKey="VALUE"
                data={[]}
                defaultValue={{}}
                size={"small"}
                onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_labelType: e.value.VALUE }))}
              />{" "}
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

      <div className="flex w-[100%]">
        <div className="flex w-[65%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
      </div>
      <LabelManagementTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
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
      {showModal && <LabelManagementAddModal setShowModal={setShowModal} />}
    </>
  );
}
