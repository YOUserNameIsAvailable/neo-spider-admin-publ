"use client";

import React from 'react'
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { getter } from "@progress/kendo-react-common";
import { useState } from "react";
import { PropertyDbManagementTable } from "@/components/PropertyDbManagementTable";
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn as Column,getSelectedState,GridNoRecords } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DATA_ITEM_KEYS = "ProductID";
const SELECTED_FIELDS = "selected";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible,setVisible] = React.useState(false);  // <10-2> Property DB management - Detail view
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 200,
    top:115,
    width: 1110,
    height: 597,
  });
const idGetters = getter(DATA_ITEM_KEYS);

  const [checkData, setCheckData] = React.useState(
    [].map((dataItem:any) =>
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

  const allData = [
    {
      id: 1,
      text: "전체",
    },
    {
      id: 2,
      text: "111qwe",
    },
    {
      id: 3,
      text: "Admin",
    },
    {
      id: 4,
      text: "CMS2",
    },
    {
      id: 5,
      text: "CMSTEST",
    },
    {
      id: 6,
      text: "FDSengine",
    },
  ];
  const [datas, setDatas] = React.useState(allData.slice());

  const filterData = (filter:any) => {
    const data = allData.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event:any) => {
    setDatas(filterData(event.filter));
  };

  



  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="text-[#656565] font-bold">List</span>
      </div>
      <div className="mb-4 flex justify-end">
        <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn mt-2 flex h-7 items-center justify-start">
          Property file export
        </Button>
      </div>
      <PropertyDbManagementTable />
      <div className="flex justify-end">
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn mt-2 flex h-7 items-center justify-start"
          onClick={() => {
            setVisible(true);
          }}>
          Create new property group
        </Button>
      </div>

       {/* <10-2> Property DB management - Detail view */}

       {visible && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'프로퍼티 정보 등록'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
          <div className="flex pb-[4px] items-center justify-between">
            <div className='flex items-center gap-1'>
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             프로퍼티 그룹 정보
              </div>
            </div>
            <button className='k-button' style={{width:'61px',height:'20px',backgroundColor:"#F6F6F6"}}>
              <img src='./images/btn_excel_off.gif' />
            </button>
            </div>
           <div className='flex justify-between h-[38px] w-full border-[1px]'>
           <div className="flex items-center w-full">
            <label className="bg-[#d1daec] h-[38px] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">프로퍼티 그룹 ID</label>
            <input className="w-[12%] border-[1px] border-[1px] border-[#999999] py-[4px] rounded-[2px] ml-[2px]"/>
            <button className='k-button' style={{height:"23px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',paddingRight:'4px',paddingLeft:'4px',paddingTop:'2px',paddingBottom:'2px',marginLeft:'2px'}}>중복확인</button>
            <label className="bg-[#d1daec] h-[38px] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center ml-4">프로퍼티 그룹명</label>
            <input className="w-[12%] border-[1px] border-[1px] border-[#999999] py-[4px] rounded-[2px] ml-[2px]"/>
           </div>
              <button className='k-button' style={{width:'120px',backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px'}}>유사프로퍼티등록</button>
           </div>
          <div className='pl-[13px] flex gap-[28px] w-full'>
          <DropDownList style={{width:'18%',fontSize:"12px",marginLeft:'4px',paddingTop:"2px",paddingBottom:'2px',color:'#656565',fontWeight:"bold"}} size={'small'} data={['프로퍼티ID','프로퍼티명']} defaultValue={'프로퍼티ID'}  />
          <input className="w-[12%] border-[1px] border-[1px] border-[#999999] py-[4px] rounded-[2px]"/>
          </div>
          <div className="flex pb-[4px] items-center justify-between">
            <div className='flex items-center gap-1'>
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             프로퍼티 정보
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
        style={{height:'300px',display:'flex',justifyContent:"center",alignItems:"center"}}
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
      <GridNoRecords  >
        <div className='h-[268px] w-full flex items-center justify-center'>
      <div className='p-[30px] h-[100px] flex items-center justify-center rounded-[10px]' style={{background:`linear-gradient(to bottom, #ffffff 30%, #f6f6f6 60%, #eeeeee,#e5e5e5)`,boxShadow:`0px 0px 2px 1px rgba(0,0,0,.2)`}}>
        No Recode Found
        </div>
        </div>
        </GridNoRecords>
       
        <Column className='truncate whitespace-nowrap'
          field={SELECTED_FIELDS}
          headerSelectionValue={
            checkData.findIndex((item) => !selectedState[idGetters(item)]) === -1
          }
        />
        <Column className='truncate whitespace-nowrap' field="CRUD" title="CRUD"  />
        <Column className='truncate whitespace-nowrap'  field="propertyID" title="프로퍼티ID" />
        <Column className='truncate whitespace-nowrap'  field="propertyName" title="프로퍼티명" />
        <Column className='truncate whitespace-nowrap'  field="propertyEx" title="프로퍼티 설명" />
        <Column className='truncate whitespace-nowrap'   field="firstNum" title="초기값" />
        <Column className='truncate whitespace-nowrap'   field="num" title="유효값" />
        <Column className='truncate whitespace-nowrap'  field="dataType" title="data타입" />
        <Column className='truncate whitespace-nowrap'  field="WAS" title="WAS별 설정"/>
      </Grid>
            <div className="flex justify-between">
              <div className='flex gap-[2px]'>
              {['전체 백업','전체 복원','WAS별 설정 백업','WAS별 설정 복원'].map((v)=>{
                return(
                  <button key={v} className='k-button' style={{height:"23px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',width:"114px"}}>{v}</button>
                )
              })}
              </div>
              <div className='flex'>
        <button style={{background:"url(./images/btn_all_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[73px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{
          setVisible(false)
        }} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
              </div>
        </div>
          </div>
        </Window>
        </>
      )}
    </>
  );
}

