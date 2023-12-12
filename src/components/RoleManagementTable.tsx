import React, { FC, useCallback, useEffect, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridNoRecords } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { RoleManagementModal } from "./modal/RoleManagementModal";

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

export const RoleManagementTable: FC<{
  getHandler: (page?: number, displayCount?: number) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ getHandler, result, count, displayCount }) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

  const [showModal, setShowModal] = React.useState(false); // <4-2> Role management - RoleMenu authority management

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

  const onHeaderSelectionChange = useCallback(
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
    const selectedProductId = event.dataItem.rowSeq;

    const newData = data.map((item: any) => {
      if (item.rowSeq === selectedProductId) {
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

    console.log(123123, newDataResult);
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

  const checkHeaderSelectionValue = () => {
    const newData = setExpandedState({
      data: setSelectedValue(dataResult.data),
      collapsedIds: [],
    });

    let selectedItems = getNumberOfSelectedItems(newData);
    return newData.length > 0 && selectedItems === getNumberOfItems(newData);
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

  return (
    <>
      <div>
        <ExcelExport>
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
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            resizable={true}
            onDataStateChange={dataStateChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
            onSelectionChange={onSelectionChange}>
            <GridNoRecords>
              <div id="noRecord" className="popup_pop_norecord">
                No Record Found.
              </div>
            </GridNoRecords>
            <Column
              filterable={false}
              field={SELECTED_FIELD}
              width={30}
              headerSelectionValue={checkHeaderSelectionValue()}
              headerClassName="bg-[#adc6f4]"
            />
            <Column field="budget" title="CRUD" headerClassName="justify-center bg-[#adc6f4]" width={53} />
            <Column
              field="roleId"
              title="Role ID"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] col-width20per"
              className="col-width20per"
            />
            <Column
              field="roleName"
              title="Role Name"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] col-width20per"
              className="col-width20per"
            />
            <Column
              field="useYnNm"
              title="use"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
            />
            <Column
              field="roleDesc"
              title="Role desc"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4] col-width45per"
              className="col-width45per"
            />
            <Column
              field="ranking"
              title="Ranking"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4] col-width10per"
              className="col-width10per"
            />
            <Column
              title="Menu role"
              sortable={false}
              cells={{
                data: ({ dataItem, ...props }) => {
                  return renderButtonCell(dataItem, props, "Menu", () => setShowModal(true));
                },
              }}
              headerClassName="justify-center bg-[#adc6f4]"
              width={83}
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
            total={count}
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
      {showModal && <RoleManagementModal setShowModal={setShowModal} />}
    </>
  );
};
