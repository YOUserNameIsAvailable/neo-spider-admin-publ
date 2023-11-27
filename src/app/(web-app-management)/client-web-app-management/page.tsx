"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ClientWebAppMain } from "./client-web-app-management-main";
import { ClientWebAppDetail } from "./client-web-app-management-detail";

export default function Page() {
  const [isDetail, setIsDetail] = useState(false);

  console.log("client-web-app-management isDetail: ", isDetail);

  const onRowClick = (event: any) => {
    console.log("client-web-app-management onRowClick: ", event.dataItem);
    setIsDetail((prev) => !prev);
  };

  return !isDetail ? (
    <ClientWebAppMain onRowClick={onRowClick} />
  ) : (
    <ClientWebAppDetail setIsDetail={setIsDetail} />
  );
}
