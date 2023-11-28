"use client";

import React,{useState} from "react";
import dynamic from 'next/dynamic';
import { Input,Checkbox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList,ListItemProps } from "@progress/kendo-react-dropdowns";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import { useTab } from "@/providers/TabProvider";
import { PAGES, SPORTS } from "@/constants";
import { UserManagementTable } from "@/components/UserManagementTable";
import { Window,WindowMoveEvent } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn,getSelectedState } from '@progress/kendo-react-grid';
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import {  LocalizationProvider } from '@progress/kendo-react-intl';
import { filterBy } from "@progress/kendo-data-query";
import products from "@/utils/text.json";
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';

const columns = [
  { field: "오류처리 핸들러 목록", title: "오류처리 핸들러 목록"},
  { field: "", title: ""},
];

let data = [
  {codeGroupID:'GT00010',codeGroupName:"GT 대량거래구분"},
  {codeGroupID:'TST1213',codeGroupName:"테스트그룹"},
  {codeGroupID:'GT00009',codeGroupName:"GT_대량상태코드"},
  {codeGroupID:'GT00005',codeGroupName:"GT_사전등록이체사유"},
  {codeGroupID:'GT00008',codeGroupName:"GT_휴일처리"},
  {codeGroupID:'GT00007',codeGroupName:"GT 이체주기"},
  {codeGroupID:'GT00006',codeGroupName:"GT_송금인과의관계"},
  {codeGroupID:'GT00011',codeGroupName:"GT_거래구분"},
  {codeGroupID:'GT00012',codeGroupName:"GT 테스트구분"},
  {codeGroupID:'GT00013',codeGroupName:"GT_구분"},
  {codeGroupID:'GT00014',codeGroupName:"GT_대량거래구분"},
]

const createDataState = (dataState:any) => {
  return {
    result: process(data.slice(0), dataState),
    dataState: dataState,
  };
};

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}


export default function Page() {
  const { selectedTab } = useTab();

  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(false); // <8-3> Error code management - Handler per error

  
  const [visible1, setVisible1] = useState(false); // <8-2> Error code management - Modify error code
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 250,
  //   top:20,
  //   width: 924,
  //   height: 764,
  // });

  const [visible2,setVisible2] = useState(false);  // <9-2> Manager Log - User page access log
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 350,
  //   top:100,
  //   width: 746,
  //   height: 402,
  // });

  const [visible3,setVisible3] = useState(false);  // <2-2> User management - User detail
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 760,
  //   height: 330,
  // });

  const [visible6,setVisible6] = useState(false);  // <2-3> User management - Menu authority
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 1054,
  //   height: 735,
  // });


  const [visible4,setVisible4] = useState(false);  // <3-2> Menu management - detail
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 760,
  //   height: 346,
  // });

  const [visible5,setVisible5] = useState(false);  // <4-2> Role management - RoleMenu authority management
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 1054,
  //   height: 735,
  // });
  const [nestedPanes, setNestedPanes] = React.useState<Array<any>>([
    { size: "50%",resizable: true},
    {},
  ]);

  const [visible7,setVisible7] = useState(false);  // <5-3> Client WebApp Manage - stop selection
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 1054,
  //   height: 735,
  // });

  const [visible8,setVisible8] = useState(false);  // <7-2> Code management - code info
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 810,
  //   height: 284,
  // });

  const [visible9,setVisible9] = useState(false);  // <7-3-1> Code management - Search code group
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 810,
  //   height: 284,
  // });

  const [visible10,setVisible10] = useState(false);  // <7-3-2> Code management - Search code group
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 341,
  //   top:241,
  //   width: 810,
  //   height: 284,
  // });
  let initialState = createDataState({
    take: 8,
    skip: 0,
  });
  const [result, setResult] = React.useState(initialState.result);
  const [dataState, setDataState] = React.useState(initialState.dataState);
  const dataStateChange = (event:any) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const [visible11,setVisible11] = useState(false);  // <10-2> Property DB management - Detail view
  // const [position, setPosition] = React.useState<PositionInterface>({
  //   left: 60,
  //   top:115,
  //   width: 1110,
  //   height: 597,
  // });
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

const DATA_ITEM_KEY = "ProductID";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
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

const [visible12,setVisible12] = useState(false);  // <10-3> Property DB management - setting value per Was
// const [position, setPosition] = React.useState<PositionInterface>({
//   left: 23,
//   top:93,
//   width: 1210,
//   height: 640,
// });
const Visible12Cell = (props:any)=>{
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
const MyCustomCell = (props:any) => <Visible12Cell {...props} color={"red"} />;

const [visible13,setVisible13] = useState(false);  // <11-2> Component management - Component info
// const [position, setPosition] = React.useState<PositionInterface>({
//   left: 207,
//   top:45,
//   width: 1010,
//   height: 740,
// });

const [visible14,setVisible14] = useState(false);  // <12-2> Label Management - LABEL Manage Detail search
const [position, setPosition] = React.useState<PositionInterface>({
  left: 336,
  top:100,
  width: 810,
  height: 597,
});
const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState:any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };




const onSelectionChange = React.useCallback(
  (event:any) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  },
  [selectedState]
);
const onHeaderSelectionChange = React.useCallback((event:any) => {
  const checkboxElement = event.syntheticEvent.target;
  const checked = checkboxElement.checked;
  const newSelectedState:any = {};
  event.dataItems.forEach((item:any) => {
    newSelectedState[idGetter(item)] = checked;
  });
  setSelectedState(newSelectedState);
}, []);

