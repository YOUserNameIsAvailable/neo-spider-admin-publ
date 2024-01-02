import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, getSelectedState, GridNoRecords } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { PropertyDBManagementDetailModal } from "./modal/PropertyDBManagementDetailModal";
import { PropertyDBManagementWASModal } from "./modal/PropertyDBManagementWASModal";
import { useRecoilState } from "recoil";
import { isExportExcelState } from "@/store";

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

export const PropertyDbManagementTable: FC<{
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

  const [showModal, setShowModal] = React.useState(false); // <10-2> Property DB management - Detail view
  const [WASModal, setWASModal] = React.useState(false); // <10-3> Property DB management - setting value per Was

  const dataStateChange = (event: any) => {
    console.log("dataStateChange: ", event);
    setDataState(event.dataState);
    const page = Math.floor(event.dataState.skip / event.dataState.take) + 1;
    getHandler(page, displayCount);
  };

  const onExpandChange = useCallback(
    (event: any) => {
      console.log("onExpandChange: ", event);
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

  const onHeaderSelectionChange = useCallback(
    (event: any) => {
      console.log("onHeaderSelectionChange: ", event);
      const checkboxElement = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      const newSelectedState: any = {};
      data.forEach((item: any) => {
        newSelectedState[idGetter(item)] = checked;
      });
      setCurrentSelectedState(newSelectedState);
      const newData = data.map((item: any) => ({
        ...item,
        [SELECTED_FIELD]: checked,
      }));
      const newDataResult = processWithGroups(newData, dataState);
      setDataResult(newDataResult);
    },
    [data, dataState],
  );

  const onSelectionChange = (event: any) => {
    console.log("onSelectionChange: ", event);
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

  const renderButtonCell = (dataItem: any, props: any, text: string, event?: () => void) => (
    <td {...props.tdProps} style={{ textAlign: "center" }}>
      <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"} onClick={event}>
        {text}
      </Button>
    </td>
  );

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
        <ExcelExport fileName="PropertyDbManagement" ref={_export}>
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
            onRowClick={() => {
              setShowModal(true);
            }}>
            <GridNoRecords>
              <div id="noRecord" className="popup_pop_norecord">
                No Record Found.
              </div>
            </GridNoRecords>
            <Column
              field="propertyGroupId"
              title="Property Group ID"
              headerClassName="justify-center bg-[#adc6f4] col-width25per"
              className="col-width25per"
            />
            <Column
              field="codeName"
              title="Property group name"
              headerClassName="justify-center bg-[#adc6f4] col-width25per"
              className="col-width25per"
            />
            <Column
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              headerCell={() => <div className="text-center font-bold">Detail view</div>}
              cell={(props) => (
                <td className="col-width15per" style={{ textAlign: "center" }}>
                  <Button
                    className="td-btn"
                    onClick={() => {
                      setShowModal(true);
                    }}>
                    Detail view
                  </Button>
                </td>
              )}
            />
            <Column
              headerClassName="justify-center bg-[#adc6f4] col-width20per"
              headerCell={() => <div className="text-center font-bold">Setting vaolue per WAS</div>}
              cell={(props) => (
                <td className="col-width20per" style={{ textAlign: "center" }}>
                  <Button
                    className="td-btn"
                    onClick={() => {
                      setWASModal(true);
                    }}>
                    Setting value per WAS
                  </Button>
                </td>
              )}
            />
            <Column
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
              headerCell={() => <div className="text-center font-bold">Reload</div>}
              cell={(props) => (
                <td className="col-width15per" style={{ textAlign: "center" }}>
                  <Button className="td-btn">Reload</Button>
                </td>
              )}
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
            total={count || 0}
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
      {showModal && <PropertyDBManagementDetailModal setShowModal={setShowModal} />}
      {WASModal && <PropertyDBManagementWASModal setWASModal={setWASModal} />}
    </>
  );
};
