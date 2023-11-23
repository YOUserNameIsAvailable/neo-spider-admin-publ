import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { SPORTS, PAGES } from "@/constants";
import { ListenerConnectorMapTable } from "@/components/ListenerConnectorMapTable";

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
              <span className="text-sm">Listener gateway</span>
              <DropDownList
                className="w-60 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
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
                <span className="text-sm">Response connector gateway</span>
                <DropDownList
                  className="w-60 h-7"
                  size={"small"}
                  data={SPORTS}
                  defaultValue="Option 1"
                  filterable={false}
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
      <ListenerConnectorMapTable />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          ADD
        </Button>
      </div>
    </>
  );
}
