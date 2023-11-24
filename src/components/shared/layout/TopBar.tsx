import { Button } from "@progress/kendo-react-buttons";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";

export function TopBar() {
  return (
    <>
      <AppBar style={{background:'url(./images/bg_topcenter.gif)',height:'53px',}}>
        <AppBarSpacer />

        <AppBarSection className="actions"></AppBarSection>

        <AppBarSection>
          <ul className="text-sm list-none flex m-0 p-0 items-center [&>li]:mx-2.5 my-0">
            <li>
              <span className="text-white p-[10px] text-[16px]">Admin</span>
            </li>
            <li>
            <span className="text-white text-[16px]">님께서 접속하셨습니다.</span>
            </li>
            <li>
              <Button style={{background:'url(./images/btn_logout_off.gif)',backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width:"70px"
                        ,height:"30px"
                        }} />
            </li>
          </ul>
        </AppBarSection>
      </AppBar>
    </>
  );
}
