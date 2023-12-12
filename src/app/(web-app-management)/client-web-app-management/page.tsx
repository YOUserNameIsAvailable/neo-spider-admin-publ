"use client";

import { useEffect, useState } from "react";
import { ClientWebAppMain } from "./client-web-app-management-main";
import { ClientWebAppDetail } from "./client-web-app-management-detail";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
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
  const [isDetail, setIsDetail] = useState(false);

  console.log("client-web-app-management isDetail: ", isDetail);

  const onRowClick = (event: any) => {
    console.log("client-web-app-management onRowClick: ", event.dataItem);
    setIsDetail((prev) => !prev);
  };

  const getHandler = async () => {
    try {
      const dataJson = await fetch("/api/spider/clientWebappMng/list", {
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

  return !isDetail ? (
    <ClientWebAppMain onRowClick={onRowClick} result={result} count={count} displayCount={displayCount} />
  ) : (
    <ClientWebAppDetail setIsDetail={setIsDetail} />
  );
}
