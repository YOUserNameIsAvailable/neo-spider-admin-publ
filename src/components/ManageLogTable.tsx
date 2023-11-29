import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";
const initialDataState = {
  take: 10,
  skip: 0,
  group: [],
};

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const processWithGroups = (data: any, dataState: any) => {

  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group,
  });
  return newDataState;
};

export function ManageLogTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <9-2> Manager Log - User page access log
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 400,
    top:200,
    width: 746,
    height: 402,
  });


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
          groupable={false}
          onRowClick={()=>{setVisible(true)}}
          >
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width12per"
            className="col-width12per"
            title="Serial no"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            title="Log tracking number"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            title="Customer ID"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width8per"
            className="col-width8per"
            title="Channel ID"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width6per"
            className="col-width6per"
            title="Outgoing Incomming"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width6per"
            className="col-width6per"
            title="요청 응답"
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width12per"
            className="col-width12per"
            title="Processing result"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width14per"
            className="col-width14per"
            title="Result message"
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
          groupable={true}></Grid>
      </GridPDFExport>
    </div>
    {/* <9-2> Manager Log - User page access log */}

    {visible && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'사용자 페이지 접속 로그'}
          // style={{minWidth:'90px',minHeight:'50px',width:"auto",height:'auto'}}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
            <div className="flex flex-col gap-[12px]">
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
              기본 정보
              </div>
            </div>
            <div className="flex flex-col">
              {[
                {title:"로그 일련번호",id:'63',title2:"로그 추적번호",id2:'203012040140120421401240124210420'},
                {title:"사용자ID",id:'GUEST',title2:"채널 ID",id2:''},
                {title:"기동/수동",id:'',title2:"요청/응답",id2:''},
                {title:"처리결과 코드",id:'',title2:"",id2:''},
                {title:"처리결과 메시지",id:'',title2:"",id2:''},
                {title:"로그 데이터",id:'',title2:"",id2:''},
            ].map((v)=>{
              return(
                <>
                {v.title2 === "" ? 
                v.title === '처리결과 코드' ? 
                <div className="flex w-full border-[1px] h-[30px]">
              <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">{v.title}</label>
              <span className="text-[#656565] text-[11px] px-[2px] py-[2px] flex items-center font-bold">
              {v.id}
              </span>
              </div>
              :
              v.title === '처리결과 메시지' ? 
              <div className="flex w-full border-[1px] h-[60px]">
              <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">{v.title}</label>
              <span className="text-[#656565] text-[11px] px-[2px] py-[2px] flex items-center font-bold">
              {v.id}
              </span>
              </div>
              :
              <div className="flex w-full border-[1px] h-[60px]">
              <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">{v.title}</label>
              <textarea className="w-full h-auto" />
              </div>
              :
              <div className="flex w-full border-[1px] h-[30px]">
              <div className="flex w-[50%] h-auto">
              <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">{v.title}</label>
              <div className="text-[#656565] text-[11px] px-[2px] py-[2px] flex items-center font-bold break-all">
              {v.id}
              </div>
              </div>
              <div className="flex w-[50%] h-auto">
              <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">{v.title2}</label>
              <div className="text-[#656565] text-[11px] px-[2px] py-[2px] flex items-center font-bold break-all" >
             {v.id2}
              </div>
              </div>
              </div>
              }
                </>
              )
            })}
            </div>
            </div>
            <div className="my-[10px] flex flex-row-reverse">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{
          setVisible(false)
        }} />
        </div>
          </div>
        </Window>
        </>
      )}

    </>
    
  );
}
