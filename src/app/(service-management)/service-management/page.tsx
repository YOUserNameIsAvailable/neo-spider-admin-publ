"use client";

import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { PAGES, SPORTS } from "@/constants";
import { ServiceManagementTable } from "@/components/ServiceManagementTable";
import { Window } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const CustomCell = (props:any) => {
    return (
      <div
        style={{
          backgroundColor:'#adc6f4',
          fontSize:"12px",
          padding:"6px",
          fontWeight:'bold',
          color:"black",
          textAlign:'center'
        }}
      >
        {props.title}
      </div>
    );
  };


  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
          <button className="bg-neutral-50 p-2" onClick={() => toggleExpansion()}>
            Expand/Colapse
          </button>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <DropDownList
              className="w-32 h-7"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <Input className="w-40 h-7" />
            </div>
            <DropDownList
              className="w-32 h-7"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <Input className="w-40 h-7" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="w-16 h-7" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-sm">Items</span>
            </div>

            <Button svgIcon={searchIcon} onClick={()=>{setVisible(true)}}>Find</Button>
          </div>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
          <div className="flex items-center gap-2">
            <span className="text-sm">Biz class</span>
            <DropDownList
              className="w-32 h-7"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">Service state</span>
              <DropDownList
                className="w-32 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <>
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Service type</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Request channel</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">SELECT SORT</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <p className="pr-12">Option</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Check login</span>

                <Checkbox />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Save secure sign</span>

                <Checkbox />
              </div>{" "}
              <div className="flex items-center gap-2">
                <span className="text-sm">Check status of other banks</span>

                <Checkbox />
              </div>
            </div>
          </div>
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 ">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2  pl-20">
                <span className="text-sm ">Bizday service</span>

                <Checkbox />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Saturday service</span>

                <Checkbox />
              </div>{" "}
              <div className="flex items-center gap-2">
                <span className="text-sm">Holiday service</span>

                <Checkbox />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* table */}

      <div className="flex w-[100%]">
        <div className="flex items-center gap-2 py-4 w-[65%]">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <div className="flex gap-4 w-[10%] ">
          <Button svgIcon={arrowRightIcon} className="flex items-center justify-start w-50  h-7 mt-2 ">
            View service naming rule
          </Button>
          <Button svgIcon={arrowRightIcon} className="flex items-center justify-start w-32 h-7 mt-2">
            Access user list
          </Button>
        </div>
      </div>
      <ServiceManagementTable />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          ADD
        </Button>
      </div>
      {visible && (
        <Window
          minimizeButton={() => null}
          maximizeButton={() => null}
          restoreButton={() => null}
          doubleClickStageChange={false}
          title={'오류코드별 핸들러 등록'}
          style={{minWidth:'300px',minHeight:'300px',width:"710px",height:'400px'}}
          onClose={()=>{setVisible(false)}}
        >
          <div className='flex flex-col'>
        <div className='bg-[#d1daec] h-[30px] flex items-center px-[5px] rounded-t-[4px]'>
        [ UME10116 ] - 서비스 미가입 오류
        </div>
        <form className='flex'>
        <Grid style={{height:'200px',borderRightColor:'#eee',borderRightWidth:'20px'}}>
          {['핸들러 명','파라미터'].map((v)=>{
            return(
              <GridColumn className="bg-[#adc6f4]"  key={v} field={v} title={v} width={'150px'} headerCell={CustomCell} />
            )
          })}
        </Grid>
        </form>
          </div>
        </Window>
      )}
    </>
  );
}
