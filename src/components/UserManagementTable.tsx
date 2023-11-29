import React, { useRef, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar, Window } from "@progress/kendo-react-dialogs";
import { UserRoleManagementDialog } from "./dialogs/UserRoleManagementDialog";

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

export function UserManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState([...EMPLOYEES, ...EMPLOYEES]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState(process(filteredData, dataState));
  const [data, setData] = useState(filteredData);
  const _export = useRef<ExcelExport | null>(null);

  const [openUserRoleManagementDialog, setOpenUserRoleManagementDialog] = useState(false);

  function onCloseUserRoleManagementDialog(payload?: any) {
    if (payload) {
      // TODO
    }

    setOpenUserRoleManagementDialog(false);
  }

  const exportExport = () => {
    if (_export.current !== null) {
      _export.current.save(dataResult);
    }
  };

  let gridPDFExport: GridPDFExport | null;

  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
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

  const DataGrid = () => (
    <Grid
      {...dataState}
      data={dataResult}
      dataItemKey={DATA_ITEM_KEY}
      expandField="expanded"
      groupable={false}
      onDataStateChange={dataStateChange}
      onExpandChange={onExpandChange}
      onHeaderSelectionChange={onHeaderSelectionChange}
      onSelectionChange={onSelectionChange}
      pageable={{ pageSizes: true }}
      selectedField={SELECTED_FIELD}
      size={"small"}
      sortable={false}
      scrollable="scrollable"
      fixedScroll={true}
      total={resultState.total}>
      <Column field="budget" title="User ID" columnMenu={ColumnMenu} />
      <Column field="full_name" title="User Name" columnMenu={ColumnMenu} />
      <Column field="target" title="Rank" columnMenu={ColumnMenu} />
      <Column field="budget" title="Emp no" columnMenu={ColumnMenu} />
      <Column field="budget" title="Role name" columnMenu={ColumnMenu} />
      <Column field="budget" title="Belong" columnMenu={ColumnMenu} />
      <Column field="budget" title="User status" columnMenu={ColumnMenu} />
      <Column field="budget" title="Modified  date" columnMenu={ColumnMenu} />
      <Column
        title="Menu init"
        width={100}
        cell={(props) => (
          <td className="text-center">
            <Button size={"small"} className="px-4" themeColor={"primary"}>
              Reset
            </Button>
          </td>
        )}
      />
      <Column
        title="Menu authority"
        width={100}
        cell={(props) => (
          <td className="text-center">
            <Button
              size={"small"}
              className="px-4"
              themeColor={"primary"}
              onClick={() => setOpenUserRoleManagementDialog(true)}>
              Menu
            </Button>
          </td>
        )}
      />
      <Column
        title="Status(Error count)"
        width={130}
        cell={(props) => (
          <td className="text-center">
            <Button size={"small"} className="px-4" themeColor={"primary"}>
              Unloack(0)
            </Button>
          </td>
        )}
      />
      <Column
        title="DO Login"
        width={100}
        cell={(props) => (
          <td className="text-center">
            <Button size={"small"} className="px-4" themeColor={"primary"}>
              Login
            </Button>
          </td>
        )}
      />
    </Grid>
  );

  return (
    <>
      <ExcelExport ref={_export}>
        <DataGrid />
      </ExcelExport>

      <GridPDFExport margin="1cm">
        <DataGrid />
      </GridPDFExport>

      <UserRoleManagementDialog open={openUserRoleManagementDialog} onClose={onCloseUserRoleManagementDialog} />
    </>
  );
}
