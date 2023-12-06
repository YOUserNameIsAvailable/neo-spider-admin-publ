import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn as Column, getSelectedState } from "@progress/kendo-react-grid";

import { PAGES } from "@/constants";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

import { getter } from "@progress/kendo-react-common";
const SELECTED_FIELD = "selected";
const DATA_ITEM_KEY = "id";
const idGetter = getter(DATA_ITEM_KEY);

export const MyWorkspaceManagementSearchUserModal: FC<{
  setSearchUser: Dispatch<SetStateAction<boolean>>;
}> = ({ setSearchUser }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 341,
    top: 241,
    width: 600,
    height: 500,
  });
  const [selectedState, setSelectedState] = React.useState({});

  const handleMove = (event: WindowMoveEvent) => {
    setPosition({ ...position, left: event.left, top: event.top });
  };

  const handleResize = (event: WindowMoveEvent) => {
    setPosition({
      left: event.left,
      top: event.top,
      width: event.width,
      height: event.height,
    });
  };

  const historyGridDummy = [
    {
      id: 1,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 2,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 3,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 4,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 5,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 6,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 7,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 8,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 9,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 10,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
    {
      id: 11,
      modificationDate: "2023-12-01",
      modifier: "MS00000",
      version: 1,
      reasonForChange: "재반입",
    },
  ];

  const [dataState, setDataState] = React.useState(
    historyGridDummy.map((dataItem) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem,
      ),
    ),
  );

  const onSelectionChange = React.useCallback(
    (event: any) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState],
  );

  const onHeaderSelectionChange = React.useCallback((event: any) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: { [key: string]: boolean } = {};
    event.dataItems.forEach((item: any) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  return (
    <div className="k-overlay">
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"사용자 검색"}
        width={position.width} // 600
        height={position.height} // 500
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setSearchUser(false);
        }}>
        <div className="flex flex-col">
          <div className="mb-4 flex w-full items-center bg-[#dde6f0] p-[5px]">
            <div className="shrink-1 flex flex-grow items-center gap-4">
              <DropDownList
                size={"small"}
                data={PAGES}
                defaultValue="20"
                filterable={false}
                style={{ width: "100px" }}
              />
              <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
            </div>
            <Button imageUrl="/images/refresh.png" className="basic-btn">
              조회
            </Button>
          </div>
          <div className="flex items-center gap-1 pb-4">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">리스트</div>
            <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">전체 n 건</div>
          </div>
          <Grid
            style={{ height: "300px" }}
            data={dataState.map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item) as keyof typeof selectedState],
            }))}
            sortable={true}
            pageable={true}
            dataItemKey={DATA_ITEM_KEY}
            onSelectionChange={onSelectionChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
            pageSize={8}>
            <Column field="modificationDate" title="사용자ID" headerClassName="justify-center bg-[#adc6f4]" />
            <Column field="modifier" title="사용자명" headerClassName="justify-center bg-[#adc6f4]" />
            <Column field="version" title="직급" headerClassName="justify-center bg-[#adc6f4]" />
            <Column field="reasonForChange" title="소속" headerClassName="justify-center bg-[#adc6f4]" />
          </Grid>
          <div className="mt-4 flex items-center justify-end gap-4">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={() => {
                setSearchUser(false);
              }}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </div>
  );
};
