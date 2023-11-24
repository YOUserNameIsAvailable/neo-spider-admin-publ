import { SPORTS } from "@/constants";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { FC } from "react";

export const BottomBar: FC = () => {
  return (
    <AppBar className="border-t-2 border-t-gray-200">
      <AppBarSection>
        <ul className="m-0 my-0 flex list-none items-center p-0 text-sm [&>li]:mx-2.5">
          <li>
            <ComboBox
              className="!w-44 text-sm"
              size={"small"}
              fillMode={"solid"}
              data={SPORTS}
              placeholder="Select Options"
              clearButton={false}
            />
          </li>
          <li>
            <span>
              <img className="w-6" src="/images/btn_backup_green.png" alt="" />
            </span>
          </li>
          <li>
            <span>
              <img className="w-6" src="/images/btn_cloasetab.png" alt="" />
            </span>
          </li>
        </ul>
      </AppBarSection>
    </AppBar>
  );
};
