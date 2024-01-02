import React, {
  FC,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridItemChangeEvent,
  GridCellProps,
  GridRowProps,
} from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { RoleManagementModal } from "./modal/RoleManagementModal";
import { CellRender, RowRender } from "./cellRender";
import { DropDownCell } from "./DropDownCell";
import { Input } from "@progress/kendo-react-inputs";
import { useDialogModalContext } from "@/hooks/ModalDialogContext";
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

export const RoleManagementTable: FC<{
  getHandler: (page?: number, displayCount?: number) => void;
  result: any[];
  count: number;
  displayCount: number;
  ref: any;
}> = forwardRef(({ getHandler, result, count, displayCount }, ref) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const _export = useRef<ExcelExport | null>(null);
  const [isExportExcel, setIsExportExcel] = useRecoilState<any>(isExportExcelState);
  const modalContext = useDialogModalContext();
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState<any>({ data: [] });
  const [data, setData] = useState<any[]>([]);

  const [roleId, setRoleId] = useState<string>(""); // <4-1> Role management - RoleMenu authority management
  const [showModal, setShowModal] = React.useState(false); // <4-2> Role management - RoleMenu authority management

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

  const itemChange = (event: GridItemChangeEvent) => {
    let field = event.field || "";
    let newData = dataResult?.data.map((item: any) => {
      if (item.rowSeq === event.dataItem.rowSeq) {
        item[field] = event.value;
      }
      return item;
    });

    console.log("itemChange: ", newData);
    // setData(newData);
    // setChanges(true);
    setDataResult(processWithGroups(newData, dataState));
  };

  const enterEdit = async (dataItem: any, field?: string) => {
    if (field === "roleId" && dataItem?.CRUD !== "추가") {
      await modalContext.showDialog("알림", "Primary key 필드는 추가시에만 입력이 가능합니다.", "alert");
      return;
    }
    const newData = dataResult?.data.map((item: any) => ({
      ...item,
      ["inEdit"]: item.rowSeq === dataItem.rowSeq ? field : undefined,
    }));

    console.log("enterEdit: ", newData, dataItem, field);

    setDataResult(processWithGroups(newData, dataState));

    // setData(newData);
  };

  const exitEdit = (dataItem: any, field: string) => {
    const newData = dataResult?.data.map((item: any, index: number) => {
      if (item.rowSeq === dataItem.rowSeq) {
        item.inEdit = undefined;
        console.log("exitEdit: ", data[index], dataItem);
        if (JSON.stringify(data[index]) !== JSON.stringify(dataItem)) {
          item.CRUD = "수정";
        }
      }

      return item;
    });

    console.log("exitEdit: ", newData);

    setDataResult(processWithGroups(newData, dataState));
  };

  const customCellRender: any = (td: ReactElement<HTMLTableCellElement>, props: GridCellProps) => (
    <CellRender originalProps={props} td={td} enterEdit={enterEdit} editField={"inEdit"} />
  );

  const customRowRender: any = (tr: ReactElement<HTMLTableRowElement>, props: GridRowProps) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={"inEdit"} />
  );

  useImperativeHandle(ref, () => ({
    addRow() {
      const addCount = dataResult.total + 1;
      const newDataItem = { rowSeq: addCount, CRUD: "추가" };
      const _dataState = { ...dataState, take: addCount };

      setDataState(_dataState);
      setData([...data, newDataItem]);
      setDataResult(processWithGroups([...data, newDataItem], _dataState));

      console.log("addRow: ", newDataItem, processWithGroups([...data, newDataItem], _dataState), _dataState);
    },
    delRow() {
      const newData = data
        .map((item: any) => {
          console.log("item: ", item);
          return !item.selected ? item : item?.CRUD ? {} : { ...item, CRUD: "삭제" };
        })
        .filter((item: any) => Object.keys(item).length > 0);
      const _dataState = { ...dataState, take: newData?.length };

      setDataState(_dataState);
      setData(newData);
      setDataResult(processWithGroups(newData, _dataState));
    },
    dataResult,
  }));

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
          editField="inEdit"
          cellRender={customCellRender}
          rowRender={customRowRender}
          onItemChange={itemChange}
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
            editable={false}
            headerSelectionValue={checkHeaderSelectionValue()}
            headerClassName="bg-[#adc6f4] overflow-none"
            className="overflow-none"
          />
          <Column field="CRUD" title="CRUD" headerClassName="justify-center bg-[#adc6f4]" width={53} editable={false} />
          <Column
            field="roleId"
            title="Role ID"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            editor="text"
          />
          <Column
            field="roleName"
            title="Role Name"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            editor="text"
          />
          <Column
            field="useYnNm"
            title="use"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            editable={true}
            cell={(props) => <DropDownCell props={props} enterEdit={enterEdit} exitEdit={exitEdit} />}
          />
          <Column
            field="roleDesc"
            title="Role desc"
            headerClassName="justify-center bg-[#adc6f4] col-width45per"
            className="col-width45per"
            editor="text"
          />
          <Column
            field="ranking"
            title="Ranking"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            editor="numeric"
          />
          <Column
            title="Menu role"
            cells={{
              data: ({ dataItem, ...props }) => {
                return renderButtonCell(dataItem, props, "Menu", () => {
                  if (dataItem?.CRUD === "추가") {
                    return;
                  }
                  setRoleId(dataItem.roleId);
                  setShowModal(true);
                });
              },
            }}
            headerClassName="justify-center bg-[#adc6f4]"
            width={83}
            editable={false}
          />
        </Grid>
        <ExcelExport fileName="RoleManagement" ref={_export}>
          <ExcelExportColumn field="roleId" title="Role ID" />
          <ExcelExportColumn field="roleName" title="Role Name" />
          <ExcelExportColumn field="useYnNm" title="use" />
          <ExcelExportColumn field="roleDesc" title="Role desc" />
          <ExcelExportColumn field="ranking" title="Ranking" />
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
      {showModal && <RoleManagementModal setShowModal={setShowModal} roleId={roleId} />}
    </>
  );
});
