import { useState } from "react";
import { ClientWebAppDetail } from "@/pages/framework/web-app-management/client-web-app-management-detail";
import { ClientWebAppMain } from "@/pages/framework/web-app-management/client-web-app-management-main";

function ClientWebApp() {
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

export function Page() {
  return <ClientWebApp />;
}
