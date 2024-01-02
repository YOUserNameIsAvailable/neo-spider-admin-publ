"use client";

import React, { KeyboardEvent, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";
import { PropertyDbManagementTable } from "@/components/PropertyDbManagementTable";
import { PropertyDBManagementAddModal } from "@/components/modal/PropertyDBManagementAddModal";
import { useRouter } from "next/navigation";
import { validateResult } from "@/utils/util";
import { isExportExcelState } from "@/store";
import { useRecoilState } from "recoil";

export default function Page() {
  const router = useRouter();
  const [isExportExcel, setIsExportExcel] = useRecoilState<any>(isExportExcelState);
  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);
  const [showModal, setShowModal] = React.useState(false); // <10-2> Property DB management - Detail view

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/property-db-management/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await dataJson.json();
      console.log("results: ", data);

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

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <div className="mb-4 flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          Property file export
        </Button>
      </div>
      <PropertyDbManagementTable getHandler={getHandler} result={result} count={count} displayCount={displayCount} />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setShowModal(true);
          }}>
          Create new property group
        </Button>
      </div>
      {showModal && <PropertyDBManagementAddModal setShowModal={setShowModal} />}
    </>
  );
}
