import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import dynamic from 'next/dynamic';
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';
import { DropDownList } from "@progress/kendo-react-dropdowns";

import { Button } from "@progress/kendo-react-buttons";
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';

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


export function LabelManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const [visible,setVisible] = React.useState(false);  // <12-2> Label Management - LABEL Manage Detail search
const [position, setPosition] = React.useState<PositionInterface>({
  left: 336,
  top:100,
  width: 810,
  height: 620,
});

const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

const onEditorStateChange = (editorState:any) => {
  // editorState에 값 설정
  setEditorState(editorState);
};

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
            title="LABEL ID"
            headerClassName="justify-center bg-[#adc6f4] col-width40per"
            className="col-width40per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="LABEL Distinction"
            headerClassName="justify-center bg-[#adc6f4] col-width20per"
            className="col-width20per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="LABEL Description"
            headerClassName="justify-center bg-[#adc6f4] col-width40per"
            className="col-width40per"
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
     {/* <12-2> Label Management - LABEL Manage Detail search */}

     {visible && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'LABEL 등록'}
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
             Lable 정보
              </div>
            </div>
            <div className='flex flex-col w-full'>
              {[
                {id:'LABEL ID',id2:'LABEL 구분',type:'input',dot1:true,dot2:false},
                {id:'LABEL 설명',id2:'',type:'input1',dot1:false,dot2:true},
                {id:'변경사유',id2:'',type:'input1',dot1:false,dot2:true},
            ].map((v)=>{
              return(
                <>  
              {v.type === 'input' ? 
                   <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                   <div className="flex w-[50%] items-center">
   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
     <input className="w-[50%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
     {v.dot1 && <span className='required' >*</span>}
     </div>
   <div className="flex w-[50%] items-center">
   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
   <DropDownList style={{width:'35%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['선택 안 함','안전','주의','경계']} defaultValue={'선택 안 함'} />
     {v.dot2 && <span className='required' >*</span>}
     </div>
       </div>
              : 
                <div className="flex w-full border-[1px] h-[30px]" key={v.id}>
                    <div className="flex w-full items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <input className="w-[75%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
              {v.dot1 && <span className='required' >*</span>}
                </div>
                  </div>
              }
            </>
              )
            })}
            </div>
            <div className='flex items-center gap-1 my-[10px]'>
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             LABEL TEXT
              </div>
            </div>
            <Editor 
          // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
      <div className='flex flex-row-reverse'>
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" onClick={()=>{
          setVisible(false)
        }} />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
              </div>
          </div>
        </Window>
        </>
      )}

    </>
  );
}
