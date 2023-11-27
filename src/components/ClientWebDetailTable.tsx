import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import {
  setGroupIds,
  setExpandedState,
} from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { ClientWebProps } from "@/types";

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

export const ClientWebDetailTable: React.FC<ClientWebProps> = ({
  onRowClick,
}) => {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>(
    {}
  );
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(
    process(filteredData, dataState)
  );
  const [data, setData] = React.useState(filteredData);

  const onFilterChange = (ev: any) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = EMPLOYEES.filter((item: any) => {
      let match = false;
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }
        if (
          item[property].toLocaleDateString &&
          item[property].toLocaleDateString().indexOf(value) >= 0
        ) {
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
      initialDataState
    )
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
    [dataResult]
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
    [data, dataState, idGetter]
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
        count = count + (item.selected === true ? 1 : 0);
      }
    });
    return count;
  };

  const checkHeaderSelectionValue = () => {
    let selectedItems = getNumberOfSelectedItems(newData);
    return newData.length > 0 && selectedItems === getNumberOfItems(newData);
  };

  return (
    <div>
      <ExcelExport>
        <Grid
          style={{
            height: "212px",
            cursor: "pointer",
          }}
          pageable={{
            pageSizes: true,
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
          onRowClick={onRowClick}
          groupable={false}
          size={"small"}
          resizable={true}
        >
          <Column
            filterable={false}
            field={SELECTED_FIELD}
            width={35}
            headerSelectionValue={checkHeaderSelectionValue()}
            headerClassName="bg-[#adc6f4]"
          />
          <Column
            field="budget"
            title="CRUD"
            width="80px"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="분기코드"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="분기코드설명"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Forward유형"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Layout Page"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Content Page"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Top Page"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Left Page"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="특이사항"
            headerClassName="justify-center bg-[#adc6f4]"
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
          groupable={true}
          size={"small"}
        ></Grid>
      </GridPDFExport>
    </div>
  );
};