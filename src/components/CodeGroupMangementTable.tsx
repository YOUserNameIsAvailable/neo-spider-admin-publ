import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridRowClickEvent } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";

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

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function CodeGroupManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 860,
    height: 640,
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

  const onFilterChange = (ev: any) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = EMPLOYEES.filter((item: any) => {
      let match = false;
      for (const property in item) {
        if (item[property].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
          match = true;
        }
        if (item[property].toLocaleDateString && item[property].toLocaleDateString().indexOf(value) >= 0) {
          match = true;
        }
      }
      return match;
    });
    setFilteredData(newData);
    let clearedPagerDataState = {
      ...dataState,
      take: 8,
      skip: 0,
    };
    let processedData = process(newData, clearedPagerDataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
    setData(newData);
  };

  const [resultState, setResultState] = React.useState(
    processWithGroups(
      EMPLOYEES.map((item: any) => ({
        ...item,
        ["selected"]: currentSelectedState[idGetter(item)],
      })),
      initialDataState,
    ),
  );

  const dataStateChange = (event: any) => {
    setDataResult(process(filteredData, event.dataState));
    setDataState(event.dataState);
  };

  const onExpandChange = React.useCallback(
    (event: any) => {
      const newData = [...dataResult.data];
      const item = event.dataItem;
      if (item.groupId) {
        const targetGroup = newData.find((d) => d.groupId === item.groupId);
        if (targetGroup) {
          targetGroup.expanded = event.value;
          setDataResult({
            ...dataResult,
            data: newData,
          });
        }
      } else {
        item.expanded = event.value;
        setDataResult({
          ...dataResult,
          data: newData,
        });
      }
    },
    [dataResult],
  );

  const setSelectedValue = (data: any) => {
    let newData = data.map((item: any) => {
      if (item.items) {
        return {
          ...item,
          items: setSelectedValue(item.items),
        };
      } else {
        return {
          ...item,
          ["selected"]: currentSelectedState[idGetter(item)],
        };
      }
    });
    return newData;
  };

  const newData = setExpandedState({
    data: setSelectedValue(resultState.data),
    collapsedIds: [],
  });

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

  const getNumberOfItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfItems(item.items);
      } else {
        count++;
      }
    });
    return count;
  };

  const getNumberOfSelectedItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfSelectedItems(item.items);
      } else {
        count = count + (item.selected == true ? 1 : 0);
      }
    });
    return count;
  };

  const handleButtonClick = (row: any) => {
    // Handle button click for the specific row
    console.log(`Button clicked for user: ${row.full_name}`);
  };

  const renderButtonCell = (props: any) => (
    <td>
      <button onClick={() => handleButtonClick(props.dataItem)}>Click me</button>
    </td>
  );

  return (
    <div>
      <ExcelExport>
        <Grid
          style={{
            height: "500px",
          }}
          pageable={{
            pageSizes: true,
          }}
          onRowClick={(event: GridRowClickEvent) => {
            setVisible(true);
          }}
          data={dataResult}
          sortable={true}
          total={resultState.total}
          onDataStateChange={dataStateChange}
          {...dataState}
          onExpandChange={onExpandChange}
          expandField="expanded"
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          onHeaderSelectionChange={onHeaderSelectionChange}
          onSelectionChange={onSelectionChange}
          groupable={false}>
          <Column
            field="budget"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
            title="Code group ID"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            headerClassName="justify-center col-width100per"
            className="col-width100per"
            title="Code group name"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            headerClassName="justify-center col-width200per"
            className="col-width200per"
            title="Code desc."
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
            title="Biz class"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
            title="Code count"
            columnMenu={ColumnMenu}
          />
        </Grid>
      </ExcelExport>
      <GridPDFExport margin="1cm">
        <Grid
          style={{
            height: "500px",
          }}
          pageable={{
            pageSizes: true,
          }}
          data={dataResult}
          sortable={false}
          total={resultState.total}
          onDataStateChange={dataStateChange}
          {...dataState}
          onExpandChange={onExpandChange}
          expandField="expanded"
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          onHeaderSelectionChange={onHeaderSelectionChange}
          onSelectionChange={onSelectionChange}
          groupable={true}></Grid>
      </GridPDFExport>
      {visible && (
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
              setVisible(false);
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
                    <input
                      className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                      disabled={true}
                    />
                  </div>
                </div>
                {/*  */}
                <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      코드그룹
                    </label>
                    <input className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      최종수정사용자
                    </label>
                    <div className="break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">Admin</div>
                  </div>
                </div>
                {/*  */}
                <div className="flex h-[57px] flex-row">
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      코드그룹설명
                    </label>
                    <textarea className="m-[2px] w-full resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                  <div className="flex w-[50%] flex-row">
                    <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      최종수정일시
                    </label>
                    <div className="flex items-center break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]">
                      Admin
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
                className="h-[88%]"
                rowHeight={29}
                fixedScroll={true}
                data={dataResult}
                selectedField={SELECTED_FIELD}>
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
                  field="budget"
                  headerClassName="justify-center w-[6%]"
                  className="w-[6%]"
                  title="코드"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="budget"
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
                  field="budget"
                  headerClassName="justify-center w-[26%]"
                  className="w-[26%]"
                  title="코드설명"
                  columnMenu={ColumnMenu}
                />{" "}
                <Column
                  field="budget"
                  headerClassName="justify-center w-[9%]"
                  className="w-[9%]"
                  title="정렬순서"
                  columnMenu={ColumnMenu}
                />
                <Column
                  field="budget"
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
      )}
    </div>
  );
}
