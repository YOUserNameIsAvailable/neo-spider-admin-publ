import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
  TabStrip,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { exportIcon, printIcon, searchIcon, xIcon } from "@progress/kendo-svg-icons";
import { ITab } from "@/types";
import { useTab } from "@/providers/TabProvider";
import { TopBar } from "./TopBar";
import { FC, ReactNode, useEffect, useState } from "react";
import { LeftSideBar } from "../LeftSidePanel";
import { BottomBar } from "./BottomBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@progress/kendo-react-buttons";

const TabTitle = ({
  tab,
  onSelectTab,
  onRemoveTab,
  hideClose,
}: {
  tab: ITab;
  onSelectTab: (tab: ITab) => void;
  onRemoveTab: (tab: ITab) => void;
  hideClose?: boolean;
}) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5"
      onClick={(e) => {
        e.stopPropagation();
        onSelectTab(tab);
      }}>
      <img className="w-3" src="/images/tab-icon.png" alt="" />
      <span>{tab.text}</span>
      {!hideClose && (
        <span
          className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button !p-0"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveTab(tab);
          }}>
          <SvgIcon icon={xIcon} size="small" className="" />
        </span>
      )}
    </div>
  );
};

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    { size: "20%", min: "290px", collapsible: true },
    {},
    { size: "80%", min: "20px", collapsible: false },
  ]);

  const { tabs, selectedTab, selectedTabIndex, setSelectedTab, setTabs } = useTab();

  const router = useRouter();

  // const pathname = usePathname()
  // const searchParams = useSearchParams()

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`
  //   console.log(url)
  //   // You can now use the current URL
  //   // ...
  // }, [pathname, searchParams])

  const onSelectTab = (tab: ITab, index: number) => {
    setSelectedTab(tab);
  };

  const onRemoveTab = (tab: ITab, index: number) => {
    const newTabs = tabs.filter((item) => item.url !== tab.url);
    setTabs(newTabs);

    if (selectedTab.url === tab.url) {
      // setSelectedTab(null); // TODO
    }

    // navigate(-1);
  };

  const onChangeTab = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  return (
    <>
      {/* top bar */}
      <TopBar />

      <Splitter style={{ height: "calc(100dvh - 84px)" }} panes={panes} onChange={onChangeTab}>
        {/* left side panel */}
        <LeftSideBar />

        <div className="pane-content">
          {/* tabs */}
          <TabStrip selected={selectedTabIndex} scrollable={true}>
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
                }></TabStripTab>
            ))}
          </TabStrip>

          {/* title bar */}
          <div className="title-bar">
            <div className="title">{selectedTab?.text}</div>
            <div className="actions">
              <Button svgIcon={exportIcon}>Export</Button>
              <Button svgIcon={printIcon}>Print</Button>
              <Button svgIcon={searchIcon} />
            </div>
          </div>

          {/* content */}
          <div className="w-full px-4">{children}</div>
        </div>
      </Splitter>

      {/* bottom bar */}
      <BottomBar />
    </>
  );
};
