import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { ColumnMenu } from "@/components/ColumnMenu";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { setGroupIds } from "@progress/kendo-react-data-tools";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import moment from "moment";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DATA_ITEM_KEY = "rowSeq";
const SELECTED_FIELD = "selected";
const initialDataState = {
  take: 10,
  skip: 0,
  group: [],
};

const processWithGroups = (data: any, dataState: any) => {
  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group,
  });
  return newDataState;
};

export const CodeGroupManagementDetailModal: FC<{
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  codeGroupId: string;
}> = ({ setShowDetailModal, codeGroupId }) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [group, setGroup] = useState<any>();
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);
  const [position, setPosition] = useState<PositionInterface>({
    left: 307,
    top: 225,
    width: 860,
    height: 640,
  });

  const getDetail = async () => {
    const detailJson = await fetch("/api/spider/codeGroup/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeGroupId,
      }),
    });

    const detailResult = await detailJson.json();
    const detail = detailResult?.body?.detail?.codelist;
    const group = detailResult?.body?.detail?.codegrouplist;

    console.log("detail: ", detail, detailResult);
    setDataResult(detail);
    setData(detail);
    setGroup(group[0]);
  };

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

  const onHeaderSelectionChange = React.useCallback(
    (event: any) => {
      const checkboxElement = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      const newSelectedState: any = {};
      data.forEach((item: any) => {
        newSelectedState[idGetter(item)] = checked;
      });
      setCurrentSelectedState(newSelectedState);
      const newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: checked,
      }));
      const newDataResult = processWithGroups(newData, dataState);
      setDataResult(newDataResult);
    },
    [data, dataState],
  );

  const dataStateChange = (event: any) => {
    setDataResult(process(filteredData, event.dataState));
    setDataState(event.dataState);
  };

  const onSelectionChange = (event: any) => {
    const selectedProductId = event.dataItem.id;

    const newData = data.map((item: any) => {
      if (item.id === selectedProductId) {
        item.selected = !item.selected;
      }
      return item;
    });

    setCurrentSelectedState((prevState: any) => ({
      ...prevState,
      [selectedProductId]: !prevState[selectedProductId],
    }));

    const newDataResult = processWithGroups(newData, dataState);
    setDataResult(newDataResult);
  };

  useEffect(() => {
    console.log(123123, codeGroupId);
    if (codeGroupId && codeGroupId !== "") {
      getDetail();
    }
  }, [codeGroupId]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"코드 정보 상세"}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowDetailModal(false);
        }}>
        <div className="flex flex-col">
          <div className="mb-4 flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">코드 그룹 정보</div>
            </div>
          </div>
          <div className="flex flex-col border-[1px] border-[#dfe1e1]">
            <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
              <div className="flex flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹ID
                </label>
                <Input
                  className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  disabled={true}
                  value={group?.codeGroupId}
                />
              </div>
            </div>
            {/*  */}
            <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹
                </label>
                <Input
                  className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  value={group?.codeGroupName}
                />
              </div>
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  최종수정사용자
                </label>
                <div className="break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">
                  {group?.lastUpdateUserId}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex h-[57px] flex-row">
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹설명
                </label>
                <TextArea
                  className="m-[2px] w-full resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  value={group?.codeGroupDesc}
                />
              </div>
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  최종수정일시
                </label>
                <div className="flex items-center break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">
                  {moment(group?.lastUpdateDtime).format("YYYY/MM/DD HH:mm:ss")}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="my-4 flex w-full flex-row">
            <div className="shrink-1 flex flex-grow items-center text-[#656565]">
              ※Excel데이터 Copy는 Excel복사버튼 클릭하세요!
            </div>
            <div className="flex flex-row gap-[2px]">
              <button
                className="k-button"
                style={{
                  height: "23px",
                  backgroundColor: "#F6F6F6",
                  borderColor: "#656565",
                  borderRadius: "2px",
                  paddingRight: "4px",
                  paddingLeft: "4px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}>
                Excel복사
              </button>
              <button
                className="k-button"
                style={{
                  height: "23px",
                  backgroundColor: "#F6F6F6",
                  borderColor: "#656565",
                  borderRadius: "2px",
                  paddingRight: "4px",
                  paddingLeft: "4px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}>
                행 추가
              </button>
              <button
                className="k-button"
                style={{
                  height: "23px",
                  backgroundColor: "#F6F6F6",
                  borderColor: "#656565",
                  borderRadius: "2px",
                  paddingRight: "4px",
                  paddingLeft: "4px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}>
                선택형 삭제
              </button>
            </div>
          </div>
          {/*  */}
          <Grid
            style={{
              height: "300px",
            }}
            rowHeight={29}
            fixedScroll={true}
            data={dataResult}
            {...dataState}
            expandField="expanded"
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            onDataStateChange={dataStateChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
            onSelectionChange={onSelectionChange}
            groupable={false}>
            <Column
              filterable={false}
              sortable={false}
              field={SELECTED_FIELD}
              headerClassName="bg-[#adc6f4] overflow-none"
              className="overflow-none"
              width={30}
            />
            <Column field="budget" title="CRUD" headerClassName="justify-center bg-[#adc6f4]" width={53} />
            <Column
              field="code"
              headerClassName="justify-center w-[6%]"
              className="w-[6%]"
              title="코드"
              columnMenu={ColumnMenu}
            />
            <Column
              field="codeName"
              headerClassName="justify-center w-[17%]"
              className="w-[17%]"
              title="코드한글명"
              columnMenu={ColumnMenu}
            />
            <Column
              field="budget"
              headerClassName="justify-center w-[17%]"
              className="w-[17%]"
              title="코드영문명"
              columnMenu={ColumnMenu}
            />
            <Column
              field="codeDesc"
              headerClassName="justify-center w-[26%]"
              className="w-[26%]"
              title="코드설명"
              columnMenu={ColumnMenu}
            />{" "}
            <Column
              field="sortOrder"
              headerClassName="justify-center w-[9%]"
              className="w-[9%]"
              title="정렬순서"
              columnMenu={ColumnMenu}
            />
            <Column
              field="useYn"
              headerClassName="justify-center w-[13%]"
              className="w-[13%]"
              title="사용여부"
              columnMenu={ColumnMenu}
            />
          </Grid>
          {/*  */}
          <div className="my-4 flex w-full flex-row justify-end gap-[4px]">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={undefined}>
              전체삭제
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={undefined}>
              저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={undefined}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
