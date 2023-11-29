"use client";

import { MENU_ITEMS } from "@/constants";
// import { DEFAULT_TAB, MENUS } from "@/constants";
import { ITab } from "@/types";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const item = MENU_ITEMS.find((x) => x.url === pathname);

  const [tabs, setTabs] = useState<ITab[]>(item ? [item] : []);
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  const router = useRouter();

  useEffect(() => {
    selectedTab && router.push(selectedTab.url as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const selectedTabIndex = useMemo(() => tabs.findIndex((x) => x.url === selectedTab.url), [tabs, selectedTab]);

  return (
    <TabContext.Provider value={{ tabs, setTabs, selectedTab, setSelectedTab, selectedTabIndex }}>
      {children}
    </TabContext.Provider>
  );
};
