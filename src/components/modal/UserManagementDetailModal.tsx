import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { ConditionRow } from "../ConditionRow";
import { useRouter } from "next/navigation";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const UserManagementDetailModal: FC<{
  getHandler: () => void;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  userId: string;
}> = ({ getHandler, setShowDetailModal, userId }) => {
  const router = useRouter();
  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 695,
    height: 330,
  });
  const [form, setForm] = useState<any>({});
  const [isValidate, setIsValidate] = useState<boolean>(false);

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

  const getDetail = async () => {
    const detailJson = await fetch("/api/spider/user-management/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const detailResult = await detailJson.json();
    const detail = detailResult?.body?.detail[0];
    console.log("detail: ", detail);
    setForm({
      org_userId: userId,
      userId: userId,
      roleId: detail?.roleId,
      positionName: detail?.positionName,
      address: detail?.address,
      classNm: detail?.className,
      userName: detail?.userName,
      userSsn: detail?.userSsn,
      phone: detail?.phone,
      email: detail?.email,
      accessIp: detail?.accessIp,
      userStateCode: detail?.userStateCode,
    });
  };

  const updateDetail = async (e: any) => {
    e.preventDefault();
    if (Object.keys(form).length === 0) {
      alert("수정할 내용이 없습니다.");
      return;
    }
    console.log("form: ", form);

    const updatedJson = await fetch("/api/spider/user-management/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        org_userId: userId,
        userId: userId,
        address: null,
      }),
    });

    const updated = await updatedJson.json();
    console.log("user updated: ", updated);
    if (updated?.body !== "SUCCESS" && updated?.result?.status) {
    } else {
      getHandler();
    }
  };

  const resetPassword = async () => {
    const userJson = await fetch("/api/spider/user-management/resetPass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const changedPw = await userJson.json();
    console.log("user changedPw: ", changedPw);
  };

  useEffect(() => {
    if (userId && userId !== "") {
      getDetail();
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
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowDetailModal(false);
        }}>
        <form className="k-form" onSubmit={updateDetail}>
          <fieldset>
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
                      value={form?.userId}
                      disabled={true}
                      isRequired={true}
                      Key="userId"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"사용자명"}
                      type="input"
                      value={form?.userName}
                      disabled={false}
                      isRequired={true}
                      Key="userName"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                    <ConditionRow
                      label={"패스워드"}
                      type="button"
                      value={""}
                      disabled={false}
                      isRequired={false}
                      btnText={"초기화"}
                      btnEvent={resetPassword}
                      Key="password"
                    />
                    <ConditionRow
                      label={"접근 허용 IP"}
                      type="input"
                      value={form?.accessIp}
                      disabled={false}
                      isRequired={true}
                      Key="accessIp"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                    <ConditionRow
                      label={"직번"}
                      type="input"
                      value={form?.userSsn}
                      disabled={false}
                      isRequired={true}
                      Key="userSsn"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"지점코드"}
                      type="input"
                      value={form?.roleId}
                      disabled={false}
                      isRequired={false}
                      Key="roleId"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                    <ConditionRow
                      label={"연락처(-생략)"}
                      type="input"
                      value={form?.phone}
                      disabled={false}
                      isRequired={false}
                      Key="phone"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"이메일"}
                      type="input"
                      value={form?.email}
                      disabled={false}
                      isRequired={false}
                      Key="email"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                    <ConditionRow
                      label={"권한명"}
                      type="select"
                      value={{ NAME: form?.roleName, VALUE: form?.roleId }}
                      disabled={false}
                      isRequired={true}
                      listData={[
                        {
                          VALUE: "cjhan11",
                          NAME: "11111111",
                        },
                        {
                          VALUE: "이12나1",
                          NAME: "1123",
                        },
                        {
                          VALUE: "이12나71",
                          NAME: "1123",
                        },
                        {
                          VALUE: "이121",
                          NAME: "1123",
                        },
                        {
                          VALUE: "이1271",
                          NAME: "1123",
                        },
                        {
                          VALUE: "인11271",
                          NAME: "1123",
                        },
                        {
                          VALUE: "이11271",
                          NAME: "1123",
                        },
                        {
                          VALUE: "123",
                          NAME: "123ss12",
                        },
                        {
                          VALUE: "itdev",
                          NAME: "IT 개발자",
                        },
                        {
                          VALUE: "itadmin",
                          NAME: "IT 관리자",
                        },
                        {
                          VALUE: "cms_brUser",
                          NAME: "cms 지점 사용자",
                        },
                        {
                          VALUE: "fwkMenu2",
                          NAME: "fwkMenu2",
                        },
                        {
                          VALUE: "qq3",
                          NAME: "qq3",
                        },
                        {
                          VALUE: "tes",
                          NAME: "sssss11",
                        },
                        {
                          VALUE: "superadmin",
                          NAME: "super",
                        },
                        {
                          VALUE: "test0105",
                          NAME: "test0105",
                        },
                        {
                          VALUE: "test1",
                          NAME: "test12",
                        },
                        {
                          VALUE: "testtest",
                          NAME: "testtest2",
                        },
                        {
                          VALUE: "rwqwr",
                          NAME: "마스터",
                        },
                        {
                          VALUE: "wooriAdmin",
                          NAME: "우리은행 ADMIN 관리자",
                        },
                        {
                          VALUE: "testrole1",
                          NAME: "테스트 역할1",
                        },
                        {
                          VALUE: "testrole2",
                          NAME: "테스트 역할2",
                        },
                        {
                          VALUE: "testrole3",
                          NAME: "테스트 역할3",
                        },
                        {
                          VALUE: "추가",
                          NAME: "했다",
                        },
                      ]}
                      Key="roleName"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"직급"}
                      type="input"
                      value={form?.classNm}
                      disabled={false}
                      isRequired={false}
                      Key="classNm"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className="flex h-[30px] w-full border-b-[1px] border-r-[1px]">
                    <ConditionRow
                      label={"부서명"}
                      type="input"
                      value={form?.positionName}
                      disabled={false}
                      isRequired={true}
                      Key="positionName"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"사용자 상태"}
                      type="select"
                      value={{ NAME: form?.userStateCodeNm, VALUE: form?.userStateCode }}
                      disabled={false}
                      isRequired={false}
                      listData={[
                        { NAME: "정상", VALUE: 1 },
                        { NAME: "중지", VALUE: 2 },
                        { NAME: "삭제", VALUE: 3 },
                      ]}
                      Key="userStateCodeNm"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  type="submit"
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn mr-1 flex h-7 items-center justify-start"
                  onClick={() => setIsValidate(true)}>
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
          </fieldset>
        </form>
      </Window>
    </>
  );
};
