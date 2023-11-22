import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ErrotCauseTable } from "@/components/ErrorCauseTable";
import { PAGES } from "@/constants";

function ErrorCause() {
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
            Enlargement / Reduction
          </button>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Error code</span>
              <Input className="w-40 h-7" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Customer ID</span>
              <Input className="w-40 h-7" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Customer tel</span>
              <Input className="w-40 h-7" />
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
      </div>
      {isExpanded ? (
        <div className="bg-neutral-50 flex justify-between p-4 gap-4 border-t-2  border-grey-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input className="w-40 h-7" type="date" />
              <span className="text-sm">
                ~
                <Input className="w-40 h-7" type="date" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <ErrotCauseTable />
    </>
  );
}

export default function Page() {
  return <ErrorCause />;
}
