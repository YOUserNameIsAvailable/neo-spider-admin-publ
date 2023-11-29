import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column,getSelectedState } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";
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

export function ComponentManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <11-2> Component management - Component info
const [position, setPosition] = React.useState<PositionInterface>({
  left: 207,
  top:45,
  width: 1010,
  height: 740,
});

const DATA_ITEM_KEYS = "ProductID";
const SELECTED_FIELDS = "selected";
const idGetters = getter(DATA_ITEM_KEYS);

const [checkData, setCheckData] = React.useState(
  [ 
    {
    ProductID:1,
    CRUD:"",
   num:'1',
   keys:'SQL_GROUP_ID',
   EX:"SQL 그룹 ID",
   default:""
  },
    {
    ProductID:2,
    CRUD:"",
   num:'2',
   keys:'UPDATE_SQL',
   EX:"서비스 수정 SQL ID",
   default:""
  },
    {
    ProductID:3,
    CRUD:"",
   num:'3',
   keys:'DELETE_SERVICE_RELATION_SQL',
   EX:"서비스릴레션삭제 SQ:L ID",
   default:""
  },
    {
    ProductID:4,
    CRUD:"",
   num:'4',
   keys:'DELETE_SERVICE_PARAM_SQL',
   EX:"릴레션파라미터삭제 SQ:L ID",
   default:""
  },
    {
    ProductID:5,
    CRUD:"",
   num:'5',
   keys:'DELETE_SERVICE_RELATION_SQL',
   EX:"서비스릴레이션등록 SQ:L ID",
   default:""
  },
].map((dataItem:any) =>
    Object.assign(
      {
        selected: false,
      },
      dataItem
    )
  )
);

const [selectedState, setSelectedState] = React.useState<any>({});

const onSelectionChanges = React.useCallback(
  (event:any) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEYS,
    });
    setSelectedState(newSelectedState);
  },
  [selectedState]
);
const onHeaderSelectionChanges = React.useCallback((event:any) => {
  const checkboxElement = event.syntheticEvent.target;
  const checked = checkboxElement.checked;
  const newSelectedState:any = {};
  event.dataItems.forEach((item:any) => {
    newSelectedState[idGetters(item)] = checked;
  });
  setSelectedState(newSelectedState);
}, []);

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

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };


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
            title="Component ID"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="Component name"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="Class"
            headerClassName="justify-center bg-[#adc6f4] col-width30per"
            className="col-width30per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="Method"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="Biz class"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
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
      {/* <11-2> Component management - Component info */}

      {visible && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'컴포넌트 정보'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col gap-[10px]'>
          <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             컴포넌트 정보
              </div>
            </div>
            <div className='flex flex-col w-full'>
              {[
                {id:'컴포넌트ID',id2:'컴포넌트명',type:'input2',disabled:false,disabled2:false,dot1:true,dot2:true},
                {id:'클래스명',id2:'메소드명',type:'input2',disabled:false,disabled2:false,dot1:true,dot2:true},
                {id:'유형',id2:'생성유형',type:'select2',disabled:false,disabled2:false,dot1:true,dot2:false},
                {id:'업무분류',id2:'',type:'select',disabled:false,disabled2:false,dot1:true,dot2:false},
                {id:'설명',id2:'',type:'textarea',disabled:false,disabled2:false,dot1:true,dot2:false},
            ].map((v)=>{
              return(
                <>  
              {v.type === 'input2' ? 
                   <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                   <div className="flex w-[50%] items-center">
   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
     <input className="w-[100%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled} />
     {v.dot1 && <span className='required' >*</span>}
     </div>
   <div className="flex w-[50%] items-center">
   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
     <input className="w-[100%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled2} />
     {v.dot2 && <span className='required' >*</span>}
     </div>
       </div>
              : v.type === 'select2' ? 
              <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                   <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
            <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['Component','안전','주의','경계']} defaultValue={'Component'} />
              {v.dot1 && <span className='required' >*</span>}
              </div>
              <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
              <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['Signleton','안전','주의','경계']} defaultValue={'Signleton'} />
              {v.dot2 && <span className='required' >*</span>}
                </div>
              </div> 
              : v.type === 'select' ?
              <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
         <div className="flex w-[100%] items-center">
         <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
         <DropDownList style={{width:'20%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['프레임워크','안전','주의','경계']} defaultValue={'프레임워크'} />
         {v.dot1 && <span className='required' >*</span>}
           </div>
         </div> 
                :
                <div className="flex w-full border-[1px]  h-[103px]" key={v.id}>
                    <div className="flex w-[100%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
            <textarea className='h-full w-[70%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]' />
              {v.dot1 && <span className='required' >*</span>}
                </div>
                  </div>
              }
            </>
              )
            })}
            </div>
            <div className="flex pb-[4px] items-center justify-between">
            <div className='flex items-center gap-1'>
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             파라미터 상세/수정
              </div>
            </div>
            <div className='flex gap-[2px]'>
              {['행 추가','선택행 삭제'].map((v)=>{
                return(
                  <button key={v} className='k-button' style={{height:"23px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',paddingRight:'4px',paddingLeft:'4px',paddingTop:'2px',paddingBottom:'2px'}}>{v}</button>
                )
              })}
            </div>
          </div>
          <Grid
        data={checkData.map((item) => ({
          ...item,
          [SELECTED_FIELDS]: selectedState[idGetters(item)],
        }))}
              style={{height:'300px'}}
              dataItemKey={DATA_ITEM_KEYS}
              selectedField={SELECTED_FIELDS}
              selectable={{
                enabled: true,
                drag: false,
                cell: false,
                mode: "multiple",
              }}
              onSelectionChange={onSelectionChanges}
              onHeaderSelectionChange={onHeaderSelectionChanges}
      >
        <Column className='truncate whitespace-nowrap'
           field={SELECTED_FIELDS}
           headerSelectionValue={
             checkData.findIndex((item) => !selectedState[idGetters(item)]) === -1
           }
        />
        <Column className='truncate whitespace-nowrap' field="CRUD" title="CRUD"  width={setPercentage(20)} />
        <Column className='flex justify-center items-center'  field="num" title="파라미터 일련번호" />
        <Column className='truncate whitespace-nowrap'  field="keys" title="파라미터 키" />
        <Column className='truncate whitespace-nowrap'  field="EX" title="파라미터 설명" />
        <Column className='truncate whitespace-nowrap'   field="default" title="초기값" />
      </Grid>
      <div className='flex flex-row-reverse'>
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{setVisible(false)}} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_all_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[73px] h-[23px]" />
              </div>
          </div>
        </Window>
        </>
      )}
    </>
  );
}
