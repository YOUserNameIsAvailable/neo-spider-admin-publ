import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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