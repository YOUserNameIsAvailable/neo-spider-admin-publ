import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";

export function TopBar() {
  return (
    <>
      <AppBar>
        <AppBarSpacer />

        <AppBarSection className="actions"></AppBarSection>

        <AppBarSection>
          <ul className="text-sm list-none flex m-0 p-0 items-center [&>li]:mx-2.5 my-0">
            <li>
              <span>Admin</span>
            </li>
            <li>
              <span>Login OK.</span>
            </li>
            <li>
              <Button size={"small"} themeColor={"primary"}>
                Logout
              </Button>
            </li>
          </ul>
        </AppBarSection>
      </AppBar>
    </>
  );
}
