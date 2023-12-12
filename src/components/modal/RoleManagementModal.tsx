import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Splitter } from "@progress/kendo-react-layout";
import {
  Grid,
  GridColumn as Column,
  GridRowProps,
  GridNoRecords,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import { Checkbox, Input } from "@progress/kendo-react-inputs";

interface PositionInterface {
  left: any;
  top: any;
  width: any;
  height: any;
}

const RowRender = (properties: any) => {
  const { row, props, onDrop, onDragStart } = properties;
  const additionalProps = {
    onDragStart: (e: any) => onDragStart(e, props.dataItem),
    onDragOver: (e: any) => {
      e.preventDefault();
    },
    onDrop: (e: any) => onDrop(e),
    draggable: true,
  };
  return React.cloneElement(row, { ...row.props, ...additionalProps }, row.props.children);
};

export const RoleManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
  roleId: string;
}> = ({ setShowModal, roleId }) => {
  const [searchType, setSearchType] = useState<string>("menuPath");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataResult, setDataResult] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [nestedPanes, setNestedPanes] = useState<any[]>([{ size: "50%", resizable: true }, {}]);
  const [form, setForm] = useState<any[]>([]);
  const [modifyData, setModifyData] = useState<any[]>([]);
  const [dragFrom, setDragFrom] = useState("");
  const [dragDataItem, setDragDataItem] = useState<any>(null);
  const [position, setPosition] = useState<PositionInterface>({
    left: 101,
    top: 53,
    width: "calc(100vw - 10%)",
    height: "calc(100vh - 10%)",
  });

  const getDetail = async () => {
    const detailJson = await fetch("/api/spider/roleMng/roleMenuList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roleId,
      }),
    });

    const detailResult = await detailJson.json();
    const detail = detailResult?.body?.menulist;
    const mdofiy = detailResult?.body?.rolemenulist;
    console.log("detail: ", detail, mdofiy);
    setDataResult(detail);
    setData(detail);
    setModifyData(mdofiy);
  };

  const updateDetail = async () => {
    const updateJson = await fetch("/api/spider/roleMng/saveRoleMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roleId,
        deleteFlag: "false",
        gridData: modifyData,
      }),
    });

    const updateResult = await updateJson.json();
    console.log("updateResult: ", updateResult);
  };

  const handleMove = (event: WindowMoveEvent) => {
    console.log("handleMove: ", event);
    setPosition({ ...position, left: event.left, top: event.top });
  };
  const handleResize = (event: WindowMoveEvent) => {
    console.log("handleResize: ", event);
    setPosition({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
  };

  const handleOnDropOne = (e: any) => {
    if (dragFrom === "second") {
      let newDataSecond = modifyData.filter((item: any) => item.menuId !== dragDataItem?.menuId);
      let newDataFirst = [dragDataItem, ...data];
      setDataResult(newDataFirst);
      setModifyData(newDataSecond);
      console.log("handleOnDropOne: ", e, dragFrom, dragDataItem, newDataFirst, newDataSecond);
    }
  };

  const handleDragStartOne = (e: any, dataItem: any) => {
    console.log("handleDragStartOne: ", e, dataItem);
    setDragFrom("first");
    setDragDataItem(dataItem);
  };

  const handleOnDropTwo = (e: any) => {
    if (dragFrom === "first") {
      let newDataFirst = dataResult.filter((item: any) => item.menuId !== dragDataItem.menuId);
      let newDataSecond = [dragDataItem, ...modifyData];
      setDataResult(newDataFirst);
      setModifyData(newDataSecond);
      console.log("handleOnDropTwo: ", e, dragFrom, dragDataItem, newDataFirst, newDataSecond);
    }
  };

  const handleDragStartTwo = (e: any, dataItem: any) => {
    console.log("handleDragStartOne: ", e, dataItem);
    setDragFrom("second");
    setDragDataItem(dataItem);
  };

  const rowForGridOne = (row: React.ReactElement<HTMLTableRowElement>, props: GridRowProps) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropOne} onDragStart={handleDragStartOne} />;
  };

  const rowForGridTwo = (row: React.ReactElement<HTMLTableRowElement>, props: GridRowProps) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropTwo} onDragStart={handleDragStartTwo} />;
  };

  const onFilterChange = (ev: any) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = data.filter((item: any) => {
      let match = false;
      if (item[searchType].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
        match = true;
      }
      if (item[searchType].toLocaleDateString && item[searchType].toLocaleDateString().indexOf(value) >= 0) {
        match = true;
      }
      return match;
    });
    setFilteredData(newData);

    console.log("onFilterChange: ", newData);
    setDataResult(newData);
  };

  const onSelectionChange = (dataItem: any, field: string) => {
    const selectedId = dataItem.menuId;

    const newData = modifyData.map((item: any) => {
      if (item.menuId === selectedId) {
        item.selected = !item.selected;

        if (field === "readFlag") {
          item.readFlag = !item.readFlag ? "true" : "false";

          if (item.readFlag) {
            item.writeFlag = "false";
          }
        } else if (field === "writeFlag") {
          item.writeFlag = !item.writeFlag ? "true" : "false";
          if (item.writeFlag) {
            item.readFlag = "false";
          }
        }
      }
      return item;
    });

    const newDataResult = newData;
    setModifyData(newDataResult);

    console.log(123123, newDataResult);
  };

  const renderCheckBox = (dataItem: any, props: any, event: (dataItem: any, field: string) => void) => {
    console.log(123123, dataItem, props);
    return (
      <td {...props.tdProps} style={{ textAlign: "center" }}>
        <Checkbox
          className="border"
          value={dataItem[props.field] === "true"}
          onClick={() => event(dataItem, props.field)}
        />
      </td>
    );
  };

  useEffect(() => {
    if (roleId && roleId !== "") {
      getDetail();
    }
  }, [roleId]);

  return (
    <>
      <div className="k-overlay" />
      <Window
        width={position.width}
        height={position.height}
        top={position.top}
        left={position.left}
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={`${roleId} - Role메뉴 권한 관리`}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex w-full flex-col">
          <div className="pb-[10px] text-[17px] font-bold text-[#656565]">권한ID별 메뉴 권한 체크</div>
          <div className="flex h-[72vh] w-full">
            <Splitter
              panes={nestedPanes}
              onChange={(e) => {
                setNestedPanes(e.newState);
              }}>
              <div className="flex h-full w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴를 뺀 메뉴 목록</div>
                </div>
                <div className="flex h-full flex-col">
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
                      textField="NAME"
                      dataItemKey="VALUE"
                      data={[
                        { VALUE: "menuPath", NAME: "메뉴명" },
                        { VALUE: "menuId", NAME: "메뉴ID" },
                      ]}
                      defaultValue={{ VALUE: "menuPath", NAME: "메뉴명" }}
                      size={"small"}
                      onChange={(e) => setSearchType(e.value.VALUE)}
                    />
                    <Input
                      className="ml-[2px] w-[30%] rounded-[2px] border-[1px] border-[#999999] py-[6px]"
                      value={filterValue}
                      onChange={onFilterChange}
                    />
                  </div>
                  <Grid rowHeight={29} fixedScroll={true} data={dataResult} rowRender={rowForGridOne}>
                    <GridNoRecords></GridNoRecords>
                    <Column
                      field="menuId"
                      title="Menu ID"
                      headerClassName="justify-center bg-[#adc6f4] w-[25%]"
                      className="w-[25%]"
                    />
                    <Column
                      field="menuPath"
                      title="Menu name"
                      headerClassName="justify-center bg-[#adc6f4] w-[75%]"
                      className="w-[75%]"
                    />
                  </Grid>
                  <div onDrop={handleOnDropOne} onDragOver={(e) => e.preventDefault()} className="h-full w-full" />
                </div>
              </div>
              <div className="flex h-full w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴 목록</div>
                </div>
                <div className="flex h-full flex-col">
                  <Grid rowHeight={29} fixedScroll={true} data={modifyData} rowRender={rowForGridTwo}>
                    <GridNoRecords></GridNoRecords>
                    <Column
                      field="menuId"
                      title="Menu ID"
                      headerClassName="justify-center bg-[#adc6f4] w-[15%]"
                      className="w-[15%]"
                    />
                    <Column
                      field="menuPath"
                      title="Menu name"
                      headerClassName="justify-center bg-[#adc6f4] w-[65%]"
                      className="w-[65%]"
                    />
                    <Column
                      field="readFlag"
                      title="Read"
                      headerClassName="justify-center bg-[#adc6f4] w-[10%]"
                      className="w-[10%]"
                      cells={{
                        data: ({ dataItem, ...props }) => {
                          return renderCheckBox(dataItem, props, onSelectionChange);
                        },
                      }}
                    />
                    <Column
                      field="writeFlag"
                      title="R/Write"
                      headerClassName="justify-center bg-[#adc6f4] w-[10%]"
                      className="w-[10%]"
                      cells={{
                        data: ({ dataItem, ...props }) => {
                          return renderCheckBox(dataItem, props, onSelectionChange);
                        },
                      }}
                    />
                  </Grid>
                  <div onDrop={handleOnDropTwo} onDragOver={(e) => e.preventDefault()} className="h-full w-full" />
                </div>
              </div>
            </Splitter>
          </div>
          <div className="my-[10px] flex flex-row-reverse gap-1">
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={() => setShowModal(false)}>
              닫기
            </Button>
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={updateDetail}>
              변경사항 저장
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
