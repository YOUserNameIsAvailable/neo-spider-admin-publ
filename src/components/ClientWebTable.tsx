import React, { FC, useCallback, useEffect, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridNoRecords } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { ClientWebProps } from "@/types";
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

export const ClientWebTable: FC<{
  onRowClick?: (e: any) => void;
  result: any[];
  count: number;
  displayCount: number;
}> = ({ onRowClick, result, count, displayCount }) => {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

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
    if (result?.length > 0) {
      setFilteredData(result);
      setDataResult(process(result, dataState));
      setData(result);
    }
  }, [result]);

  return (
    <div>
      <ExcelExport>
        <Grid
          style={{
            height: "500px",
            cursor: "pointer",
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
          onRowClick={onRowClick}>
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
          <Column
            field="menuUrl"
            width="140px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Menu URL"
            columnMenu={ColumnMenu}
          />
          <Column
            field="menuName"
            width="130px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Menu name"
            columnMenu={ColumnMenu}
          />
          <Column
            field="menuId"
            width="130px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="화면번호"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.menuId}
                  </td>
                );
              },
            }}
          />
          <Column
            field="bizDomain"
            width="120px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Site Type"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.bizDomain}
                  </td>
                );
              },
            }}
          />
          <Column
            columnMenu={ColumnMenu}
            field="secureSignYn"
            width="350px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Whether electronic signature is required"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.secureSignYn}
                  </td>
                );
              },
            }}
          />
          <Column
            field="bankStatusCheckYn"
            width="250px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Check status of other banks"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.bankStatusCheckYn}
                  </td>
                );
              },
            }}
          />
          <Column
            field="inputType"
            width="150px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Input Type"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.inputType}
                  </td>
                );
              },
            }}
          />
          <Column
            field="EChannelCode"
            width="280px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="e-channel log classification code"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.EChannelCode}
                  </td>
                );
              },
            }}
          />

          <Column
            field="useYn"
            width="150px"
            headerClassName="justify-center bg-[#adc6f4]"
            title="Service state"
            columnMenu={ColumnMenu}
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    {dataItem?.useYn}
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
          groupable={true}
          size={"small"}></Grid>
      </GridPDFExport>
    </div>
  );
};
