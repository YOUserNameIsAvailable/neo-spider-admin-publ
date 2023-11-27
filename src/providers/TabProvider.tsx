"use client";

import { MENUS } from "@/constants";
import { ITab } from "@/types";
import { useRouter } from "next/navigation";
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
  const [tabs, setTabs] = useState<ITab[]>([...MENUS.filter((x) => x.url === "/service-management")]);
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
