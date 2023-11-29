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
import products from "@/utils/text.json";
import { filterBy } from "@progress/kendo-data-query";

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


export function PropertyDbManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [WASvisible,setWASVisible] = React.useState(false);  // <10-3> Property DB management - setting value per Was

  const DATA_ITEM_KEYS = "ProductID";
const SELECTED_FIELDS = "selected";
const idGetters = getter(DATA_ITEM_KEYS);

  const [visible,setVisible] = React.useState(false);  // <10-2> Property DB management - Detail view
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 200,
    top:115,
    width: 1110,
    height: 597,
  });

  const [checkData, setCheckData] = React.useState(
    products.map((dataItem:any) =>
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

  const CustomCell = (props:any) => {
    return(
      <td
      >
       <button className='k-button' style={{height:"20px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',width:"100px"}}>WAS별 설정</button>
      </td>
    )
  };

  const WASCell = (props:any)=>{
    return (
      <td
        {...props.tdProps}
        colSpan={1}
        style={{
          color: props.color,
        }}
      >
        {props.children}
      </td>
    );
  }
  const MyCustomCell = (props:any) => <WASCell {...props} color={"red"} />;

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

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
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
            title="Property Group ID"
            headerClassName="justify-center bg-[#adc6f4] col-width25per"
            className="col-width25per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="Property group name"
            headerClassName="justify-center bg-[#adc6f4] col-width25per"
            className="col-width25per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            headerCell={() => <div className="text-center font-bold">Detail view</div>}
            cell={(props) => (
              <td className="col-width15per" style={{ textAlign: "center" }}>
                <Button className="td-btn" onClick={()=>{
                  setVisible(true);
                }}>Detail view</Button>
              </td>
            )}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            headerCell={() => <div className="text-center font-bold">Setting vaolue per WAS</div>}
            cell={(props) => (
              <td className="col-width20per" style={{ textAlign: "center" }}>
                <Button className="td-btn" onClick={()=>{
                  
                  setWASVisible(true)
                }}>Setting value per WAS</Button>
              </td>
            )}
          />
          <Column
            field="budget"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            headerCell={() => <div className="text-center font-bold">Reload</div>}
            cell={(props) => (
              <td className="col-width15per" style={{ textAlign: "center" }}>
                <Button className="td-btn">Reload</Button>
              </td>
            )}
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
      {/* <10-2> Property DB management - Detail view */}

      {visible && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'프로퍼티 정보 상세'}
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
            <DropDownList style={{width:'20%',fontSize:"12px",marginLeft:'4px',paddingTop:"2px",paddingBottom:'2px',color:'#656565',fontWeight:"bold"}} size={'small'} data={datas} textField='text' defaultValue={'111qwe'} filterable={true}
        onFilterChange={filterChange} />
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
              {['Reload','행 추가','선택행 삭제'].map((v)=>{
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
        <Column className='truncate whitespace-nowrap'  field="propertyID" title="프로퍼티ID" />
        <Column className='truncate whitespace-nowrap'  field="propertyName" title="프로퍼티명" />
        <Column className='truncate whitespace-nowrap'  field="propertyEx" title="프로퍼티 설명" />
        <Column className='truncate whitespace-nowrap'   field="firstNum" title="초기값" />
        <Column className='truncate whitespace-nowrap'   field="num" title="유효값" />
        <Column className='truncate whitespace-nowrap'  field="dataType" title="data타입" />
        <Column className='truncate whitespace-nowrap'  field="WAS" title="WAS별 설정" cell={CustomCell} />
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
        {/* <10-3> Property DB management - setting value per Was */}

        {WASvisible && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'WAS별 설정값 조회'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setWASVisible(false)}}
        >
          <div className='flex flex-col gap-[10px]'>
          <div className='bg-[#dde6f0] h-[40px] w-full flex justify-between p-[5px] items-center'>
          <div className='flex gap-[15px] items-center w-full'>
          <div className='text-[#656565] text-[12px] font-bold'>
            WAS 인스턴스
          </div>
          <DropDownList style={{width:'15%',fontSize:"12px",marginLeft:'4px',paddingTop:"2px",paddingBottom:'2px',color:'#656565',fontWeight:"bold"}} size={'small'} data={['프로퍼티ID','프로퍼티명']} defaultValue={'프로퍼티ID'}  />
          <div className='text-[#656565] text-[12px] font-bold'>
            프로퍼티 그룹 ID
          </div>
          <DropDownList style={{width:'15%',fontSize:"12px",marginLeft:'4px',paddingTop:"2px",paddingBottom:'2px',color:'#656565',fontWeight:"bold"}} size={'small'} data={['프로퍼티ID','프로퍼티명']} defaultValue={'프로퍼티ID'}  />
          </div>
          <button className='k-button' style={{width:'61px',height:'20px',backgroundColor:"#F6F6F6"}}>
              <img src='./images/btn_excel_off.gif' />
            </button>
          </div>
          <div className='flex flex-col h-[415px] w-full border-[1px] overflow-auto'>
          <div className='my-[10px] flex justify-between items-center'>
            <div className='flex items-center'>
            <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#FF0000] font-bold pl-[2px]">
             * 빨간색 필드만 수정 가능합니다
              </div>
            </div>
            <div className='flex gap-[2px] mr-[8px]'>
            {['행 추가','선택행 삭제'].map((v)=>{
                return(
                  <button key={v} className='k-button' style={{height:"23px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',paddingRight:'4px',paddingLeft:'4px',paddingTop:'2px',paddingBottom:'2px'}}>{v}</button>
                )
              })}
            </div>
          </div>
          <Grid
        data={[ {
          ProductID:1,
          CRUD:"",
          propertyID:'111qwe',
          propertyName:'ACCOUNT_NEXT_STATE_DADWDWDA',
          propertyEx:"",
          firstNum:"01",
          num:"USE_DEFAULT",
          sign:"",
          dataType:"String",
          WAS:""
        },].map((item) => ({
          ...item,
          [SELECTED_FIELDS]: selectedState[idGetters(item)],
        }))}
        style={{height:'341px',marginRight:"8px",marginLeft:"8px"}}
        fixedScroll={true}
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
        <Column className='truncate whitespace-nowrap'  field="propertyID" title="프로퍼티그룹ID" />
        <Column className='truncate whitespace-nowrap'  field="propertyName" title="프로퍼티명" />
        <Column className='truncate whitespace-nowrap'  field="propertyEx" title="유효값" />
        <Column className='truncate whitespace-nowrap'   field="firstNum" title="초기값" />
        <Column className='truncate whitespace-nowrap'   field="num" title="설정된 값"  cells={{
          data: MyCustomCell,
        }} />
        <Column className='truncate whitespace-nowrap'  field="sign" title="특이사항" />
        <Column className='truncate whitespace-nowrap'  field="dataType" title="data타입" />
        <Column className='truncate whitespace-nowrap'  field="WAS" title="WAS별 설정" cell={CustomCell} />
      </Grid>
      <div className="flex flex-row-reverse gap-1 my-[10px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{setWASVisible(false)}}/>
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
