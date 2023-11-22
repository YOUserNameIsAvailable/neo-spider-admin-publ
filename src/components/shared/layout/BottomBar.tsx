import { SPORTS } from "@/constants";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { AppBar, AppBarSection } from "@progress/kendo-react-layout";
import { FC } from "react";

export const BottomBar: FC = () => {
  return (
    <>
      <AppBar className="border-t-2 border-t-gray-200">
        <AppBarSection>
          <ul className="text-sm list-none flex m-0 p-0 items-center [&>li]:mx-2.5 my-0">
            <li>
              <ComboBox
                className="text-sm !w-44"
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
    </>
  );
};
