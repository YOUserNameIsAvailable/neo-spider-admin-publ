"use client";

import {
  TreeView,
  TreeViewDragClue,
  processTreeViewItems,
  moveTreeViewItem,
  TreeViewDragAnalyzer,
  TreeViewItemDragOverEvent,
  TreeViewItemDragEndEvent,
  TreeViewItemClickEvent,
  TreeViewCheckChangeEvent,
  ItemRenderProps,
  TreeViewExpandChangeEvent,
} from "@progress/kendo-react-treeview";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import React, { useEffect } from "react";
import { TreeData } from "@/constants/treedata";

interface TreeViewDataItem {
  text: string;
  expanded?: boolean;
  selected?: boolean;
  items?: TreeViewDataItem[];
}

function getSiblings(itemIndex: string, data: TreeViewDataItem[]) {
  let result = data;

  const indices = itemIndex.split(SEPARATOR).map((index) => Number(index));
  for (let i = 0; i < indices.length - 1; i++) {
    result = result[indices[i]].items || [];
  }

  return result;
}

const SEPARATOR = "_";

// const treeData = [
//   {
//     text: "Parent 1",
//     items: [
//       { text: "Child 1.1" },
//       {
//         text: "Child 1.2",
//         items: [{ text: "Grandchild 1.2.1" }, { text: "Grandchild 1.2.2" }],
//       },
//     ],
//   },
//   { text: "Parent 2" },
// ];

export default function Page() {
  const dragClue = React.useRef<any>();
  const dragOverCnt = React.useRef<number>(0);
  const isDragDrop = React.useRef<boolean>(false);
  const [tree, setTree] = React.useState(TreeData);
  // const [tree, setTree] = React.useState(treeData);
  const [expand, setExpand] = React.useState({ ids: [], idField: "text" });
  const [selected, setSelected] = React.useState<any>([]);
  const [writeRoute, setWriteRoute] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<any>({
    data: "",
    level: 0,
    text: "",
    url: "",
  });

  const getClueClassName = (event: any) => {
    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
    const { itemHierarchicalIndex: itemIndex } = eventAnalyzer.destinationMeta;

    if (eventAnalyzer.isDropAllowed) {
      switch (eventAnalyzer.getDropOperation()) {
        case "child":
          return "k-i-plus";
        case "before":
          return itemIndex === "0" || itemIndex.endsWith(`${SEPARATOR}0`) ? "k-i-insert-up" : "k-i-insert-middle";
        case "after":
          const siblings = getSiblings(itemIndex, tree);
          const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

          return lastIndex < siblings.length - 1 ? "k-i-insert-middle" : "k-i-insert-down";
        default:
          break;
      }
    }

    return "k-i-cancel";
  };
  const onItemDragOver = (event: TreeViewItemDragOverEvent) => {
    dragOverCnt.current++;
    dragClue.current.show(event.pageY + 10, event.pageX, event.item.text, getClueClassName(event));
  };

  const onItemDragEnd = (event: TreeViewItemDragEndEvent) => {
    isDragDrop.current = dragOverCnt.current > 0;
    dragOverCnt.current = 0;
    dragClue.current.hide();

    const eventAnalyzer: any = new TreeViewDragAnalyzer(event).init();
    const destinationIndex = eventAnalyzer.destinationMeta.itemHierarchicalIndex;
    const destinationItem: any = getItemByIndex(destinationIndex, tree);

    if (eventAnalyzer.isDropAllowed) {
      const updatedTree: any = moveTreeViewItem(
        event.itemHierarchicalIndex,
        tree,
        eventAnalyzer.getDropOperation() || "child",
        eventAnalyzer.destinationMeta.itemHierarchicalIndex,
      );

      setWriteRoute((prevText) => prevText + "\n" + `${eventAnalyzer.event.item.text} to ${destinationItem.text}`);
      setTree(updatedTree);
      setSelectedValue({
        data: "",
        level: 0,
        text: "",
        url: "",
      });
    }
  };

  function getItemByIndex(index: any, items: any) {
    const indices = index.split(SEPARATOR).map((i: any) => parseInt(i, 10));
    let currentItem: any = null;

    indices.forEach((i: any) => {
      currentItem = (currentItem ? currentItem.items : items)[i];
    });

    return currentItem || null;
  }

  const onItemClick = ({ item: _item, itemHierarchicalIndex }: TreeViewItemClickEvent) => {
    if (!isDragDrop.current) {
      setSelectedValue(_item);
      setSelected([itemHierarchicalIndex]);
    }
  };
  const onExpandChange = (event: TreeViewCheckChangeEvent) => {
    let ids: any = expand.ids.slice();
    const index = ids.indexOf(event.item.text);

    index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
    setExpand({ ids, idField: "text" });
  };

  const updateItemText = () => {
    if ((selectedValue && selected.length > 0, selectedValue.text.length > 1)) {
      const updatedTree = updateTreeItemText(tree, selected[0], selectedValue.text);
      setTree(updatedTree);
    }
  };

  function updateTreeItemText(items: any, index: any, newText: any) {
    const indices = index.split("_").map((x: any) => parseInt(x, 10));
    let currentLevel = items;

    indices.forEach((idx: any, i: any) => {
      if (i === indices.length - 1) {
        currentLevel[idx].text = newText;
      } else {
        currentLevel = currentLevel[idx].items || [];
      }
    });

    return [...items];
  }

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

  return (
    <>
      <div className="flex h-full w-full flex-row">
        <div className="h-full min-w-[300px] bg-red-100">
          <TreeView
            draggable={true}
            onItemDragOver={onItemDragOver}
            onItemDragEnd={onItemDragEnd}
            data={processTreeViewItems(tree, { expand: expand, select: selected })}
            expandIcons={true}
            onExpandChange={onExpandChange}
            onItemClick={onItemClick}
            item={TreeItem}
          />
          <TreeViewDragClue ref={dragClue} />
        </div>
        <div className="flex h-full w-full flex-col">
          <div className="h-[300px] w-full overflow-y-scroll whitespace-pre-line bg-blue-100">{writeRoute}</div>
          <div className="h-[300px] w-full whitespace-pre-line bg-green-100">
            <div className="flex gap-4">
              <span>text</span>
              <Input
                value={selectedValue?.text}
                onChange={(e) => setSelectedValue({ ...selectedValue, text: e.target.value })}
                className="mb-4 w-[300px] pb-4 pt-4"
              />
            </div>

            <Button onClick={updateItemText}>change value</Button>
          </div>
        </div>
      </div>

      {/*<div className="flex justify-end">*/}
      {/*  <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={undefined}>*/}
      {/*    + ADD*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
}
