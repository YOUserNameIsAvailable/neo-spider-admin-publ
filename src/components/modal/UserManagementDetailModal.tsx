import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

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
    width: 760,
    height: 330,
  });

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

  const updateUserDetail = async () => {
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
              {[
                {
                  firstId: "사용자ID",
                  secondId: "사용자명",
                  type: "input",
                  dot1: true,
                  dot2: true,
                  disabled: true,
                  firstValue: result?.userId,
                  secondValue: result?.userName,
                },
                {
                  firstId: "패스워드",
                  secondId: "접근 허용 IP",
                  type: "input2",
                  dot1: false,
                  dot2: true,
                  disabled: false,
                  firstValue: null,
                  secondValue: result?.accessIp,
                },
                {
                  firstId: "직번",
                  secondId: "지점코드",
                  type: "input",
                  dot1: true,
                  dot2: false,
                  disabled: false,
                  firstValue: result?.userSsn,
                  secondValue: result?.roleId,
                },
                {
                  firstId: "연락처(-생략)",
                  secondId: "이메일",
                  type: "input",
                  dot1: false,
                  dot2: false,
                  disabled: false,
                  firstValue: result?.phone,
                  secondValue: result?.email,
                },
                {
                  firstId: "권한명",
                  secondId: "직급",
                  type: "select",
                  dot1: true,
                  dot2: false,
                  disabled: false,
                  firstValue: result?.roleName,
                  secondValue: result?.className,
                },
                {
                  firstId: "부서명",
                  secondId: "사용자 상태",
                  type: "select2",
                  dot1: true,
                  dot2: false,
                  disabled: false,
                  firstValue: result?.positionName,
                  secondValue: result?.userStateCodeNm,
                },
              ].map((v) => {
                return (
                  <div key={v.firstId} className="flex h-[30px] w-full  border-[1px]">
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                        {v.firstId}
                      </label>
                      {v.type === "input2" ? (
                        <Button className="basic-btn mt-2 flex h-7 items-center justify-start">초기화</Button>
                      ) : v.type === "select" ? (
                        <DropDownList
                          style={{ width: "40%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                          size={"small"}
                          data={["선택 안 함", "안전", "주의", "경계"]}
                          defaultValue={"선택 안 함"}
                          value={v.firstValue}
                        />
                      ) : (
                        <input
                          className="ml-[2px] mr-[2px] w-[45%] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                          disabled={v.disabled}
                          defaultValue={v.firstValue}
                        />
                      )}
                      {v.dot1 && <span className="required">*</span>}
                    </div>
                    <div className="flex w-[50%] items-center">
                      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec]  p-1  text-[12px] text-black">
                        {v.secondId}
                      </label>
                      {v.type === "select" || v.type === "select2" ? (
                        <DropDownList
                          style={{ width: "40%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                          size={"small"}
                          data={["선택 안 함", "안전", "주의", "경계"]}
                          defaultValue={"선택 안 함"}
                          value={v.secondValue}
                        />
                      ) : (
                        <input
                          className="ml-[2px] mr-[2px] w-[45%] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                          value={v.secondValue}
                        />
                      )}
                      {v.dot2 && <span className="required">*</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button
              style={{
                background: "url(./images/btn_error_report_close.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-[23px] w-[54px]"
              onClick={() => {
                setShowDetailModal(false);
              }}
            />
            <button
              style={{
                background: "url(./images/btn_error_report_save.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-[23px] w-[54px]"
            />
          </div>
        </div>
      </Window>
    </>
  );
};
