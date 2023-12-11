import { useState, useEffect } from "react";
import { MENUS } from "@/constants";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {
  ItemRenderProps,
  TreeView,
  TreeViewExpandChangeEvent,
  TreeViewItemClickEvent,
  TreeViewOperationDescriptor,
  processTreeViewItems,
} from "@progress/kendo-react-treeview";
import { useTab } from "@/providers/TabProvider";
import { IMenu, ITab } from "@/types";
import { useRouter } from "next/navigation";

const TreeItem = (props: ItemRenderProps) => {
  return (
    <div className="flex h-full items-center gap-2">
      {props.item.items?.length > 0 ? (
        <img src="/images/folder.png" alt="" />
      ) : (
        <img className="w-5" src="/images/document.png" alt="" />
      )}
      <span className="capitalize">{props.item.text}</span>
    </div>
  );
};

export function LeftSideBar({ clickCollapseBtn }: { clickCollapseBtn: () => void }) {
  const { tabs, setTabs, setSelectedTab } = useTab();

  const router = useRouter();

  // const [expand, setExpand] = useState<TreeViewOperationDescriptor>({ ids: [], idField: "text" });
  const [expand, setExpand] = useState<TreeViewOperationDescriptor>(() => {
    const sessionExpand = sessionStorage.getItem("expand");
    return sessionExpand ? JSON.parse(sessionExpand) : { ids: [], idField: "text" };
  });
  const [select, setSelect] = useState<string[]>();

  const onItemClick = ({ item: _item, itemHierarchicalIndex }: TreeViewItemClickEvent) => {
    const item: IMenu = _item;

    // if folder clicked
    if (item.items) {
      onExpandChange({ item } as any);
      return;
    }

    const found = tabs.find((x) => x.url === item.url);
    // add new tab
    if (!found) {
      const newTab: ITab = { text: item.text, url: item.url };
      setTabs([...tabs, newTab]);

      setSelectedTab(newTab);
    } else {
      setSelectedTab(item);
    }

    setSelect([itemHierarchicalIndex]);
  };

  const onExpandChange = ({ item: _item }: TreeViewExpandChangeEvent) => {
    const item: IMenu = _item;

    let ids = expand?.ids?.slice() || [];

    const index = ids.indexOf(item.text);

    index === -1 ? ids.push(item.text) : ids.splice(index, 1);

    setExpand({ ids, idField: "text" });
    sessionStorage.setItem("expand", JSON.stringify({ ids, idField: "text" }));
  };

  return (
    <div className="pane-content flex h-full flex-col gap-3 rounded-t-[12px] bg-[#603d86] p-[5px]">
      <div className="flex flex-row justify-between pt-[5px]">
        <div className="pl-4 text-[14px] font-bold text-[#2ac2d9]">Dev Mode</div>
        <span className="collepsMenu min-w-[15px]" onClick={clickCollapseBtn}></span>
      </div>
      <div className="flex h-full flex-grow flex-col">
        <PanelBar expandMode="single" className="h-full border-0">
          {MENUS.map((item, index) => (
            <PanelBarItem
              key={item.data}
              title={item.text}
              expanded={index === 0}
              headerClassName="panel-bar-header overflow-hidden whitespace-nowrap"
              className="panel-bar">
              <TreeView
                className="shrink-1 flex flex-grow"
                data={processTreeViewItems(item.items, {
                  select: select,
                  expand: expand,
                })}
                item={TreeItem}
                expandIcons={true}
                size={"small"}
                aria-multiselectable={false}
                onExpandChange={onExpandChange}
                onItemClick={onItemClick}
              />
            </PanelBarItem>
          ))}
        </PanelBar>
      </div>
      <ButtonGroup className="m-2 flex gap-[4px]">
        <Button className="leftPanelGroupBtn flex-grow !capitalize">Framework</Button>
        <Button className="leftPanelGroupBtn flex-grow !capitalize">MyMenu</Button>
        <Button className="leftPanelGroupBtn flex-grow !capitalize">TestCase</Button>
      </ButtonGroup>
    </div>
  );
}
