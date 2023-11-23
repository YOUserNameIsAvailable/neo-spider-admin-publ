import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { SPORTS } from "@/constants";
import { WasStatusMonitorTable } from "@/components/WasStatusMonitorTable";

export function Page() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Instance</span>
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Gateway</span>
              <DropDownList
                className="w-40 h-7"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Operating mode classification</span>
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
            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <WasStatusMonitorTable />
    </>
  );
}
