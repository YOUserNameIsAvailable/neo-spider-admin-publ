import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn as Column, getSelectedState, GridHeaderCellProps } from "@progress/kendo-react-grid";

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

export const MyWorkspaceManagementGroupManageModal: FC<{
  setGroupManage: Dispatch<SetStateAction<boolean>>;
}> = ({ setGroupManage }) => {
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
        width={position.width} // 600
        height={position.height} // 500
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setGroupManage(false);
        }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 pb-4">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">그룹관리</div>
            <div className="shrink-1 flex flex-grow flex-row items-center justify-end gap-2">
              <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                행 추가
              </Button>
              <Button size={"small"} className="cell-inside-btn px-4" themeColor={"primary"} onClick={undefined}>
                선택형 삭제
              </Button>
            </div>
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
            selectedField={SELECTED_FIELD}
            onSelectionChange={onSelectionChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
            pageSize={8}>
            <Column
              editable={false}
              field={SELECTED_FIELD}
              width="30px"
              headerSelectionValue={
                dataState.findIndex((item: any) => !selectedState[idGetter(item) as keyof typeof selectedState]) === -1
              }
              headerCell={(props: GridHeaderCellProps) => <th {...props}></th>}
            />
            <Column
              field="modificationDate"
              title="CRUD"
              headerClassName="justify-center bg-[#adc6f4] w-[50px]"
              className="w-[50px]"
            />
            <Column
              field="modifier"
              title="그룹이름"
              headerClassName="justify-center bg-[#adc6f4] w-[80px]"
              className="w-[80px]"
            />
            <Column
              field="version"
              title="그룹설명"
              headerClassName="justify-center bg-[#adc6f4] w-[40%]"
              className="w-[40%]"
            />
            <Column
              field="reasonForChange"
              title="수정일"
              headerClassName="justify-center bg-[#adc6f4] w-[30%]"
              className="w-[30%]"
            />
          </Grid>
          <div className="mt-4 flex items-center justify-end gap-4">
            <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
              변경사항 저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={() => setGroupManage(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </div>
  );
};
