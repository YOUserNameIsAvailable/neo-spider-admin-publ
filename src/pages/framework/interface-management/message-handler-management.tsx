import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { MessagehandlerTable } from "@/components/MessagehandlerTable";

export function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
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
              <span className="text-sm">Org name</span>
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Transaction division</span>
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={true}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="w-16 h-7" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-sm">Items</span>
            </div>
            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
        {isExpanded ? (
          <div className="bg-neutral-50 flex justify-between p-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">I/O type</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Operating mode classification</span>
                <DropDownList
                  className="w-40 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={true}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <MessagehandlerTable />
      <div className="flex justify-end gap-2 ">
        <Button className="flex items-center justify-end mt-2">Add row</Button>
        <Button className="flex items-center justify-end  mt-2">Del row</Button>
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          Save
        </Button>
      </div>
    </>
  );
}
