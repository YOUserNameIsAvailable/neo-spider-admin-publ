import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { OrganizationGatewayTable } from "@/components/OrganizationGatewayTable";

export function Page() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>Condition</span>
        </div>
        <div className="bg-neutral-50 flex justify-between p-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Org</span>
            <DropDownList className="w-40 h-7" size={"small"} data={SPORTS} defaultValue="Option 1" filterable={true} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Adapter/Listener</span>
            <DropDownList
              className="w-40 h-7"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Req/Res</span>
            <DropDownList
              className="w-30 h-7"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />
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
      <div className="flex w-[100%]">
        <div className="flex items-center gap-2 py-4 w-[90%]">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <div className="flex gap-4 w-[20%] ">
          <Button className="flex items-center justify-start w-15 h-7 mt-2">Add row</Button>
          <Button className="flex items-center justify-start w-15 h-7 mt-2">Del row</Button>
        </div>
      </div>
      <OrganizationGatewayTable />
      <div className="flex justify-end gap-2 ">
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          Save
        </Button>
        <Button svgIcon={arrowRightIcon} className="flex items-center justify-end  mt-2">
          GATEWAY ADD
        </Button>
      </div>
    </>
  );
}
