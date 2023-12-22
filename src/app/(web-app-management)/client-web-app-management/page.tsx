"use client";

import { useEffect, useState } from "react";
import { ClientWebAppMain } from "./client-web-app-management-main";
import { ClientWebAppDetail } from "./client-web-app-management-detail";
import { useRouter } from "next/navigation";
import { validateResult } from "@/utils/util";

export default function Page() {
  const [isDetail, setIsDetail] = useState(false);
  const [menuUrl, setMenuUrl] = useState<string>("");

  console.log("client-web-app-management isDetail: ", isDetail);

  const onRowClick = (event: any) => {
    console.log("client-web-app-management onRowClick: ", event.dataItem);
    setIsDetail((prev) => !prev);
    setMenuUrl(event.dataItem.menuUrl);
  };

  return !isDetail ? (
    <ClientWebAppMain onRowClick={onRowClick} />
  ) : (
    <ClientWebAppDetail setIsDetail={setIsDetail} menuUrl={menuUrl} />
  );
}
