import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";

export function TopBar() {
  return (
    <AppBar>
      <AppBarSpacer />

      <AppBarSection className="actions"></AppBarSection>

      <AppBarSection>
        <ul className="m-0 my-0 flex list-none items-center p-0 text-sm [&>li]:mx-2.5">
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
  );
}
