import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";

export function TopBar() {
  return (
    <AppBar style={{ background: "url(./images/bg_topcenter.gif)", height: "53px" }}>
      <AppBarSpacer />

      <AppBarSection className="actions"></AppBarSection>

      <AppBarSection>
        <ul className="m-0 my-0 flex list-none items-center p-0 text-sm [&>li]:mx-2.5">
          <li>
            <span className="p-[10px] text-[16px] text-white">Admin</span>
          </li>
          <li>
            <span className="text-[16px] text-white">님께서 접속하셨습니다.</span>
          </li>
          <li>
            <Button
              style={{
                background: "url(./images/btn_logout_off.gif)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "70px",
                height: "30px",
              }}
            />
          </li>
        </ul>
      </AppBarSection>
    </AppBar>
  );
}
