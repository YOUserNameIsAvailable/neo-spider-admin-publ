import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { useCallback, useState } from "react";
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

export function WorkSpaceManagement() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState(process(filteredData, dataState));
  const [data, setData] = useState(filteredData);

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

  const [resultState, setResultState] = useState(
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

  const onExpandChange = useCallback(
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
  const checkHeaderSelectionValue = () => {
    let selectedItems = getNumberOfSelectedItems(newData);
    return newData.length > 0 && selectedItems == getNumberOfItems(newData);
  };

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
          groupable={false}
          size={"small"}>
          <Column
            filterable={false}
            field={SELECTED_FIELD}
            width={50}
            headerSelectionValue={checkHeaderSelectionValue()}
          />
          <Column field="budget" width="120px" title="CRUD" columnMenu={ColumnMenu} />
          <Column field="full_name" width="350px" title="WORK SPACE ID" columnMenu={ColumnMenu} />
          <Column field="target" width="350px" title="Work space name" columnMenu={ColumnMenu} />

          <Column field="budget" width="140px" title="Thread count" columnMenu={ColumnMenu} />
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
          size={"small"}></Grid>
      </GridPDFExport>
    </div>
  );
}
