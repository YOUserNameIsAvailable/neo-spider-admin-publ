import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridRowClickEvent, GridNoRecords } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { CodeGroupManagementDetailModal } from "@/components/modal/CodeGroupManagementDetailModal";
import { Button } from "@progress/kendo-react-buttons";

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

export const CodeGroupManagementTable: FC<{
  getHandler: (page?: number, displayCount?: number) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ getHandler, result, count, displayCount }) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const childRef = useRef<any>();
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

  const [codeGroupId, setCodeGroupId] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = React.useState(false);

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
    const selectedId = event.dataItem.rowSeq;

    const newData = data.map((item: any) => {
      if (item.rowSeq === selectedId) {
        item.selected = !item.selected;
      }
      return item;
    });

    setCurrentSelectedState((prevState: any) => ({
      ...prevState,
      [selectedId]: !prevState[selectedId],
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

  const _getHandler = () => {
    const page = Math.floor(dataState.skip / dataState.take) + 1;
    getHandler(page);
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
          onSelectionChange={onSelectionChange}
          onRowClick={(event: GridRowClickEvent) => {
            setCodeGroupId(event.dataItem.codeGroupId);
            setShowDetailModal(true);
          }}>
          <GridNoRecords>
            <div id="noRecord" className="popup_pop_norecord">
              No Record Found.
            </div>
          </GridNoRecords>
          <Column
            field="codeGroupId"
            title="Code group ID"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
          />
          <Column
            field="codeGroupName"
            title="Code group name"
            headerClassName="justify-center col-width100per"
            className="col-width100per"
          />
          <Column
            field="codeGroupDesc"
            title="Code desc."
            headerClassName="justify-center col-width200per"
            className="col-width200per"
          />
          <Column
            field="bizGroupName"
            title="Biz class"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
          />
          <Column
            field="codeCount"
            title="Code count"
            headerClassName="justify-center col-width70per"
            className="col-width70per"
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
      {showDetailModal && (
        <CodeGroupManagementDetailModal
          getHandler={_getHandler}
          setShowDetailModal={setShowDetailModal}
          codeGroupId={codeGroupId}
          ref={childRef}
        />
      )}
    </div>
  );
};
