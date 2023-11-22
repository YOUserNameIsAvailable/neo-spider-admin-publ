import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { xIcon } from "@progress/kendo-svg-icons";
import { ITab } from "@/types";
import { useTab } from "@/providers/TabProvider";
import { TopBar } from "./TopBar";
import { FC, ReactNode, useState } from "react";
import { LeftSideBar } from "../LeftSidePanel";

const TabTitle = ({
  tab,
  onTabRemove,
  hideClose,
}: {
  tab: ITab;
  onTabRemove: (tab: ITab) => void;
  hideClose?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <img className="w-3" src="/images/tab-icon.png" alt="" />
      <span>{tab.title}</span>
      {!hideClose && (
        <span
          className="!p-0 k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button"
          onClick={() => onTabRemove(tab)}
        >
          <SvgIcon icon={xIcon} size="small" className="" />
        </span>
      )}
    </div>
  );
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    { size: "20%", min: "290px", collapsible: true },
    {},
    { size: "80%", min: "20px", collapsible: false },
  ]);

  const { selectedTabIndex, setSelectedTabIndex, setTabs, tabs } = useTab();

  const onSelectTab = (e: TabStripSelectEventArguments) => {
    setSelectedTabIndex(e.selected);
  };

  const onRemoveTab = (tab: ITab) => {
    const newTabs = tabs.filter((item) => item.id !== tab.id);
    setTabs(newTabs);
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
          <TabStrip selected={selectedTabIndex} scrollable={true} onSelect={onSelectTab}>
            {tabs.map((tab, index) => (
              <TabStripTab
                key={tab.id}
                title={<TabTitle tab={tab} onTabRemove={onRemoveTab} hideClose={index === 0} />}
              >
                {/* content */}
                {children}
              </TabStripTab>
            ))}
          </TabStrip>
        </div>
      </Splitter>

      {/* bottom bar */}
    </>
  );
};
