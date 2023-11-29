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
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';
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

export function UserManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <2-2> User management - User detail
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 341,
    top:241,
    width: 760,
    height: 330,
  });

  const [visible2,setVisible2] = React.useState(false);  // <2-3> User management - Menu authority

  const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([
    { size: "50%",resizable: true},
    {},
  ]);

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
          onRowClick={()=>{
            setPosition({
              left: 341,
              top:241,
              width: 760,
              height: 330,
            });
            setVisible(true);
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
          groupable={false}>
          <Column
            field="budget"
            title="User ID"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="User Name"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="Rank"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Emp no"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Role name"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Belong"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="User status"
            headerClassName="justify-center bg-[#adc6f4] col-width11per"
            className="col-width11per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Modified  date"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="Menu init"
            title="Menu init"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Reset
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="Menu authority"
            title="Menu authorityt"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"} onClick={()=>{
                      setPosition({
                        left: 111,
                        top:37,
                        width: 1107,
                        height: 735,
                      });
                      setVisible2(true);
                    }}>
                      Menu
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="Status(Error count)"
            title="Status(Error count)"
            width="100px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Unloack(0)
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="DO Login"
            title="DO Login"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Login
                    </Button>
                  </td>
                );
              },
            }}
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
    {visible && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'사용자 상세'}
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
             상세정보
              </div>
            </div>
            <div className="flex flex-col">
              {[
                {id:'사용자ID',id2:'사용자명',type:"input",dot1:true,dot2:true,disabled:true},
                {id:'패스워드',id2:'접근 허용 IP',type:"input2",dot1:false,dot2:true,disabled:false},
                {id:'직번',id2:'지점코드',type:"input",dot1:true,dot2:false,disabled:false},
                {id:'연락처(-생략)',id2:'이메일',type:"input",dot1:false,dot2:false,disabled:false},
                {id:'권한명',id2:'직급',type:"select",dot1:true,dot2:false,disabled:false},
                {id:'부서명',id2:'사용자 상태',type:"select2",dot1:true,dot2:false,disabled:false},
            ].map((v)=>{
              return(
                <div key={v.id} className="flex w-full border-[1px]  h-[30px]">
                <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
                {v.type === 'input2' ? <button style={{background:"url(./images/btn_user_detail_reset.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[66px] h-[21px]" /> :v.type === 'select' ?  <DropDownList style={{width:'40%',marginRight:'2px',fontSize:"12px",marginLeft:'2px'}} size={'small'} data={['선택 안 함','안전','주의','경계']} defaultValue={'선택 안 함'} />  :<input className="w-[45%] border-[1px] ml-[2px] mr-[2px] py-[2px] border-[1px] border-[#999999] rounded-[2px]" disabled={v.disabled} />}
                {v.dot1 && <span className="required">*</span>}
                </div>
                <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black  h-full  flex items-center">{v.id2}</label>
              {v.type === 'select' || v.type === 'select2' ? <DropDownList style={{width:'40%',marginRight:'2px',fontSize:"12px",marginLeft:'2px'}} size={'small'} data={['선택 안 함','안전','주의','경계']} defaultValue={'선택 안 함'} /> :<input className="w-[45%] border-[1px] ml-[2px] mr-[2px] py-[2px] border-[1px] border-[#999999] rounded-[2px]" />}
              {v.dot2 && <span className="required">*</span>}
                </div>
                </div>
              )
            })}
            </div>
            </div>
            <div className="flex flex-row-reverse">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{setVisible(false)}} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

            {/* <2-3> User management - Menu authority */}
       {visible2 && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'사용자 메뉴 권한 관리'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible2(false)}}
        >
          <div className='flex flex-col w-full p-4'>
        <div className="pb-[10px] text-[17px] font-bold text-[#656565]">
          권한ID별 메뉴 권한 체크
        </div>
        <div className="flex w-full h-[75vh]">
      <Splitter  panes={nestedPanes}
        onChange={(e)=>{setNestedPanes(e.newState)}}>
          <div className="flex flex-col w-full gap-[15px] border-[1px]">
          <div className="flex items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             권한ID 메뉴를 뺀 메뉴 목록
              </div>
          </div>
          <div className="flex flex-col">
          <div className="h-[40px] bg-[#dde6f0] py-[7px] px-[13px] flex items-center gap-[8px]">
          <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',fontWeight:'bold',color:'#656565'}} size={'small'} data={['메뉴명','안전','주의','경계']} defaultValue={'메뉴명'} />
          <input className="w-[30%] ml-[2px] py-[6px] border-[1px] border-[#999999] rounded-[2px]" />
          </div>
          <Grid className="h-[88%]" rowHeight={29}  fixedScroll={true} data={[
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"nsb_msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > M_거래관리"},
          {'메뉴ID':"message_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 전문 관리"},
          {'메뉴ID':"neb_msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > N_전문등록조회"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          {'메뉴ID':"msg_trx_manage","메뉴명":"Framework 관리메뉴 > 거래전문 관리 > 거래관리"},
          
      ]}>
          {['메뉴ID','메뉴명'].map((v)=>{
            return(
              <Column key={v} field={v} title={v} 
              width={setPercentage(v === '메뉴ID' ? 50 : 120)} />
            )
          })}
          </Grid>
          </div>
          </div>
            <div className="flex flex-col w-full gap-[15px] border-[1px]">
          <div className="flex items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             권한ID 메뉴 목록
              </div>
          </div>
          <div className="flex flex-col">
          <Grid className="h-[88%]" rowHeight={29}  fixedScroll={true}>
          {[
            {id:'메뉴ID',w:30},
            {id:'메뉴명',w:80},
            {id:'Read',w:20},
            {id:'R/Write',w:25}].map((v)=>{
            return(
              <Column key={v.id} field={v.id} title={v.id} 
              width={setPercentage(v.w)} />
            )
          })}
          </Grid>
          </div>
          </div>
          </Splitter>
        </div>
        <div className="my-[10px] flex flex-row-reverse gap-1">
            <button style={{background:"url(./images/btn_user_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[40px] h-[23px]" onClick={()=>{setVisible2(false)}} />
            <button style={{background:"url(./images/btn_rolemenu_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[80px] h-[23px]" />
        </div>  
          </div>
        </Window>
        </>
      )}
    </>
  );
}
