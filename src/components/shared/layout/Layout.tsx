import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  exportIcon,
  printIcon,
  searchIcon,
  xIcon,
} from "@progress/kendo-svg-icons";
import { ITab } from "@/types";
import { useTab } from "@/providers/TabProvider";
import { TopBar } from "./TopBar";
import { FC, ReactNode, useState } from "react";
import { LeftSideBar } from "../LeftSidePanel";
import { Outlet, useNavigate } from "react-router-dom";
import { BottomBar } from "./BottomBar";
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
      }}
    >
      <img className="w-3" src="/images/tab-icon.png" alt="" />
      <span>{tab.text}</span>
      {!hideClose && (
        <span
          className="!p-0 k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveTab(tab);
          }}
        >
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

  const { selectedTab, setSelectedTab, setTabs, tabs } = useTab();

  const navigate = useNavigate();

  const onSelectTab = (tab: ITab, index: number) => {
    console.log("Tab Selected", index, tab);
    navigate(tab.url as string);

    setSelectedTab(tab);
  };

  const onRemoveTab = (tab: ITab, index: number) => {
    console.log("Tab Removed", index, tab);
    const newTabs = tabs.filter((item) => item.url !== tab.url);
    setTabs(newTabs);

    if (selectedTab.url === tab.url) {
      // setSelectedTab(null); // TODO
    }

    navigate(-1);
  };

  const onChangeTab = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  return (
    <>
      {/* top bar */}
      <TopBar />

      <Splitter
        style={{ height: "calc(100dvh - 84px)" }}
        panes={panes}
        onChange={onChangeTab}
      >
        {/* left side panel */}
        <LeftSideBar />

        <div className="pane-content">
          {/* tabs */}
          <TabStrip scrollable={true}>
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
                }
              ></TabStripTab>
            ))}
          </TabStrip>

          {/* title bar */}
          <div className="title-bar">
            <div className="title">{selectedTab?.text}</div>
            <div className="flex">
              <Button
                imageUrl="/images/btn_excel_off.gif"
                className="excel-btn"
              />
              <Button
                imageUrl="/images/btn_print_off.gif"
                className="ml-px-10 print-btn"
              />
              <Button imageUrl="/images/refresh.png" className="ml-[5px] search-btn" />
            </div>
          </div>

          {/* content */}
          <div className="w-full px-4">
            <Outlet />
          </div>
        </div>
      </Splitter>

      {/* bottom bar */}
      <BottomBar />
    </>
  );
};
