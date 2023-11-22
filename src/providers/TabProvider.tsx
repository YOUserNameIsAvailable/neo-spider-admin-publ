import { ITab } from "@/types";
import { createContext, useContext, ReactNode, FC, useState, Dispatch, SetStateAction, useMemo } from "react";

interface TabContextType {
  tabs: ITab[];
  setTabs: Dispatch<SetStateAction<ITab[]>>;
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
  selectedTab: ITab;
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
  const [tabs, setTabs] = useState<ITab[]>([
    {
      id: "user-management",
      title: "User Management",
      componentName: "UserManagement",
    },
  ]);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const selectedTab = useMemo(() => tabs[selectedTabIndex], [tabs, selectedTabIndex]);

  return (
    <TabContext.Provider value={{ tabs, setTabs, selectedTab, selectedTabIndex, setSelectedTabIndex }}>
      {children}
    </TabContext.Provider>
  );
};
