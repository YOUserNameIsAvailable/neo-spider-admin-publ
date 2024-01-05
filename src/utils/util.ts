import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetterOrUpdater } from "recoil";

export const validateResult = (data: any, router: AppRouterInstance) => {
    if (data?.result?.error?.code === "FRU00001") {
        console.error(data?.result?.error);
        alert("로그인이 만료되었습니다.");
        sessionStorage.removeItem("isLogin");
        router.push("/login");
        return false;
    } else if (data?.result?.status !== "success") {
        alert("실행에 실패하였습니다.");
        return false;
    }

    return true;
}

export const exportExcel = async (_export: any, getHandler: (page?: number, displayCount?: number) => void, setIsExportExcel: SetterOrUpdater<any>) => {
    const result = await getHandler(1, 9999999);
    console.log("_exporter.current:", result);

    if (result !== undefined) {
        _export.current.save({ data: result as any[], total: (result as any[]).length });
    }
    setIsExportExcel(false);
};
