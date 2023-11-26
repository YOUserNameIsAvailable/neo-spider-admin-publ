import {DropDownList} from "@progress/kendo-react-dropdowns";
import {PAGES, SPORTS} from "@/constants";
import {Input} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {arrowRightIcon} from "@progress/kendo-svg-icons";
import {MenuManagementTable} from "@/components/MenuManagementTable";
import React from "react";

function MenuManagement() {
    return (
        <>
            <>
                <div className="flex items-center gap-2 py-4">
                    <img src={"/images/dot_subtitle.gif"} alt=""/>
                    <span>Condition</span>
                </div>
                <div className="searchbox flex justify-between min-h-[40px] gap-2">
                    <div className="flex items-center gap-4">
                        <div className="minw input-group" style={{minWidth: '120px', marginLeft: '2px'}}>
                            <DropDownList
                                className="w-32 h-7 text-xs mr-2 ml-5"
                                size={"small"}
                                data={SPORTS}
                                defaultValue="Option 1"
                                filterable={false}
                            />

                            <Input className="w-40 h-7"/>
                        </div>

                        <div className="minw input-group" style={{minWidth: '120px', marginLeft: '2px'}}>
                            <span className="text-xs mr-2">Menu URL</span>
                            <Input className="w-40 h-7"/>
                        </div>

                        <div className="minw input-group" style={{minWidth: '120px', marginLeft: '2px'}}>
                            <span className="text-xs mr-2">Top menu ID</span>
                            <Input className="w-40 h-7"/>
                        </div>
                        <button data-role="button" role="button" className="search_btn no-text" aria-disabled="false">
                            <img src="/images/search.gif" alt=""/>
                        </button>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <DropDownList className="w-16 h-7" size={"small"} data={PAGES} defaultValue="20"
                                          filterable={false}/>
                            <span className="text-xs">Items</span>
                        </div>

                        <Button imageUrl="/images/refresh.png" className="find">Find</Button>
                    </div>
                </div>
            </>
            <div>
                <div className="flex items-center gap-2 pb-4">
                    <img src={"/images/dot_subtitle.gif"} alt="" style={{}}/>
                    <span>List</span>
                </div>
                <MenuManagementTable/>
            </div>

            <div className="flex justify-end">
                <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
                    ADD
                </Button>
            </div>
        </>
    );
}


export function Page() {
    return <MenuManagement/>;
}
