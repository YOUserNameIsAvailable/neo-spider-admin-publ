import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { CodeManageTable } from "@/components/CodemanageTable";

function CodeManage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
          <button className="bg-neutral-50 p-2" onClick={() => toggleExpansion()}>
            Expand / Colapse
          </button>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Code group per biz group</span>
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
            <DropDownList className="w-48 h-7" size={"small"} data={SPORTS} defaultValue="Option 1" filterable={true} />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="w-16 h-7" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-sm">Items</span>
            </div>
            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
            <Input className="w-40 h-7" />
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <CodeManageTable />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          ADD
        </Button>
      </div>
    </>
  );
}

export function Page() {
  return <CodeManage />;
}
