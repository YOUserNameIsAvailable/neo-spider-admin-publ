import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { ConditionRow } from "../ConditionRow";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const UserManagementDetailModal: FC<{
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
}> = ({ setShowDetailModal, userId }) => {
  const [result, setResult] = useState<any>({});
  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 695,
    height: 330,
  });
  const [form, setForm] = useState<any>({});

  const handleMove = (event: WindowMoveEvent) => {
    setPosition({ ...position, left: event.left, top: event.top });
  };

  const handleResize = (event: WindowMoveEvent) => {
    setPosition({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
  };

  const getUserDetail = async () => {
    const userJson = await fetch("/api/spider/userMng/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const user = await userJson.json();
    console.log("user: ", user?.body?.detail[0]);
    setResult(user?.body?.detail[0]);
  };

  const updateUserDetail = async (e: any) => {
    const userJson = await fetch("/api/spider/userMng/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const user = await userJson.json();
    console.log("user: ", user?.body?.detail[0]);
    setResult(user?.body?.detail[0]);
  };

  const resetPassword = async () => {
    const userJson = await fetch("/api/spider/userMng/resetPass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const user = await userJson.json();
    console.log("user: ", user?.body?.detail[0]);
    setResult(user?.body?.detail[0]);
  };

  useEffect(() => {
    if (userId !== "") {
      getUserDetail();
    }
  }, [userId]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"사용자 상세"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowDetailModal(false);
        }}>
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">상세정보</div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px] border-t-[1px]">
                <ConditionRow
                  label={"사용자ID"}
                  type="input"
                  value={result?.userId}
                  disabled={true}
                  isDot={true}
                  Key="userId"
                  setForm={setForm}
                />
                <ConditionRow
                  label={"사용자명"}
                  type="input"
                  value={result?.userName}
                  disabled={false}
                  isDot={true}
                  Key="userName"
                  setForm={setForm}
                />
              </div>
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                <ConditionRow
                  label={"패스워드"}
                  type="button"
                  value={""}
                  disabled={false}
                  isDot={false}
                  btnText={"초기화"}
                  btnEvent={resetPassword}
                  Key="password"
                />
                <ConditionRow
                  label={"접근 허용 IP"}
                  type="input"
                  value={result?.accessIp}
                  disabled={false}
                  isDot={true}
                  Key="accessIp"
                  setForm={setForm}
                />
              </div>
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                <ConditionRow
                  label={"직번"}
                  type="input"
                  value={result?.userSsn}
                  disabled={false}
                  isDot={true}
                  Key="userSsn"
                  setForm={setForm}
                />
                <ConditionRow
                  label={"지점코드"}
                  type="input"
                  value={result?.roleId}
                  disabled={false}
                  isDot={false}
                  Key="roleId"
                  setForm={setForm}
                />
              </div>
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                <ConditionRow
                  label={"연락처(-생략)"}
                  type="input"
                  value={result?.phone}
                  disabled={false}
                  isDot={false}
                  Key="phone"
                  setForm={setForm}
                />
                <ConditionRow
                  label={"이메일"}
                  type="input"
                  value={result?.email}
                  disabled={false}
                  isDot={false}
                  Key="email"
                  setForm={setForm}
                />
              </div>
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                <ConditionRow
                  label={"권한명"}
                  type="select"
                  value={result?.roleName}
                  disabled={false}
                  isDot={true}
                  listData={["관리자", "사용자"]}
                  Key="roleName"
                  setForm={setForm}
                />
                <ConditionRow
                  label={"직급"}
                  type="input"
                  value={result?.className}
                  disabled={false}
                  isDot={false}
                  listData={["사원", "대리", "과장", "차장", "부장", "이사", "상무", "전무", "사장"]}
                  Key="className"
                  setForm={setForm}
                />
              </div>
              <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                <ConditionRow
                  label={"부서명"}
                  type="input"
                  value={result?.positionName}
                  disabled={false}
                  isDot={true}
                  Key="positionName"
                  setForm={setForm}
                />
                <ConditionRow
                  label={"사용자 상태"}
                  type="select"
                  value={result?.userStateCodeNm}
                  disabled={false}
                  isDot={false}
                  listData={["정상", "중지", "삭제"]}
                  Key="userStateCodeNm"
                  setForm={setForm}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mr-1 flex h-7 items-center justify-start"
              onClick={updateUserDetail}>
              저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn  flex h-7 items-center justify-start"
              onClick={() => {
                setShowDetailModal(false);
              }}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};