import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import { ClientWebTable } from "@/components/ClientWebTable";
import { PAGES, SPORTS } from "@/constants";
import { ClientWebAppManagementModal } from "@/components/modal/ClientWebAppManagementModal";

import { validateResult } from "@/utils/util";
import { useRouter } from "next/navigation";

export const ClientWebAppMain: FC<{
  onRowClick?: (event: any) => void;
}> = ({ onRowClick }) => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    _search_menuUrl: null,
    _search_menuName: null,
    _search_custom: null,
    _search_menuId: null,
    _search_siteType: null,
    _search_bankStatusType: null,
    _search_useType: null,
    _search_echannelType: null,
    _search_loginType: null,
    _search_securesingType: null,
    _search_inputType: null,
    _search_inOutUseYn: null,
    _search_bizGroupId: null,
  });

  const [result, setResult] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayCount, setDisplayCount] = useState<number>(20);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false); // <5-3> Client WebApp Manage - stop selection

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getHandler = async (page?: number, displayCount?: number) => {
    try {
      const dataJson = await fetch("/api/spider/clientWebappMng/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: page || 1,
          displayCount: displayCount || 20,
          ...form,
        }),
      });

      const data = await dataJson.json();
      console.log("data: ", data);

      if (validateResult(data, router)) {
        setResult(data?.body?.list);
        setCount(data?.body?.count);
        setCurrentPage(page || 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getHandler(currentPage, displayCount);
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <>
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Enlargement/Reduction
          </button>
        </div>
        <div className="overflow-x-scroll bg-[#dde6f0] px-[10px]">
          <div className="flex justify-between gap-4 bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Menu url</span>
                <Input
                  className="w-48 border border-[#999999]"
                  onInput={(e) => setForm({ ...form, _search_menuUrl: e?.currentTarget?.value })}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Menu name</span>
                <Input
                  className="w-48 border border-[#999999]"
                  onInput={(e) => setForm({ ...form, _search_menuName: e?.currentTarget?.value })}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="mla flex items-center gap-8">
              <div className="flex items-center gap-2">
                <DropDownList
                  size={"small"}
                  data={PAGES}
                  defaultValue={displayCount}
                  style={{ width: "80px" }}
                  onChange={(e) => {
                    setDisplayCount(e.target.value);
                    getHandler(currentPage, e.target.value);
                  }}
                />
                <span className="font-bold text-[#333333]">Items</span>
              </div>

              <Button
                imageUrl="/images/refresh.png"
                className="basic-btn"
                onClick={() => getHandler(currentPage, displayCount)}>
                Find
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">Custom Action class</span>
                <Input
                  className="w-48 border border-[#999999]"
                  onInput={(e) => setForm({ ...form, _search_custom: e?.currentTarget?.value })}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#6f7071]">View number</span>
                <Input
                  className="w-48 border border-[#999999]"
                  onInput={(e) => setForm({ ...form, _search_menuId: e?.currentTarget?.value })}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex w-full flex-wrap items-center gap-4">
              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Site type</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "뱅킹", NAME: "뱅킹전용" },
                    { VALUE: "포탈", NAME: "포탈전용" },
                    { VALUE: "카드", NAME: "카드전용" },
                    { VALUE: "기업", NAME: "기업뱅킹" },
                    { VALUE: "커뮤니티", NAME: "커뮤니티" },
                    { VALUE: "공통", NAME: "공통" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_siteType: e.value.VALUE }))}
                />
              </div>

              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Check status of other banks</span>
                <DropDownList
                  className="h-[30px] min-w-[90px] border bg-[#f6f6f6f6] p-0 text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "Y", NAME: "예" },
                    { VALUE: "N", NAME: "아니오" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_bankStatusType: e.value.VALUE }))}
                />
              </div>
              <div className="flex min-w-[195px] items-center gap-1">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Service state</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] p-0 text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "Y", NAME: "정상" },
                    { VALUE: "N", NAME: "중지" },
                    { VALUE: "A", NAME: "정상+안내메시지" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_useType: e.value.VALUE }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <>
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">e채널 로그 분류코드</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "C", NAME: "단순로그" },
                    { VALUE: "L", NAME: "로그인" },
                    { VALUE: "N", NAME: "신규해지" },
                    { VALUE: "A", NAME: "금액/수수료(마화환산)" },
                    { VALUE: "P", NAME: "상품조회" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_echannelType: e.value.VALUE }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Required</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "Y", NAME: "예" },
                    { VALUE: "N", NAME: "아니오" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_loginType: e.value.VALUE }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">
                  Whether electronic signature is required
                </span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "N", NAME: "전자서명해당없음" },
                    { VALUE: "B", NAME: "뱅킹방식검증" },
                    { VALUE: "C", NAME: "카드방식검증" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_securesingType: e.value.VALUE }))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 overflow-x-scroll border-t border-[#ccc] bg-[#dde6f0] p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">입력유형</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "I", NAME: "이체처리성입력" },
                    { VALUE: "T", NAME: "이체처리" },
                    { VALUE: "N", NAME: "일반" },
                    { VALUE: "C", NAME: "컨텐츠성" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_inputType: e.value.VALUE }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">IN/OUTuse message</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[
                    { VALUE: "", NAME: "전체" },
                    { VALUE: "Y", NAME: "예" },
                    { VALUE: "N", NAME: "아니오" },
                  ]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_inOutUseYn: e.value.VALUE }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap font-bold text-[#6f7071]">Biz class</span>
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  textField="NAME"
                  dataItemKey="VALUE"
                  data={[{ VALUE: "", NAME: "전체" }]}
                  defaultValue={{ VALUE: "", NAME: "전체" }}
                  size={"small"}
                  onChange={(e: any) => setForm((prev: any) => ({ ...prev, _search_bizGroupId: e.value.VALUE }))}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* table */}

      <div className="flex w-[100%]">
        <div className="flex w-[50%] items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <div className="flex w-[90%] justify-end gap-1">
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="w-30 basic-btn mt-2 flex  h-7 items-center justify-start"
            onClick={() => {
              setShowModal(true);
            }}>
            stop selection
          </Button>
          <Button
            imageUrl="/images/dot-right-arrow.png"
            className="w-46 basic-btn mt-2 flex h-7 items-center justify-start">
            Selection guide message
          </Button>
          <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
            Group manage
          </Button>
          <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
            Del select
          </Button>
        </div>
      </div>
      <ClientWebTable
        getHandler={getHandler}
        onRowClick={onRowClick}
        result={result}
        count={count}
        displayCount={displayCount}
      />
      <div className="flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          ADD
        </Button>
      </div>
      {showModal && <ClientWebAppManagementModal setShowModal={setShowModal} />}
    </>
  );
};
