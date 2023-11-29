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


export function MenuManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <3-2> Menu management - detail
  const [position, setPosition] = React.useState<PositionInterface>({
    left: 400,
    top:182,
    width: 760,
    height: 463,
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
            setVisible(true);
          }}
          >
          <Column
            field="budget"
            title="Menu ID"
            columnMenu={ColumnMenu}
            headerClassName="justify-center col-width20per"
            className="col-width20per"
          />
          <Column
            field="full_name"
            title="Menu Name"
            columnMenu={ColumnMenu}
            headerClassName="justify-center col-width30per"
            className="col-width30per"
          />
          <Column
            field="target"
            title="메뉴 URL"
            columnMenu={ColumnMenu}
            headerClassName="justify-center col-width40per"
            className="col-width40per"
          />
          <Column
            field="budget"
            title="Display"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps}>
                    <span className="flex w-full justify-center">
                      <img src="/images/radio-on-button-green.png" className="h-5 w-5" />
                    </span>
                  </td>
                );
              },
            }}
            headerClassName="justify-center col-width10per"
            className="col-width10per"
          />
          <Column
            field="budget"
            title="Use"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps}>
                    <span className="flex w-full justify-center">
                      <img src="/images/radio-on-button-green.png" className="h-5 w-5" />
                    </span>
                  </td>
                );
              },
            }}
            headerClassName="justify-center col-width10per"
            className="col-width10per"
          />
          <Column
            field="budget"
            title="Sub Menu"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"}>
                      Find
                    </Button>
                  </td>
                );
              },
            }}
            headerClassName="justify-center"
            width={100}
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
          title={'메뉴상세'}
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
                {id:'메뉴ID',type:"input",dot:true,disabled:true},
                {id:'메뉴명',type:"input",dot:true,disabled:false},
                {id:'영문메뉴명',type:"input",dot:true,disabled:false},
                {id:'상위메뉴ID',type:"input",dot:true,disabled:true},
                {id:'메뉴URL',type:"textarea",dot:true,disabled:false},
                {id:'메뉴 IMAGE',type:"input",dot:false,disabled:false},
                {id:'정렬순서',type:"input",dot:true,disabled:false},
                {id:'web App ID',type:"textarea",dot:false,disabled:false},
                {id:'출력여부',id2:'사용여부',type:"select",dot:false,disabled:false},
            ].map((v)=>{
              return(
                 <div key={v.id} className={`flex w-full border-[1px] h-${v.type === 'textarea' ? 'auto' : '[30px]'}`}>
                   <div className={`flex items-center w-[${v.type === 'input' ? 50 : 100}%]`} >
                   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
                   {v.type === 'input' ? <input className="w-full ml-[2px] py-[2px] border-[1px] border-[#999999] rounded-[2px]" disabled={v.disabled} /> :v.type === 'textarea' ?
                     <textarea className="w-full ml-[2px] my-[2px] h-auto rounded-[3px] border-[1px] border-[#999999]" />
                   :
                   <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px'}} size={'small'} data={['미사용','안전','주의','경계']} defaultValue={'미사용'} />
                   }
                    </div>
                   {v.dot ? <span className="required">*</span> : <span></span>}
                    {v.type === 'select' && 
                    <div className="flex items-center w-full">
<label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
<DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px'}} size={'small'} data={['미사용','안전','주의','경계']} defaultValue={'미사용'} />
                    </div>}
                    {v.id === '상위메뉴ID' && <div className="flex items-center text-[#FF575E] text-[12px]">
                    <button className="w-[23px] border-[#999999] h-[23px] mx-1 flex items-center justify-center border-[1px] rounded-[3px]" ><img src='./images/search.gif'/></button>
                    (상위메뉴는 검색으로만 등록 가능)
                      </div>
                      }
                  </div>
              )
            })}
            </div>
            </div>
            <div className="flex flex-row-reverse gap-[3px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" onClick={()=>{
          setVisible(false)
        }} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        <button style={{background:"url(./images/btn_menu_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
    </>
  );
}
