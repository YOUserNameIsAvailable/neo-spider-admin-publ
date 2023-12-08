import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
  TabStrip,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { ITab } from "@/types";
import { useTab } from "@/providers/TabProvider";
import { TopBar } from "./TopBar";
import { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { LeftSideBar } from "../LeftSidePanel";
import { BottomBar } from "./BottomBar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@progress/kendo-react-buttons";
import { TabTitle } from "./TapTitle";
import { Loader } from "@progress/kendo-react-indicators";
import Loading from "@/components/loading";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    {
      size: "249px",
      max: "249px",
      collapsible: true,
    },
    {},
    {
      size: "80%",
      min: "20px",
      collapsible: false,
    },
  ]);
  const [isClose, setIsClose] = useState(false);

  const { tabs, selectedTab, selectedTabIndex, setSelectedTab, setTabs } = useTab();

  const router = useRouter();

  const onSelectTab = (tab: ITab, index: number) => {
    setSelectedTab(tab);
  };

  const onRemoveTab = (tab: ITab, index: number) => {
    const newTabs = tabs.filter((item) => item.url !== tab.url);
    setTabs(newTabs);

    console.log("selectedTabIndex: ", selectedTabIndex);

    if (selectedTab.url === tab.url) {
      const prevTab = newTabs[newTabs.length - 1];
      setSelectedTab(prevTab);
      router.push(prevTab.url as string);
      // setSelectedTab(null); // TODO
    }

    // navigate(-1);
  };

  const onChangeTab = (event: SplitterOnChangeEvent) => {
    console.log("event.newState: ", event.newState);
    setPanes(event.newState);
  };

  const clickCollapseBtn = () => {
    if (isClose) {
      setPanes([
        {
          collapsible: true,
          collapsed: false,
          resizable: true,
          scrollable: true,
          size: "249px",
          max: "249px",
        },
        {
          collapsible: false,
          collapsed: false,
          resizable: true,
          scrollable: true,
        },
      ]);
      setIsClose((prevState) => !prevState);
    } else {
      setPanes([
        {
          collapsible: true,
          collapsed: false,
          resizable: true,
          scrollable: true,
          size: "100px",
          max: "249px",
        },
        {
          collapsible: false,
          collapsed: false,
          resizable: true,
          scrollable: true,
        },
      ]);
      setIsClose((prevState) => !prevState);
    }
  };

  const tabHandler = () => {
    const sessionTabsJson = sessionStorage.getItem("tabs") || "undefined";
    const sessionSelectedTabJson = sessionStorage.getItem("selectedTab") || "undefined";
    if (
      sessionTabsJson &&
      sessionSelectedTabJson &&
      sessionTabsJson !== "undefined" &&
      sessionSelectedTabJson !== "undefined"
    ) {
      const sessionTabs = JSON.parse(sessionTabsJson);
      const sessionSelectedTab = JSON.parse(sessionSelectedTabJson);
      const isLoginPage = pathname.indexOf("login") > -1;

      console.log("sessionTabs: ", sessionTabs);
      console.log("sessionSelectedTab: ", sessionSelectedTab);

      setTabs(sessionTabs);
      setSelectedTab(sessionSelectedTab);

      if (!isLoginPage && pathname !== sessionSelectedTab.url) {
        router.push(sessionSelectedTab.url as string);
      }
    }
  };

  useEffect(() => {
    tabHandler();
  }, []);

  return (
    <>
      {/* top bar */}
      <TopBar />

      <Splitter
        className="custom-splitter"
        style={{
          height: "calc(100dvh - 91px)",
          border: "none",
          background: "linear-gradient( to bottom, rgba(227, 234, 242, 1) 1%, rgba(30, 84, 158, 1) 100% )",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
        panes={panes}
        onChange={onChangeTab}>
        {/* left side panel */}
        <div className="h-full overflow-x-hidden">
          <LeftSideBar clickCollapseBtn={clickCollapseBtn} />
        </div>

        <div className="pane-content h-full">
          {/* tabs */}
          <TabStrip selected={selectedTabIndex} scrollable={true} className="layout-tabstrip">
            {tabs.map((tab, index) => (
              <TabStripTab
                key={tab.url}
                title={
                  <TabTitle
                    tab={tab}
                    onSelectTab={(e) => onSelectTab(e, index)}
                    onRemoveTab={(e) => onRemoveTab(e, index)}
                    hideClose={index === 0}
                  />
                }>
                {/* title bar */}
                <div className="title-bar">
                  <div className="title text-[15px] font-bold text-[#656565]">{selectedTab?.text}</div>
                  <div className="actions">
                    <Button imageUrl="/images/btn_excel_off.gif" className="excel-btn" />
                    <Button imageUrl="/images/btn_print_off.gif" className="ml-px-10 print-btn" />
                    <Button imageUrl="/images/refresh.png" className="search-btn ml-[5px]" />
                  </div>
                </div>

                {/* content */}
                <div className="h-[100vh] w-full bg-[#fff] px-4">
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </div>
              </TabStripTab>
            ))}
          </TabStrip>
        </div>
      </Splitter>

      {/* bottom bar */}
      <BottomBar />
    </>
  );
};
