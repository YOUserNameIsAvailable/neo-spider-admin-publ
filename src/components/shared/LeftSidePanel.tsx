import { useState } from "react";
import { MENU } from "@/constants";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {
  ItemRenderProps,
  TreeView,
  TreeViewExpandChangeEvent,
  TreeViewItemClickEvent,
  processTreeViewItems,
} from "@progress/kendo-react-treeview";
import { useTab } from "@/providers/TabProvider";

const TreeItem = (props: ItemRenderProps) => {
  return (
    <div className="flex items-center gap-2">
      {props.item.items?.length > 0 ? (
        <img src="/images/folder.png" alt="" />
      ) : (
        <img className="w-5" src="/images/document.png" alt="" />
      )}
      <span>{props.item.text}</span>
    </div>
  );
};

export function LeftSideBar() {
  const { tabs, setTabs } = useTab();

  const [expand, setExpand] = useState({ ids: ["Item2"], idField: "text" });
  const [select, setSelect] = useState([""]);

  const onItemClick = ({ item, itemHierarchicalIndex }: TreeViewItemClickEvent) => {
    // add new tab
    if (!item.items) {
      const newTabs = [
        ...tabs,
        {
          id: item.data,
          title: item.text,
          componentName: "UserManagement",
        },
      ];

      setTabs(newTabs);
    }

    setSelect([itemHierarchicalIndex]);
  };

  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    let ids = expand.ids.slice();
    const index = ids.indexOf(event.item.text);

    index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
    setExpand({ ids, idField: "text" });
  };

  return (
    <div className="pane-content h-full flex flex-col gap-3 pt-3">
      <div className="text-sm pl-4 font-semibold">Dev Mode</div>
      <div className="flex-grow flex flex-col h-full">
        <PanelBar expandMode="single">
          {MENU.items.map((item, index) => (
            <PanelBarItem key={item.data} title={item.text} expanded={index === 0}>
              <TreeView
                className="h-full"
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
      <ButtonGroup className="flex m-2">
        <Button className="flex-grow !text-sm !capitalize" themeColor={"primary"}>
          Framework
        </Button>
        <Button className="flex-grow !text-sm !capitalize" themeColor={"light"}>
          MyMenu
        </Button>
        <Button className="flex-grow !text-sm !capitalize" themeColor={"light"}>
          TestCase
        </Button>
      </ButtonGroup>
    </div>
  );
}
