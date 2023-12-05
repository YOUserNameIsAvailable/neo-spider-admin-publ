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
              setVisible(false);
            }}>
            <div className="flex w-full flex-col">
              <div className="flex flex-row items-center justify-between bg-[#cdd5eb] p-4">
                <div className=" text-[17px] font-bold text-[#656565]">전문 수정</div>
                <div className="actions">
                  <Button imageUrl="/images/btn_excel_off.gif" className="excel-btn" />
                  <Button imageUrl="/images/btn_print_off.gif" className="ml-px-10 print-btn" />
                </div>
              </div>
              <div className="flex flex-col p-4">
                <div className="flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">전문 정보</div>
                  <Button className="ml-4 bg-neutral-50 p-2" onClick={undefined}>
                    Expand / Colapse
                  </Button>
                </div>
                {/*  */}
                <div className="mt-4 flex flex-col border-[1px] border-[#dfe1e1]">
                  <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[40%] flex-row items-center">
                      <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        기관명
                      </label>
                      <DropDownList
                        style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                        disabled={true}
                      />
                      <span className="required">*</span>
                    </div>
                    <div className="flex w-[60%] flex-row items-center">
                      <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        상위전문ID
                      </label>
                      <DropDownList
                        style={{ width: 250, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[40%] flex-row items-center">
                      <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        전문ID
                      </label>
                      <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                    <div className="flex w-[60%] flex-row items-center">
                      <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        전문명
                      </label>
                      <input className="my-[2px] ml-[2px] w-[190px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                      <span className="required">*</span>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[40%] flex-row items-center">
                      <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        전문설명
                      </label>
                      <input className="my-[2px] ml-[2px] w-[150px] rounded-[2px] border-[1px] border-[#999999] py-[2px]" />
                    </div>
                    <div className="flex w-[60%] flex-row items-center">
                      <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        로그레벨
                      </label>
                      <DropDownList
                        style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[29px] flex-row justify-between border-b-[1px] border-[#dfe1e1]">
                    <div className="flex w-[40%] flex-row items-center">
                      <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        헤더전문여부
                      </label>
                      <DropDownList
                        style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                    </div>
                    <div className="flex w-[60%] flex-row items-center">
                      <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        전문유형/요청응답구분
                      </label>
                      <DropDownList
                        style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                      <span className="required">*</span>
                      /
                      <DropDownList
                        style={{ width: 80, marginRight: "2px", fontSize: "12px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px] ml-[8px]"
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex h-[28px] flex-row justify-between">
                    <div className="flex w-[40%] flex-row items-center">
                      <label className="flex h-full w-[75px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        사전로딩여부
                      </label>
                      <DropDownList
                        style={{ width: 110, marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                    </div>
                    <div className="flex w-[60%] flex-row items-center">
                      <label className="flex h-full w-[140px] min-w-[140px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                        업무분류
                      </label>
                      <DropDownList
                        style={{ width: "100%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
                        size={"small"}
                        data={["선택 안 함", "안전", "주의", "경계"]}
                        defaultValue={"선택 안 함"}
                        className="my-[2px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 pb-[4px]">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">전문 상세정보</div>
                  <Button className="ml-4 bg-neutral-50 p-2" onClick={undefined}>
                    Expand / Colapse
                  </Button>
                  <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
                    <Button
                      imageUrl="/images/dot-right-arrow.png"
                      className="basic-btn flex items-center justify-start">
                      엑셀저장
                    </Button>
                    <Button
                      imageUrl="/images/dot-right-arrow.png"
                      className="basic-btn flex items-center justify-start">
                      헤더전문포함조회
                    </Button>
                    <Button
                      imageUrl="/images/dot-right-arrow.png"
                      className="basic-btn flex items-center justify-start">
                      필드풀 검증
                    </Button>
                    <Button
                      imageUrl="/images/dot-right-arrow.png"
                      className="basic-btn flex items-center justify-start">
                      다국어 검증
                    </Button>
                  </div>
                </div>
                {/*  */}
                <div className="mb-4 flex flex-row items-center">
                  <div className="flex items-center">※Excel Copy &gt;&gt; Excel복사버튼 클릭하세요</div>
                  <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                      Excel복사
                    </Button>
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                      유사전문복사
                    </Button>
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                      테이블
                    </Button>
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                      행 추가
                    </Button>
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                      선택형 삭제
                    </Button>
                  </div>
                </div>
                {/*  */}
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
                      filterable={false}
                      sortable={false}
                      field={SELECTED_FIELD}
                      // headerSelectionValue={checkHeaderSelectionValue()}
                      headerClassName="bg-[#adc6f4] overflow-none"
                      className="overflow-none"
                      width={30}
                    />
                    <Column
                      field="budget"
                      title="CRUD"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="full_name"
                      title="순번"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="target"
                      title="전문필드명"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="data타입"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="data길이"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="정렬기준"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="특이사항"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="필수여부"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                      width={83}
                    />
                    <Column
                      field="budget"
                      title="스케일"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="삽입문자"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="입력구분"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="코드그룹"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="코드맵핑"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                    <Column
                      field="budget"
                      title="초기값"
                      sortable={false}
                      headerClassName="justify-center bg-[#adc6f4]"
                    />
                  </Grid>
                </ExcelExport>
                {/*  */}
                <div className="shrink-1 mt-4 flex flex-grow flex-row items-center justify-end gap-2">
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    삭제
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    저장
                  </Button>
                  <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
                    목록
                  </Button>
                </div>
              </div>
            </div>
          </Window>
        </>
      )}
    </>
  );
}
