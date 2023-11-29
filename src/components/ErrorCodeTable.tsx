import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { useCallback, useState } from "react";
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

const columns = [
  { field: "오류처리 핸들러 목록", title: "오류처리 핸들러 목록"},
  { field: "", title: ""},
];

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

export function ErrorCodeTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = useState();
  const [filteredData, setFilteredData] = useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState(process(filteredData, dataState));
  const [data, setData] = useState(filteredData);

  const [visible, setVisible] = useState(false); // <8-2> Error code management - Modify error code
  const [position, setPosition] = useState<PositionInterface>({
    left: 250,
    top:20,
    width: 924,
    height: 680,
  });
  const [handlerVisible, setHandlerVisible] = useState(false); // <8-3> Error code management - Handler per error

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

  const [resultState, setResultState] = useState(
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

  const onExpandChange = useCallback(
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
          groupable={false}
          onRowClick={()=>{
            setVisible(true)
          }}
          >
          <Column
            field="budget"
            title="Error Code"
            columnMenu={ColumnMenu}
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
          />
          <Column
            field="full_name"
            title="Error Title"
            columnMenu={ColumnMenu}
            headerClassName="justify-center bg-[#adc6f4] col-width35per"
            className="col-width35per"
          />
          <Column
            field="target"
            title="Cause of error"
            columnMenu={ColumnMenu}
            headerClassName="justify-center bg-[#adc6f4] col-width35per"
            className="col-width35per"
          />
          <Column
            field="budget"
            title="Handler count"
            columnMenu={ColumnMenu}
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
          />
          <Column
            field="budget"
            width="150px"
            title="Handler per error"
            headerClassName="justify-center bg-[#adc6f4]"
            cell={(props) => (
              <td style={{ textAlign: "center" }}>
                <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={()=>{
                  setHandlerVisible(true)
                }}>
                  Handler
                </Button>
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
    {/*<8-2> Error code management - Modify error code */}
    {visible && (
        <>
        <div className="k-overlay" />
        <Window
        initialLeft={400}
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'오류코드 수정'}
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
              오류 코드 정보
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full border-[1px]  h-[30px]">
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">오류코드</label>
              <input className="w-[57%] mr-[15px] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={true} />
            <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black  h-full  flex items-center">오류레벨</label>
            <div className="flex">
             <DropDownList style={{width:'100%',marginRight:'2px',fontSize:"12px",marginLeft:'2px'}} size={'small'} data={['선택 안 함','안전','주의','경계']} defaultValue={'선택 안 함'} />
            <span className="required">*</span>
            </div>
              </div>
              </div>
              <div className="flex border-[1px]  h-[30px]">
              <div className="flex w-full items-center">
            <label className="bg-[#d1daec] text-[12px] min-w-[150px] p-1 w-[150px] text-black h-full flex items-center">오류제목</label>
              <input className="w-[78%] mr-[15px] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
            <span className="required">*</span>
              </div>
              </div>
              <div className="flex border-[1px] h-[30px]">
              <div className="flex w-full items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">기관명</label>
            <DropDownList style={{width:'20%',marginRight:'2px',fontSize:"12px",marginLeft:'2px'}} size={'small'} data={['선택 안 함','안전','주의','경계']} defaultValue={'선택 안 함'} />
              </div>
              </div>
              <div className="flex border-[1px]  h-[30px]">
              <div className="flex w-full items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">기관명</label>
            <input className="w-[80%] mr-[2px] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
              </div>
              </div>
            </div>
            </div>
            <div className="flex flex-col gap-[12px]">
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
              언어별 오류코드
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full border-[1px]  h-[30px]">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[50%] text-black h-full flex items-center">한국(KO)</label>
            <label className="bg-[#d1daec] text-[12px] p-1 w-[50%] text-black h-full flex items-center">영어(EN)</label>
              </div>
              {[
                {title:"오류제목",title2:'오류제목'},
                {title:"오류조치방법",title2:'오류조치방법'},
                {title:"오류 발생원인",title2:'오류 발생원인'},
                {title:"관련도움말 URL",title2:'관련도움말 URL'},
                {title:"관련 FAQ URL",title2:'관련 FAQ URL'},
            ].map((v)=>{
              return(
                <>
              {v.title === '오류제목' || v.title === '오류조치방법' ? 
              <div className="flex w-full border-[1px]  h-[30px]">
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.title}</label>
              <input className="w-[62%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]"  />
              </div>
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black  h-full  flex items-center">{v.title2}</label>
            <input className="w-[62%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
              </div>
              </div>:
              <div className="flex w-full border-[1px]  h-auto">
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.title}</label>
              <textarea className="w-[62%] border-[1px] ml-[2px]  my-[2px]" />
              </div>
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black  h-full  flex items-center">{v.title2}</label>
            <textarea className="w-[62%] border-[1px] ml-[2px]  my-[2px]" />
              </div>
              </div>
              }
                </>
              )
            })}
            </div>
            </div>
            <div className="flex flex-col gap-[12px]">
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
              폰뱅킹 오류메세지
              </div>
            </div>
            <div className="flex flex-col">
            <div className="flex w-full border-[1px]  h-auto">
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">한국어(KO)</label>
              <textarea className="w-[62%] border-[1px] ml-[2px]  my-[2px]" />
              </div>
              <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black  h-full  flex items-center">영어(EN)</label>
            <textarea className="w-[62%] border-[1px] ml-[2px] my-[2px]" />
              </div>
              </div>
            </div>
            </div>
            <div className="my-[10px] flex flex-row-reverse gap-[2px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{
          setVisible(false);
        }} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_menu_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

       {/*<8-1> Error code management - Modify error code */}

       {handlerVisible && (
        <>
        <div className="k-overlay" />
        <Window
        initialLeft={400}
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'오류코드별 핸들러 등록'}
          style={{minWidth:'90px',minHeight:'50px',width:"749px",height:'400px'}}
          onClose={()=>{setHandlerVisible(false)}}
        >
          <div className='flex flex-col'>
        <div className='bg-[#d1daec] h-[30px] flex items-center px-[5px] rounded-t-[4px]'>
        [ UME10116 ] - 서비스 미가입 오류
        </div>
        <form className='flex w-full h-full'>
        <Grid style={{height:'200px'}} data={[
          {'핸들러 명':"MSN 오류전송 핸들러","파라미터":""},
          {'핸들러 명':"중복확인","파라미터":""},
          {'핸들러 명':"333333","파라미터":""},
          {'핸들러 명':"123123123","파라미터":""},
      ]}>
          {['핸들러 명','파라미터'].map((v)=>{
            return(
              <Column  key={v} field={v} title={v} />
            )
          })}
        </Grid>
        <div className="flex w-[55px] h-[200px] justify-center items-center flex-col" style={{maxWidth:"55px",minWidth:"55px",borderLeftColor:'#eee',borderLeftWidth:'20px'}}>
          <img src="./images/left-arrow-red.png" className="my-[10px]" />
          <img src="./images/right-arrow-blue.png" className="my-[10px]"  />
        </div>
        <Grid style={{height:'200px'}}  data={[
          {'오류처리 핸들러 목록':"이메일 오류전송 핸들러","":""},
          {'오류처리 핸들러 목록':"HANDLE_NAME","":""},
          {'오류처리 핸들러 목록':"이메일 오류전송 핸들러","":""},
          {'오류처리 핸들러 목록':"TSETS","":""},
          
      ]}>
        {columns.map((column, index) => {
          return (
            <Column
              field={column.field}
              title={column.title}
              key={index}
              width={setPercentage(column.title === '' ? 10 : 90)}
            />
          );
        })}
        </Grid>
        </form>
        <div className="my-[10px] flex flex-row-reverse gap-7">
        <button style={{background:"url(./images/btn_error_modal_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{
          setHandlerVisible(false)
        }} />
        <button style={{background:"url(./images/btn_error_modal_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[95px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

    </>
  );
}
