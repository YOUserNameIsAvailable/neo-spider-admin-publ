import React, { FC, useEffect, useRef, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { MenuManagementModal } from "./modal/MenuManagementModal";
import { isExportExcelState } from "@/store";
import { useRecoilState } from "recoil";

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

export const MenuManagementTable: FC<{
  getHandler: (page?: number, displayCount?: number) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ getHandler, result, count, displayCount }) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const _export = useRef<ExcelExport | null>(null);
  const [isExportExcel, setIsExportExcel] = useRecoilState<any>(isExportExcelState);
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

  const [menuId, setMenuId] = useState(""); // <3-2> Menu management - detail
  const [showModal, setShowModal] = useState(false); // <3-2> Menu management - detail

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
    console.log("dataStateChange: ", event);
    setDataState(event.dataState);
    const page = Math.floor(event.dataState.skip / event.dataState.take) + 1;
    getHandler(page, displayCount);
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

  useEffect(() => {
    setFilteredData(result);
    setDataResult({ data: result, total: count });
    setData(result);

    console.log("result: ", result);
    console.log("dataResult: ", dataResult);
    console.log("data: ", data);
    console.log("dataState: ", dataState);
    console.log("filteredData: ", filteredData);
    console.log("currentSelectedState: ", currentSelectedState);
    console.log("filterValue: ", filterValue);
    console.log("initialDataState: ", initialDataState);
  }, [result]);

  useEffect(() => {
    if (displayCount) {
      console.log("useEffect displayCount: ", displayCount);
      const page = Math.floor(dataState.skip / dataState.take) + 1;
      const skip = (page - 1) * displayCount;

      setDataState((prev) => ({ ...prev, skip: skip, take: displayCount }));
    }
  }, [displayCount]);

  useEffect(() => {
    if (isExportExcel && _export.current) {
      const exportExcel = async (_export: any) => {
        const result = await getHandler(1, 9999999);
        console.log("_exporter.current:", dataResult, result);

        if (result !== undefined) {
          _export.current.save({ data: result as any[], total: (result as any[]).length });
        }
        setIsExportExcel(false);
      };
      exportExcel(_export);
    }
  }, [isExportExcel]);

  return (
    <>
      <div>
        <ExcelExport fileName="MenuManagement" ref={_export}>
          <Grid
            style={{
              height: "500px",
            }}
            pageable={{
              pageSizes: false,
              buttonCount: 10,
            }}
            {...dataState}
            data={dataResult}
            total={count || 0}
            expandField="expanded"
            resizable={true}
            onDataStateChange={dataStateChange}
            onRowClick={(e) => {
              setMenuId(e.dataItem.menuId);
              setShowModal(true);
            }}>
            <Column
              field="menuId"
              title="Menu ID"
              headerClassName="justify-center col-width20per"
              className="col-width20per"
            />
            <Column
              field="menuName"
              title="Menu Name"
              headerClassName="justify-center col-width30per"
              className="col-width30per"
            />
            <Column
              field="menuUrl"
              title="메뉴 URL"
              headerClassName="justify-center col-width40per"
              className="col-width40per"
            />
            <Column
              field="displayYn"
              title="Display"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps}>
                      <span className="flex w-full justify-center">
                        {dataItem.displayYn === "Y" ? (
                          <img src="/images/radio-on-button-green.png" className="h-5 w-5" />
                        ) : (
                          <img src="/images/radio-on-button-red.png" className="h-5 w-5" />
                        )}
                      </span>
                    </td>
                  );
                },
              }}
              headerClassName="justify-center col-width10per"
              className="col-width10per"
            />
            <Column
              field="useYn"
              title="Use"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps}>
                      <span className="flex w-full justify-center">
                        {dataItem.useYn === "Y" ? (
                          <img src="/images/radio-on-button-green.png" className="h-5 w-5" />
                        ) : (
                          <img src="/images/radio-on-button-red.png" className="h-5 w-5" />
                        )}
                      </span>
                    </td>
                  );
                },
              }}
              headerClassName="justify-center col-width10per"
              className="col-width10per"
            />
            <Column
              title="Sub Menu"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"}>
                        Find
                      </Button>
                    </td>
                  );
                },
              }}
              headerClassName="justify-center"
              width={100}
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
      </div>

      {showModal && <MenuManagementModal getHandler={getHandler} setShowModal={setShowModal} menuId={menuId} />}
    </>
  );
};
