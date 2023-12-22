import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ConditionRow } from "../ConditionRow";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const MenuManagementModal: FC<{
  getHandler: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  menuId: string;
}> = ({ getHandler, setShowModal, menuId }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 400,
    top: 182,
    width: 760,
    height: 463,
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
    const detailJson = await fetch("/api/spider/menu-management/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId,
      }),
    });

    const detailResult = await detailJson.json();
    const detail = detailResult?.body?.detail;
    console.log("detail: ", detail, detailResult);
    setForm({
      priorMenuId: detail?.priorMenuId || "",
      sortOrder: detail?.sortOrder || "",
      menuName: detail?.menuName || "",
      menuEngName: detail?.menuEngName || "",
      menuUrl: detail?.menuUrl || "",
      menuImage: detail?.menuImage || "",
      displayYn: detail?.displayYn || "Y",
      useYn: detail?.useYn || "Y",
      webAppId: detail?.webAppId || "",
      menuId,
    });
  };

  const updateDetail = async (e: any) => {
    e.preventDefault();
    if (Object.keys(form).length === 0) {
      alert("수정할 내용이 없습니다.");
      return;
    }
    console.log("form: ", form);

    const updatedJson = await fetch("/api/spider/menu-management/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
      }),
    });

    const updated = await updatedJson.json();
    console.log("user updated: ", updated);
    if (updated?.body !== "SUCCESS" && updated?.result?.status) {
    } else {
      getHandler();
    }
  };

  const deleteDetail = async () => {
    const deletedJson = await fetch("/api/spider/menu-management/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId,
      }),
    });

    const deleted = await deletedJson.json();
    console.log("user deleted: ", deleted);
    if (deleted?.body !== "SUCCESS" && deleted?.result?.status) {
    } else {
      getHandler();
    }
  };

  useEffect(() => {
    console.log("menuId: ", menuId);
    if (menuId && menuId !== "") {
      getDetail();
    }
  }, [menuId]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"메뉴상세"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
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
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"메뉴ID"}
                      type="input"
                      value={form?.menuId}
                      disabled={true}
                      isRequired={true}
                      Key="menuId"
                      width="50%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"메뉴명"}
                      type="input"
                      value={form?.menuName}
                      disabled={false}
                      isRequired={true}
                      Key="menuName"
                      width="50%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"영문메뉴명"}
                      type="input"
                      value={form?.menuEngName}
                      disabled={false}
                      isRequired={true}
                      Key="menuEngName"
                      width="50%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"상위메뉴ID"}
                      type="input"
                      value={form?.priorMenuId}
                      disabled={true}
                      isRequired={true}
                      Key="priorMenuId"
                      width="50%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <div className="flex items-center">
                      <Button
                        imageUrl="/images/search.gif"
                        className="mx-1 flex h-[23px] w-[23px] items-center justify-center rounded-[3px] border-[1px] border-[#999999]"
                      />
                      <span className="text-[12px] text-[#FF575E]">(상위메뉴는 검색으로만 등록 가능)</span>
                    </div>
                  </div>
                  <div className={`flex w-full border-[1px] h-${"auto"}`}>
                    <ConditionRow
                      label={"메뉴URL"}
                      type="textarea"
                      value={form?.menuUrl}
                      disabled={false}
                      isRequired={true}
                      Key="menuUrl"
                      width="100%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"메뉴 IMAGE"}
                      type="input"
                      value={form?.menuImage}
                      disabled={false}
                      isRequired={false}
                      Key="menuImage"
                      width="50%%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"정렬순서"}
                      type="input"
                      value={form?.sortOrder}
                      disabled={false}
                      isRequired={true}
                      Key="sortOrder"
                      width="50%%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"auto"}`}>
                    <ConditionRow
                      label={"web App ID"}
                      type="textarea"
                      value={form?.menuUrl}
                      disabled={false}
                      isRequired={false}
                      Key="menuUrl"
                      width="100%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                  <div className={`flex w-full border-[1px] h-${"[30px]"}`}>
                    <ConditionRow
                      label={"출력여부"}
                      type="select"
                      value={{ NAME: form?.displayYn === "Y" ? "사용" : "미사용", VALUE: form?.displayYn }}
                      disabled={false}
                      isRequired={false}
                      listData={[
                        {
                          VALUE: "사용",
                          NAME: "Y",
                        },
                        {
                          VALUE: "미사용",
                          NAME: "N",
                        },
                      ]}
                      Key="displayYn"
                      width="100%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                    <ConditionRow
                      label={"사용여부"}
                      type="select"
                      value={{ NAME: form?.useYn === "Y" ? "사용" : "미사용", VALUE: form?.useYn }}
                      disabled={false}
                      isRequired={false}
                      listData={[
                        {
                          VALUE: "사용",
                          NAME: "Y",
                        },
                        {
                          VALUE: "미사용",
                          NAME: "N",
                        },
                      ]}
                      Key="useYn"
                      width="100%"
                      setForm={setForm}
                      isValidate={isValidate}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn mt-2 flex h-7 items-center justify-start"
                  onClick={() => deleteDetail()}>
                  삭제
                </Button>
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
                    setShowModal(false);
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
