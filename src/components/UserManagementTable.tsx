import React, { useState, FC, useCallback, useEffect } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridPageChangeEvent } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState, PagerTargetEvent } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { UserManagementDetailModal } from "./modal/UserManagementDetailModal";
import { UserManagementRoleModal } from "./modal/UserManagementRoleModal";

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";
const initialDataState = {
  take: 20,
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

export const UserManagementTable: FC<{
  getHandler: (page?: number, displayCount?: number) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ getHandler, result, count, displayCount }) => {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

  const [userId, setUserId] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false); // <2-2> User management - User detail
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false); // <2-3> User management - Menu authority

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

  const onHeaderSelectionChange = useCallback(
    (event: any) => {
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

  const pageChange = (event: GridPageChangeEvent) => {
    const targetEvent = event.targetEvent as PagerTargetEvent;
    const take = targetEvent.value === "All" ? count : event.page.take;

    setDataState({
      ...dataState,
      skip: event.page.skip,
      take: take,
    });

    getHandler(event.page.skip / take + 1, take);

    console.log("pageChange: ", targetEvent.value, event.page.skip, take, event.target);
  };

  useEffect(() => {
    if (result?.length > 0) {
      setFilteredData(result);
      setDataResult(process(result, dataState));
      setData(result);

      console.log("result: ", result);
      console.log("dataResult: ", dataResult);
      console.log("data: ", data);
      console.log("dataState: ", dataState);
      console.log("filteredData: ", filteredData);
      console.log("currentSelectedState: ", currentSelectedState);
      console.log("filterValue: ", filterValue);
      console.log("initialDataState: ", initialDataState);
    }
  }, [result]);

  useEffect(() => {
    if (displayCount) {
      setDataState((prev) => ({ ...prev, take: displayCount }));
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
              buttonCount: 5,
            }}
            onRowClick={(e) => {
              setShowDetailModal(true);
              setUserId(e.dataItem.userId);
            }}
            data={dataResult}
            sortable={false}
            total={count || 0}
            onDataStateChange={dataStateChange}
            onExpandChange={onExpandChange}
            expandField="expanded"
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            onHeaderSelectionChange={onHeaderSelectionChange}
            onSelectionChange={onSelectionChange}
            onPageChange={pageChange}
            groupable={false}>
            <Column
              field="userId"
              title="User ID"
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="userName"
              title="User Name"
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="className"
              title="Rank"
              headerClassName="justify-center bg-[#adc6f4] col-width10per"
              className="col-width10per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="userSsn"
              title="Emp no"
              headerClassName="justify-center bg-[#adc6f4] col-width10per"
              className="col-width10per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="roleName"
              title="Role name"
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="positionName"
              title="Belong"
              headerClassName="justify-center bg-[#adc6f4] col-width10per"
              className="col-width10per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="userStateCodeNm"
              title="User status"
              headerClassName="justify-center bg-[#adc6f4] col-width11per"
              className="col-width11per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="lastUpdateDtime"
              title="Modified  date"
              headerClassName="justify-center bg-[#adc6f4] col-width15per"
              className="col-width15per"
              columnMenu={ColumnMenu}
            />
            <Column
              field="Menu init"
              title="Menu init"
              width="90px"
              headerClassName="justify-center"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                        Reset
                      </Button>
                    </td>
                  );
                },
              }}
            />
            <Column
              field="Menu authority"
              title="Menu authorityt"
              width="90px"
              headerClassName="justify-center"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button
                        size={"small"}
                        className="cell-inside-btn px-4 font-normal"
                        themeColor={"primary"}
                        onClick={() => {
                          setShowRoleModal(true);
                        }}>
                        Menu
                      </Button>
                    </td>
                  );
                },
              }}
            />
            <Column
              field="Status(Error count)"
              title="Status(Error count)"
              width="100px"
              headerClassName="justify-center"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                        Unloack(0)
                      </Button>
                    </td>
                  );
                },
              }}
            />
            <Column
              field="DO Login"
              title="DO Login"
              width="90px"
              headerClassName="justify-center"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                        Login
                      </Button>
                    </td>
                  );
                },
              }}
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
      {showDetailModal && (
        <UserManagementDetailModal getHandler={getHandler} setShowDetailModal={setShowDetailModal} userId={userId} />
      )}

      {/* <2-3> User management - Menu authority */}
      {showRoleModal && <UserManagementRoleModal setShowRoleModal={setShowRoleModal} />}
    </>
  );
};
