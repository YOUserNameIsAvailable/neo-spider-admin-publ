"use client";

import { MENUS } from "@/constants";
import { ITab } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";

interface TabContextType {
  tabs: ITab[];
  setTabs: Dispatch<SetStateAction<ITab[]>>;
  selectedTab: ITab;
  setSelectedTab: Dispatch<SetStateAction<ITab>>;
  selectedTabIndex: number;
}

interface TabProviderProps {
  children: ReactNode;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);

  if (!context) throw new Error("useTab must be used within a TabProvider");

  return context;
};

export const TabProvider: FC<TabProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (tabs && selectedTab) {
      sessionStorage.setItem("tabs", JSON.stringify(tabs));
      sessionStorage.setItem("selectedTab", JSON.stringify(selectedTab));
    }

    if (pathname !== selectedTab?.url && pathname.indexOf("login") == -1) {
      // console.log("selectedTab.url; ", selectedTab.url);
      selectedTab && router.push(("/main" + selectedTab.url) as string);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
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
        router.push(("/main" + sessionSelectedTab.url) as string);
      }
    } else if (selectedTab) {
      setTabs([{ text: "User Management", url: "/user-management" }]);
      setSelectedTab({ text: "User Management", url: "/user-management" });
    }
  }, []);

  const selectedTabIndex = useMemo(() => tabs.findIndex((x) => x.url === selectedTab.url), [tabs, selectedTab]);

  return (
    <TabContext.Provider value={{ tabs, setTabs, selectedTab, setSelectedTab, selectedTabIndex }}>
      {children}
    </TabContext.Provider>
  );
};