const CustomCell = (props:any) => {
  return(
    <td
    >
     <button className='k-button' style={{height:"20px",backgroundColor:"#F6F6F6",borderColor:"#656565",borderRadius:'2px',width:"100px"}}>WAS별 설정</button>
    </td>
  )
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

  
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const gridWidth: number = 300;

  const setPercentage = (percentage: number) => {
    return Math.round(gridWidth / 100) * percentage;
  };


  return (
    <>
      {/* filters */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex w-full items-center gap-4">
            <DropDownList
              className="h-[30px] w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />

            <Input className="h-[24px] w-[148px] border border-[#999999]" />

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-[#6f7071]">User status:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Auth:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#6f7071]">Rank:</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList
                size={"small"}
                data={PAGES}
                defaultValue="20"
                filterable={false}
                style={{ width: "80px" }}
              />
              <span className="font-bold text-[#333333]">Items</span>
            </div>

            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>

      {/* table */}
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">List</span>
        </div>
        <UserManagementTable />
      </>

      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
      {visible3 && (
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
          onClose={()=>{setVisible3(false)}}
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
      {/* <2-3> User management - Menu authority */}

      {visible6 && (
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
          onClose={()=>{setVisible6(false)}}
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
              <GridColumn key={v} field={v} title={v} 
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
              <GridColumn key={v.id} field={v.id} title={v.id} 
              width={setPercentage(v.w)} />
            )
          })}
          </Grid>
          </div>
          </div>
          </Splitter>
        </div>
        <div className="my-[10px] flex flex-row-reverse gap-1">
            <button style={{background:"url(./images/btn_user_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[40px] h-[23px]" />
            <button style={{background:"url(./images/btn_rolemenu_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[80px] h-[23px]" />
        </div>  
          </div>
        </Window>
        </>
      )}

      {/* <3-2> Menu management - detail */}

      {visible4 && (
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
          onClose={()=>{setVisible4(false)}}
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        <button style={{background:"url(./images/btn_menu_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
      {/* <4-2> Role management - RoleMenu authority management */}

      {visible5 && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'Role메뉴 권한 관리'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible5(false)}}
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
              <GridColumn key={v} field={v} title={v} 
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
              <GridColumn key={v.id} field={v.id} title={v.id} 
              width={setPercentage(v.w)} />
            )
          })}
          </Grid>
          </div>
          </div>
          </Splitter>
        </div>
        <div className="my-[10px] flex flex-row-reverse gap-1">
            <button style={{background:"url(./images/btn_user_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[40px] h-[23px]" />
            <button style={{background:"url(./images/btn_rolemenu_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[80px] h-[23px]" />
        </div>  
          </div>
        </Window>
        </>
      )}

       {/* <5-3> Client WebApp Manage - stop selection */}

       {visible7 && (
        <>
        <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'중지 사유 등록'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible7(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
            <div className="flex flex-col gap-[12px]">
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             중지 메세지
              </div>
              <div className="text-[11px] text-[#656565] font-bold">
          (선택된 web app의 상태를 중지로 변경하고, 중지 사유를 입력합니다. )
              </div>
            </div>
            <div className="flex flex-col">
              {[
                {id:'중지 사유(국문)'},
                {id:'중지 사유(영문)'},
            ].map((v)=>{
              return(
                 <div key={v.id} className={`flex w-full border-[1px] h-[137px]`}>
                   <div className={`flex items-center w-full`} >
                   <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
                     <textarea className="w-full h-[108px] rounded-[3px] border-[1px] border-[#999999] my-[10px] mx-[15px]" />
                    </div>
                  </div>
              )
            })}
            </div>
            </div>
            <div className="flex flex-row-reverse gap-[24px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[55px] h-[23px]" />
        <button style={{background:"url(./images/btn_client_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[90px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

       {/* <7-2> Code management - code info */}

       {visible8 && (
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
          onClose={()=>{setVisible9(false)}}
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_menu_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}
       {/* <7-3-1> Code management - Search code group */}

       {visible9 && (
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
          onClose={()=>{setVisible8(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
          <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             코드 생성
              </div>
            </div>
            <div className='flex flex-col w-full'>
              {[
                {id:'코드그룹ID',id2:'코드',type:'input2',disabled:true,disabled2:false,dot1:false,dot2:true},
                {id:'코드명',id2:'코드영문명',type:'input2',disabled:false,disabled2:false,dot1:true,dot2:true},
                {id:'코드설명',id2:'',type:'input',disabled:false,disabled2:false,dot1:false,dot2:false},
                {id:'정렬순서',id2:'사용여부',type:'select',disabled:false,disabled2:false,dot1:true,dot2:true},
                {id:"라벨등록 여부",id2:'',type:'select2',disabled:false,disabled2:false,dot1:true,dot2:false}
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
              </div>
              <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
              <DropDownList style={{width:'40%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['사용','안전','주의','경계']} defaultValue={'사용'} />
              {v.dot2 && <span className='required' >*</span>}
                </div>
              </div> 
              : v.type === 'input2' ?
              <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                            <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <input className="w-[40%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled} />
              {v.id === '코드그룹ID' && <button className="w-[23px] border-[#999999] h-[23px] mx-1 flex items-center justify-center border-[1px] rounded-[3px]" onClick={()=>{setVisible10(true)}} ><img src='./images/search.gif'/></button>}
              {v.dot1 && <span className='required' >*</span>}
              </div>
            <div className="flex w-[50%] items-center">
            <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id2}</label>
              <input className="w-[40%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" disabled={v.disabled2} />
              {v.dot2 && <span className='required' >*</span>}
              </div>
                </div>
                :
                <div className="flex w-full border-[1px]  h-[30px]" key={v.id}>
                    <div className="flex w-[50%] items-center">
              <label className="bg-[#d1daec] text-[12px] p-1 w-[150px] min-w-[150px] text-black h-full flex items-center">{v.id}</label>
              <DropDownList style={{width:'30%',fontSize:"12px",marginLeft:'2px',paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['사용','안전','주의','경계']} defaultValue={'사용'} />
              {v.dot1 && <span className='required' >*</span>}
                </div>
                  </div>
              }
            </>
              )
            })}
            </div>
            <div className="flex flex-row-reverse gap-1">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

       {/* <7-3-2> Code management - Search code group */}

       {visible10 && (
        <>
          <div className="k-overlay" />
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'코드 그룹 검색'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible10(false)}}
        >
          <div className='flex flex-col gap-[15px]'>
          <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             검색 조건
              </div>
            </div>
            <div className='bg-[#DDE6F0] p-[5px] h-[40px] flex justify-between'>
            <div className='flex items-center  w-[40%]'>
            <DropDownList style={{width:'60%',fontSize:"12px",marginLeft:'8px',paddingTop:"2px",paddingBottom:'2px',marginRight:"8px",color:'#656565',fontWeight:"bold"}} size={'small'} data={['코드그룹ID','안전','주의','경계']} defaultValue={'코드그룹ID'} />
            <input className="w-[60%] border-[1px] ml-[2px] border-[#999999] py-[5px] rounded-[2px]" />
            </div>
            <div className='flex gap-[9px] items-center w-[30%] justify-end'>
            <DropDownList style={{width:'30%',fontSize:"12px",paddingTop:"2px",paddingBottom:'2px',color:'#656565'}} size={'small'} data={['20','안전','주의','경계']} defaultValue={'20'} />
            <div className='text-[14px] font-bold'>
            건씩
            </div>
            <button  style={{background:"url(./images/btn_codegroup_search.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[51px] h-[23px]" />
            </div>
            </div>
            <div className="flex pb-[4px] items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="w-[12px] h-[12px]"/>
              <div className="text-[14px] text-[#656565] font-bold">
             리스트
              </div>
            </div>
            <LocalizationProvider language="es">
            <Grid
      data={result}
      {...dataState}
      onDataStateChange={dataStateChange}
      sortable={true}
      pageable={true}
      pageSize={8}
      
    >
      <GridColumn field='codeGroupID' title='코드그룹ID' />
      <GridColumn field='codeGroupName' title='코드그룹명' />
    </Grid>
    </LocalizationProvider>
            <div className="flex flex-row-reverse gap-1">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

       {/* <10-2> Property DB management - Detail view */}

       {visible11 && (
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
          onClose={()=>{setVisible11(false)}}
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
        data={checkData}
        style={{height:'300px'}}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
      >
        <GridColumn className='truncate whitespace-nowrap'
          field={SELECTED_FIELD}
        />
        <GridColumn className='truncate whitespace-nowrap' field="CRUD" title="CRUD"  width={setPercentage(20)} />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyID" title="프로퍼티ID" />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyName" title="프로퍼티명" />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyEx" title="프로퍼티 설명" />
        <GridColumn className='truncate whitespace-nowrap'   field="firstNum" title="초기값" />
        <GridColumn className='truncate whitespace-nowrap'   field="num" title="유효값" />
        <GridColumn className='truncate whitespace-nowrap'  field="dataType" title="data타입" />
        <GridColumn className='truncate whitespace-nowrap'  field="WAS" title="WAS별 설정" cell={CustomCell} />
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
              </div>
        </div>
          </div>
        </Window>
        </>
      )}

       {/* <10-3> Property DB management - setting value per Was */}

       {visible12 && (
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
          onClose={()=>{setVisible12(false)}}
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
        },]}
        style={{height:'341px',marginRight:"8px",marginLeft:"8px"}}
        fixedScroll={true}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
      >
        <GridColumn className='truncate whitespace-nowrap'
          field={SELECTED_FIELD}
        />
        <GridColumn className='truncate whitespace-nowrap' field="CRUD" title="CRUD"  width={setPercentage(20)} />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyID" title="프로퍼티그룹ID" />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyName" title="프로퍼티명" />
        <GridColumn className='truncate whitespace-nowrap'  field="propertyEx" title="유효값" />
        <GridColumn className='truncate whitespace-nowrap'   field="firstNum" title="초기값" />
        <GridColumn className='truncate whitespace-nowrap'   field="num" title="설정된 값"  cells={{
          data: MyCustomCell,
        }} />
        <GridColumn className='truncate whitespace-nowrap'  field="sign" title="특이사항" />
        <GridColumn className='truncate whitespace-nowrap'  field="dataType" title="data타입" />
        <GridColumn className='truncate whitespace-nowrap'  field="WAS" title="WAS별 설정" cell={CustomCell} />
      </Grid>
      <div className="flex flex-row-reverse gap-1 my-[10px]">
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
          </div>
        </Window>
        </>
      )}

       {/* <11-2> Component management - Component info */}

       {visible13 && (
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
          onClose={()=>{setVisible13(false)}}
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
        data={[ 
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
      ]}
        style={{height:'300px'}}
        fixedScroll={true}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
      >
        <GridColumn className='truncate whitespace-nowrap'
          field={SELECTED_FIELD}
        />
        <GridColumn className='truncate whitespace-nowrap' field="CRUD" title="CRUD"  width={setPercentage(20)} />
        <GridColumn className='flex justify-center items-center'  field="num" title="파라미터 일련번호" />
        <GridColumn className='truncate whitespace-nowrap'  field="keys" title="파라미터 키" />
        <GridColumn className='truncate whitespace-nowrap'  field="EX" title="파라미터 설명" />
        <GridColumn className='truncate whitespace-nowrap'   field="default" title="초기값" />
      </Grid>
      <div className='flex flex-row-reverse'>
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_all_delete.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[73px] h-[23px]" />
              </div>
          </div>
        </Window>
        </>
      )}

       {/* <12-2> Label Management - LABEL Manage Detail search */}

       {visible14 && (
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
          onClose={()=>{setVisible14(false)}}
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
              </div>
          </div>
        </Window>
        </>
      )}

       {/*<8-1> Error code management - Modify error code */}

      {visible && (
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
          onClose={()=>{setVisible(false)}}
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
              <GridColumn  key={v} field={v} title={v} />
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
            <GridColumn
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
        <button style={{background:"url(./images/btn_error_modal_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_modal_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[95px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}

 {/*<8-2> Error code management - Modify error code */}
      {visible1 && (
        <>
        <div className="k-overlay" />
        <Window
        initialLeft={400}
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'오류코드 등록'}
          left={position.left}
          top={position.top}
          width={position.width}
          height={position.height}
          onMove={handleMove}
          onResize={handleResize}
          onClose={()=>{setVisible1(false)}}
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
              <input className="w-[57%] mr-[15px] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
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
              <input className="w-[62%] border-[1px] ml-[2px] border-[1px] border-[#999999] py-[2px] rounded-[2px]" />
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        <button style={{background:"url(./images/btn_error_report_save.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}


 {/* <9-2> Manager Log - User page access log */}

      {visible2 && (
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
          onClose={()=>{setVisible2(false)}}
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
        <button style={{background:"url(./images/btn_error_report_close.png)",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="w-[54px] h-[23px]" />
        </div>
          </div>
        </Window>
        </>
      )}


    </>
  );
}
