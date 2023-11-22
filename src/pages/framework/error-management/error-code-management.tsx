import { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { ErrorCodeTable } from "@/components/ErrorCodeTable";

export function ErrorCode() {
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
            Enlargement/Reduction
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

            <Input className="w-40 h-7" />

            <div className="flex items-center gap-2">
              <span className="text-sm">Error handler</span>
              <DropDownList
                className="w-40 h-7"
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
        {/* exandable */}
        {isExpanded ? (
          <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Tran name</span>
                <DropDownList
                  className="w-60 h-7"
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
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <ErrorCodeTable />
      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          ADD
        </Button>
      </div>
    </>
  );
}

export default function Page() {
  return <div>Works!</div>;
}
