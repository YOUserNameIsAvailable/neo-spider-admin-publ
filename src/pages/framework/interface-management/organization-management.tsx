import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon, arrowRightIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { OrganizationManagementTable } from "@/components/OrganizationManagementTable";

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
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList className="w-16 h-7" size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span className="text-sm">Items</span>
            </div>
            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span>List</span>
      </div>
      <OrganizationManagementTable />
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
