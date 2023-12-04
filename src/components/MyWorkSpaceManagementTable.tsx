import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";

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

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function MyWorkSpaceManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible, setVisible] = React.useState(false); // <4-2> Role management - RoleMenu authority management
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 250,
    top: 45,
    width: 1092,
    height: 728,
  });

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };

  const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([{ size: "50%", resizable: true }, {}]);

  const handleMove = (event: WindowMoveEvent) => {
    setPosition({ ...position, left: event.left, top: event.top });
  };
  const handleResize = (event: WindowMoveEvent) => {
    setPosition({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
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
        selected: currentSelectedState[idGetter(item)],
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

  const handleButtonClick = (row: any) => {
    // Handle button click for the specific row
    console.log(`Button clicked for user: ${row.full_name}`);
  };

  const renderButtonCell = (props: any) => (
    <td>
      <button onClick={() => handleButtonClick(props.dataItem)}>Click me</button>
    </td>
  );

  return (
    <>
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
            groupable={false}>
            <Column
              field="budget"
              title="항목"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="full_name"
              title="식별자"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="target"
              title="작업내용"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="결제일련번호"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="운영반영여부"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      X
                    </td>
                  );
                },
              }}
            />
            <Column
              field="budget"
              title="최종수정자ID"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="최종수정일시"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="이행스크립트생성"
              sortable={false}
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      <Button
                        size={"small"}
                        className="cell-inside-btn px-4"
                        themeColor={"primary"}
                        onClick={() => [setVisible(true)]}>
                        Menu
                      </Button>
                    </td>
                  );
                },
              }}
              headerClassName="justify-center bg-[#adc6f4]"
              width={83}
            />
            <Column
              field="budget"
              title="이행스크립트 View"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              filterable={false}
              sortable={false}
              field={SELECTED_FIELD}
              // headerSelectionValue={checkHeaderSelectionValue()}
              headerClassName="bg-[#adc6f4] overflow-none"
              className="overflow-none"
              width={30}
            />
            <Column field="budget" title="식별자" sortable={false} headerClassName="justify-center bg-[#adc6f4]" />
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
      {/* <4-2> Role management - RoleMenu authority management */}

      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            title={"Role메뉴 권한 관리"}
            left={position.left}
            top={position.top}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setVisible(false);
            }}>
            <div className="flex w-full flex-col p-4">
              <div className="pb-[10px] text-[17px] font-bold text-[#656565]">권한ID별 메뉴 권한 체크</div>
              <div className="flex h-[75vh] w-full">
                <Splitter
                  panes={nestedPanes}
                  onChange={(e) => {
                    setNestedPanes(e.newState);
                  }}>
                  <div className="flex w-full flex-col gap-[15px] border-[1px]">
                    <div className="flex items-center gap-1">
                      <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                      <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴를 뺀 메뉴 목록</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex h-[40px] items-center gap-[8px] bg-[#dde6f0] px-[13px] py-[7px]">
                        <DropDownList
                          style={{
                            width: "40%",
                            fontSize: "12px",
                            marginLeft: "2px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            fontWeight: "bold",
                            color: "#656565",
                          }}
                          size={"small"}
                          data={["메뉴명", "안전", "주의", "경계"]}
                          defaultValue={"메뉴명"}
                        />
                        <input className="ml-[2px] w-[30%] rounded-[2px] border-[1px] border-[#999999] py-[6px]" />
                      </div>
                      <Grid
                        className="h-[88%]"
                        rowHeight={29}
                        fixedScroll={true}
                        data={[
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "nsb_msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > M_거래관리" },
                          { 메뉴ID: "message_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 전문 관리" },
                          {
                            메뉴ID: "neb_msg_trx_manage",
                            메뉴명: "Framework 관리메뉴 > 거래전문 관리 > N_전문등록조회",
                          },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                          { 메뉴ID: "msg_trx_manage", 메뉴명: "Framework 관리메뉴 > 거래전문 관리 > 거래관리" },
                        ]}>
                        {["메뉴ID", "메뉴명"].map((v) => {
                          return (
                            <Column key={v} field={v} title={v} width={setPercentage(v === "메뉴ID" ? 50 : 120)} />
                          );
                        })}
                      </Grid>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-[15px] border-[1px]">
                    <div className="flex items-center gap-1">
                      <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                      <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴 목록</div>
                    </div>
                    <div className="flex flex-col">
                      <Grid className="h-[88%]" rowHeight={29} fixedScroll={true}>
                        {[
                          { id: "메뉴ID", w: 30 },
                          { id: "메뉴명", w: 80 },
                          { id: "Read", w: 20 },
                          { id: "R/Write", w: 25 },
                        ].map((v) => {
                          return <Column key={v.id} field={v.id} title={v.id} width={setPercentage(v.w)} />;
                        })}
                      </Grid>
                    </div>
                  </div>
                </Splitter>
              </div>
              <div className="my-[10px] flex flex-row-reverse gap-1">
                <button
                  style={{
                    background: "url(./images/btn_user_close.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="h-[23px] w-[40px]"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
                <button
                  style={{
                    background: "url(./images/btn_rolemenu_save.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="h-[23px] w-[80px]"
                />
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
