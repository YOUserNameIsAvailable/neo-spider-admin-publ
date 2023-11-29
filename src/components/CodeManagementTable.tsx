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
import { DropDownList } from "@progress/kendo-react-dropdowns";

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

export function CodeManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <7-2> Code management - code info
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 341,
    top:241,
    width: 810,
    height: 284,
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
          onRowClick={()=>{
            setVisible(true);
          }}
          >
          <Column
            field="budget"
            width="110px"
            title="Code group"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="Code group name"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            width="150px"
            title="Code"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Code name"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Code desc"
            headerClassName="justify-center bg-[#adc6f4]"
            columnMenu={ColumnMenu}
          />
          <Column field="budget" width="100px" title="Sort order" headerClassName="justify-center bg-[#adc6f4]" />
          <Column
            field="budget"
            width="100px"
            title="사용"
            headerClassName="justify-center bg-[#adc6f4]"
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
          groupable={true}
          size={"small"}></Grid>
      </GridPDFExport>
    </div>
      {/* <7-2> Code management - code info */}

      {visible && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'코드 정보'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
          <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             코드 수정
              </div>
            </div>
            <div className='flex flex-col w-full'>
              {[
                {id:'코드그룹ID',id2:'코드',type:'input2',disabled:true,disabled2:false,dot1:false,dot2:true},
                {id:'코드명',id2:'코드영문명',type:'input2',disabled:false,disabled2:false,dot1:true,dot2:true},
                {id:'코드설명',id2:'',type:'input',disabled:false,disabled2:false,dot1:false,dot2:false},
                {id:'정렬순선',id2:'사용여부',type:'select',disabled:false,disabled2:false,dot1:true,dot2:true},
            ].map((v)=>{
              return(
                <>  
              {v.type === 'input' ? 
                 <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
              <div className='flex w-full items-center'>
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <input className="w-[70%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
              </div> 
                 </div>
              : v.type === 'select' ? 
              <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                   <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <input className="w-[20%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled} />
              {v.dot1 && <span className='required' >*</span>}
              <div className='text-[#285BA2] text-[11px]'>
                  등록된 코드: 261
              </div>
              </div>
              <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
              <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['사용','안전','주의','경계']} defaultValue={'사용'} />
              {v.dot2 && <span className='required' >*</span>}
                </div>
              </div> 
              : 
              <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                            <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <input className="w-[40%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled} />
              {v.dot1 && <span className='required' >*</span>}
              </div>
            <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
              <input className="w-[40%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled2} />
              {v.dot2 && <span className='required' >*</span>}
              </div>
                </div>
              }
            </>
              )
            })}
            </div>
            <div className="flex flex-row-reverse gap-1">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{setVisible(false)}} />
        <button style={{background:"url(./images/btn_menu_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
</>
  );
}
