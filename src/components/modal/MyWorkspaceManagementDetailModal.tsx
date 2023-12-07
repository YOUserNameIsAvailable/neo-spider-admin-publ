import React, { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn as Column, GridItemChangeEvent, GridRowClickEvent } from "@progress/kendo-react-grid";
import { EMPLOYEES } from "@/constants";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { setGroupIds } from "@progress/kendo-react-data-tools";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DATA_ITEM_KEY = "id";
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

const initialDataWithEditField = EMPLOYEES.map((item) => ({ ...item, inEdit: false }));

export const MyWorkspaceManagementDetailModal: FC<{
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowDetailModal }) => {
  const idGetter = getter("id");
  const [filteredData, setFilteredData] = React.useState(initialDataWithEditField);
  const [data, setData] = React.useState(filteredData);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [resultState, setResultState] = React.useState(
    processWithGroups(
      EMPLOYEES.map((item: any) => ({
        ...item,
        selected: currentSelectedState[idGetter(item)],
        // inEdit: item.id === editID,
      })),
      initialDataState,
    ),
  );

  const rowClick = (event) => {
    const newData = dataResult.data.map((item) => {
      console.log("event:", event.dataItem.id, item.id === event.dataItem.id);
      if (item.id === event.dataItem.id) {
        return { ...item, inEdit: true };
      }
      return item;
    });
    setDataResult({
      data: newData,
      total: dataResult.total,
    });
  };

  const itemChange = (event) => {
    console.log("itemChangeitemChange: ", itemChange);
    const inEditID = event.dataItem.id;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.id === inEditID
        ? {
            ...item,
            [field]: event.value,
          }
        : item,
    );
    setDataResult(newData);
  };

  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 1000,
    height: 700,
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
    console.log("onSelectionChangeonSelectionChange: ", event.dataItem.id);
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
    console.log("dataResult: ", dataResult);
  }, [dataResult]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        className="workspace-window"
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowDetailModal(false);
        }}>
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between bg-[#cdd5eb] p-4">
            <div className=" text-[17px] font-bold text-[#656565]">전문 수정</div>
            <div className="actions">
              <Button imageUrl="/images/btn_excel_off.gif" className="excel-btn" />
              <Button imageUrl="/images/btn_print_off.gif" className="ml-px-10 print-btn" />
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">전문 정보</div>
              <Button className="ml-4 bg-neutral-50 p-2" onClick={undefined}>
                Expand / Colapse
              </Button>
            </div>
            {/*  */}
            <div className="mt-4 flex flex-col border-[1px] border-[#dfe1e1]">
              <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                <div className="flex w-[40%] flex-row items-center">
                  <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    기관명
                  </label>
                  <DropDownList
                    style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                    disabled={true}
                  />
                  <span className="required">*</span>
                </div>
                <div className="flex w-[60%] flex-row items-center">
                  <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    상위전문ID
                  </label>
                  <DropDownList
                    style={{ width: 250, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                <div className="flex w-[40%] flex-row items-center">
                  <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    전문ID
                  </label>
                  <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  <span className="required">*</span>
                </div>
                <div className="flex w-[60%] flex-row items-center">
                  <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    전문명
                  </label>
                  <input className="my-[2px] ml-[2px] w-[190px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  <span className="required">*</span>
                </div>
              </div>
              {/*  */}
              <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                <div className="flex w-[40%] flex-row items-center">
                  <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    전문설명
                  </label>
                  <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                </div>
                <div className="flex w-[60%] flex-row items-center">
                  <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    로그레벨
                  </label>
                  <DropDownList
                    style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                <div className="flex w-[40%] flex-row items-center">
                  <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    헤더전문여부
                  </label>
                  <DropDownList
                    style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                </div>
                <div className="flex w-[60%] flex-row items-center">
                  <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    전문유형/요청응답구분
                  </label>
                  <DropDownList
                    style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                  <span className="required">*</span>
                  /
                  <DropDownList
                    style={{ width: 80, marginRight: "2px", fontSize: "12px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px] ml-[8px]"
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex h-[28px] flex-row justify-between">
                <div className="flex w-[40%] flex-row items-center">
                  <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    사전로딩여부
                  </label>
                  <DropDownList
                    style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                </div>
                <div className="flex w-[60%] flex-row items-center">
                  <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                    업무분류
                  </label>
                  <DropDownList
                    style={{ width: "100%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                    size={"small"}
                    data={["선택 안 함", "안전", "주의", "경계"]}
                    defaultValue={"선택 안 함"}
                    className="my-[2px]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">전문 상세정보</div>
              <Button className="ml-4 bg-neutral-50 p-2" onClick={undefined}>
                Expand / Colapse
              </Button>
              <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  엑셀저장
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  헤더전문포함조회
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  필드풀 검증
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  다국어 검증
                </Button>
              </div>
            </div>
            {/*  */}
            <div className="mb-4 flex flex-row items-center">
              <div className="flex items-center">※Excel Copy &gt;&gt; Excel복사버튼 클릭하세요</div>
              <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                  Excel복사
                </Button>
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                  유사전문복사
                </Button>
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                  테이블
                </Button>
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                  행 추가
                </Button>
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                  선택형 삭제
                </Button>
              </div>
            </div>
            {/*  */}
            <ExcelExport>
              <Grid
                style={{
                  height: "300px",
                }}
                pageable={{
                  pageSizes: true,
                }}
                data={dataResult}
                sortable={true}
                total={resultState.total}
                onDataStateChange={dataStateChange}
                {...dataState}
                expandField="expanded"
                dataItemKey={DATA_ITEM_KEY}
                selectedField={SELECTED_FIELD}
                onHeaderSelectionChange={onHeaderSelectionChange}
                onSelectionChange={onSelectionChange}
                groupable={false}
                editField="inEdit"
                onRowClick={rowClick}
                onItemChange={itemChange}>
                <Column
                  filterable={false}
                  sortable={false}
                  field={SELECTED_FIELD}
                  // headerSelectionValue={checkHeaderSelectionValue()}
                  headerClassName="bg-[#adc6f4] overflow-none"
                  className="overflow-none"
                  width={30}
                />
                <Column
                  field="budget"
                  title="CRUD"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="full_name"
                  title="순번"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="target"
                  title="전문필드명"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="data타입"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="data길이"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="정렬기준"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="특이사항"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="필수여부"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                  width={83}
                />
                <Column
                  field="budget"
                  title="스케일"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="삽입문자"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="입력구분"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="코드그룹"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="코드맵핑"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
                <Column
                  field="budget"
                  title="초기값"
                  sortable={false}
                  headerClassName="justify-center bg-[#adc6f4]"
                  editor="text"
                />
              </Grid>
            </ExcelExport>
            {/*  */}
            <div className="shrink-1 mt-4 flex flex-grow flex-row items-center justify-end gap-2">
              <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                삭제
              </Button>
              <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                저장
              </Button>
              <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                목록
              </Button>
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};
