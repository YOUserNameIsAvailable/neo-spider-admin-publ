import React, { useEffect, useState } from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column, GridRowClickEvent } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
import { EditorState } from "draft-js";
import { Input } from "@progress/kendo-react-inputs";

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

export function ApprovalManagementTable() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

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

  const [scriptView, setScriptView] = useState(false);

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

  // const _exporter = React.createRef();
  // const excelExport = () => {
  //   if (_exporter.current) {
  //     console.log('_exporter.current:', _exporter.current, dataResult)
  //     _exporter.current.save(dataResult);
  //   }
  // };

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
            onRowClick={(event: GridRowClickEvent) => {
              setPosition({
                ...position,
                width: 1000,
                height: 700,
              });
              setVisible(true);
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
              title="결제요청번호"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="full_name"
              title="제목"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] w-[45%]"
              className="w-[45%]"
            />
            <Column
              field="target"
              title="최종결제자"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="결제일"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] w-[10%]"
              className="w-[10%]"
            />
            <Column
              field="budget"
              title="요청일"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4] w-[10%]"
              className="w-[10%]"
            />
            <Column
              field="budget"
              title="작업구분"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="budget"
              title="승인상태"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
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
            groupable={true}></Grid>
        </GridPDFExport>
      </div>

      {scriptView && (
        <>
          <div className="k-overlay" />
          <Window
            className="workspace-window"
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setScriptView(false);
            }}>
            <div className="flex w-full flex-col p-4">
              <div className="mb-4 flex w-full flex-row items-center border-[1px] border-[#dfe1e1]">
                <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  파일명
                </label>
                <input className="my-[2px] ml-[2px] mr-8 w-full rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
              </div>
              <Editor
                // 에디터와 툴바 모두에 적용되는 클래스
                wrapperClassName="wrapper-class h-full"
                // 에디터 주변에 적용된 클래스
                editorClassName="editor !h-[500px] bg-[#fff]"
                // 툴바 주위에 적용된 클래스
                toolbarClassName="!hidden"
                // 한국어 설정
                localization={{
                  locale: "ko",
                }}
                // 초기값 설정
                editorState={editorState}
                // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                onEditorStateChange={onEditorStateChange}
              />
              <div className="mt-4 flex w-full items-center justify-end gap-2">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  소스저장하기
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </>
      )}

      {visible && (
        <>
          <div className="k-overlay" />
          <Window
            minimizeButton={() => null}
            maximizeButton={() => null}
            restoreButton={() => null}
            doubleClickStageChange={false}
            // left={position.left}
            // top={position.top}
            title={"요청된 결제 상세 페이지"}
            width={position.width}
            height={position.height}
            onMove={handleMove}
            onResize={handleResize}
            onClose={() => {
              setVisible(false);
            }}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 pb-4">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="text-[14px] font-bold text-[#656565]">결제 승인 페이지</div>
              </div>
              <div className="flex flex-col border-[1px] border-[#dfe1e1]">
                <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                  <div className="flex w-[80%] flex-row items-center gap-4">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      결재요청번호
                    </label>
                    <input className="my-[2px] ml-[2px] w-[50px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                    <div>결재요청일</div>
                    <input className="my-[2px] ml-[2px] w-[100px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                  <div className="flex w-[20%] flex-row">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      제출자
                    </label>
                    <input className="my-[2px] ml-[2px] w-[100px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                  </div>
                </div>
                <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                  <div className="flex w-[80%] flex-row items-center gap-4">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      제목
                    </label>
                    <input className="my-[2px] ml-[2px] w-[90%] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                    <span className="required">*</span>
                  </div>
                  <div className="flex w-[20%] flex-row">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      제출자
                    </label>
                    <DropDownList
                      style={{ width: 100, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                      size={"small"}
                      data={["선택 안 함", "안전", "주의", "경계"]}
                      defaultValue={"선택 안 함"}
                      className="my-[2px]"
                    />
                    <span className="required">*</span>
                  </div>
                </div>
                <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                  <div className="flex w-full flex-row items-center">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      배포예약
                    </label>
                    <div className="flex items-center gap-4">
                      <Input className="ml-[2px] w-48 border border-[#999999]" type="date" />
                      <input className="my-[2px] ml-[2px] w-[70px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <div>시</div>
                      <input className="my-[2px] ml-[2px] w-[70px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <div>분</div>
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                        즉시반영
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex h-[59px] w-full flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                  <div className="flex h-full w-full flex-row items-center">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      설명
                    </label>
                    <div className="flex h-full w-full items-center py-[2px] pr-8">
                      <textarea className="ml-[2px] h-full w-[100%] resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                </div>
                <div className="flex h-[200px] w-full flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                  <div className="flex h-full w-full flex-row items-center">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      첨부파일
                    </label>
                    <div className="flex h-full w-[600px] items-center py-[2px] pl-[2px]">
                      <Grid
                        style={{ height: "195px", width: "550px" }}
                        data={dataResult}
                        sortable={true}
                        pageable={true}
                        dataItemKey={DATA_ITEM_KEY}
                        selectedField={SELECTED_FIELD}
                        onSelectionChange={onSelectionChange}
                        onHeaderSelectionChange={onHeaderSelectionChange}
                        pageSize={8}>
                        <Column
                          field="modificationDate"
                          title="파일이름"
                          headerClassName="justify-center bg-[#adc6f4]"
                        />
                      </Grid>
                    </div>
                    <div className="shrink-1 flex flex-grow gap-4">
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                        등록
                      </Button>
                      <Button size={"small"} className="cell-inside-btn px-4 font-normal">
                        취소
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex h-[28px] flex-row justify-between">
                  <div className="flex w-[70%] flex-row">
                    <label className="flex h-full w-[75px] min-w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                      최종결제자
                    </label>
                    <DropDownList
                      style={{ width: 100, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                      size={"small"}
                      data={["선택 안 함", "안전", "주의", "경계"]}
                      defaultValue={"선택 안 함"}
                      className="my-[2px]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  승인
                </Button>
                <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                  반려
                </Button>
                <Button
                  imageUrl="/images/dot-right-arrow.png"
                  className="basic-btn flex items-center justify-start"
                  onClick={undefined}>
                  닫기
                </Button>
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
