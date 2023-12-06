import React, { useEffect, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridRowClickEvent } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { MyWorkspaceManagementDetailModal } from "./modal/MyWorkspaceManagementDetailModal";
import { MyWorkspaceManagementScriptViewModal } from "./modal/MyWorkspaceManagementScriptViewModal";

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

export function MyWorkSpaceManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [scriptView, setScriptView] = useState<boolean>(false);

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
        selected: currentSelectedState[idGetter(item)],
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
          selected: currentSelectedState[idGetter(item)],
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

  // const _exporter = React.createRef();
  // const excelExport = () => {
  //   if (_exporter.current) {
  //     console.log('_exporter.current:', _exporter.current, dataResult)
  //     _exporter.current.save(dataResult);
  //   }
  // };

  return (
    <>
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
              setShowDetailModal(true);
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
              title="항목"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="full_name"
              title="식별자"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="target"
              title="작업내용"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="결제일련번호"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="운영반영여부"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      X
                    </td>
                  );
                },
              }}
            />
            <Column
              field="budget"
              title="최종수정자ID"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="최종수정일시"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="이행스크립트생성"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
              width={83}
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button
                        size={"small"}
                        className="cell-inside-btn px-4"
                        themeColor={"primary"}
                        onClick={undefined}>
                        생성
                      </Button>
                    </td>
                  );
                },
              }}
            />
            <Column
              field="budget"
              title="이행스크립트 View"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button
                        size={"small"}
                        className="cell-inside-btn px-4"
                        themeColor={"primary"}
                        onClick={() => setScriptView(true)}>
                        View
                      </Button>
                    </td>
                  );
                },
              }}
            />
            <Column
              filterable={false}
              sortable={false}
              field={SELECTED_FIELD}
              // headerSelectionValue={checkHeaderSelectionValue()}
              headerClassName="bg-[#adc6f4] overflow-none"
              className="overflow-none"
              width={30}
            />
            <Column field="budget" title="식별자" sortable={false} headerClassName="justify-center bg-[#adc6f4]" />
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
      </div>
      {scriptView && <MyWorkspaceManagementScriptViewModal setScriptView={setScriptView} />}
      {showDetailModal && <MyWorkspaceManagementDetailModal setShowDetailModal={setShowDetailModal} />}
    </>
  );
}
