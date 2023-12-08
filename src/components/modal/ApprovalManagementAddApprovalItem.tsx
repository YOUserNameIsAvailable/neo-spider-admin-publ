import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { getter } from "@progress/kendo-react-common";
import { Grid, GridColumn as Column, getSelectedState } from "@progress/kendo-react-grid";
import { ColumnMenu } from "@/components/ColumnMenu";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const SELECTED_FIELD = "selected";
const DATA_ITEM_KEY = "id";
const idGetter = getter(DATA_ITEM_KEY);

export const ApprovalManagementAddApprovalItem: FC<{
  setShowApprovalAddItem: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowApprovalAddItem }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 400,
    top: 182,
    width: 1500,
    height: 800,
  });

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
  const [selectedState, setSelectedState] = React.useState({});
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
        title={"작업함"}
        width={position.width} // 1100
        height={position.height} // 700
        onMove={(e) => handleMove(e)}
        onResize={(e) => handleResize(e)}
        onClose={() => {
          setShowApprovalAddItem(false);
        }}>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 pb-4">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">작업함</div>
          </div>
          <div className="flex flex-wrap justify-between gap-4 overflow-x-scroll bg-[#dde6f0] p-[5px]">
            <div className="flex items-center gap-4">
              <DropDownList
                className="h-[30px] w-[100px] min-w-[100px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
              <Input className="h-[24px] w-[148px] min-w-[148px] border border-[#999999]" />
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <DropDownList
                  size={"small"}
                  data={PAGES}
                  defaultValue="20"
                  filterable={false}
                  style={{ width: "80px" }}
                />
                <span className="font-bold text-[#333333]">Items</span>
              </div>

              <Button imageUrl="/images/refresh.png" className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 py-4">
            <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
            <span className="font-bold text-[#656565]">리스트</span>
          </div>
          <Grid
            style={{
              height: "500px",
            }}
            pageable={{
              pageSizes: true,
            }}
            onRowClick={undefined}
            data={dataState.map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item) as keyof typeof selectedState],
            }))}
            sortable={true}
            expandField="expanded"
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            onHeaderSelectionChange={onHeaderSelectionChange}
            onSelectionChange={onSelectionChange}
            groupable={false}>
            <Column
              field="modificationDate"
              title="항목"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="modificationDate"
              title="식별자"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="modificationDate"
              title="작업내용"
              sortable={false}
              columnMenu={ColumnMenu}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="modificationDate"
              title="결제일련번호"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="modificationDate"
              title="운영반영여부"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
              cells={{
                data: ({ dataItem, ...props }) => {
                  return (
                    <td {...props.tdProps} style={{ textAlign: "center" }}>
                      X
                    </td>
                  );
                },
              }}
            />
            <Column
              field="modificationDate"
              title="최종수정자ID"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              field="modificationDate"
              title="최종수정일시"
              sortable={false}
              headerClassName="justify-center bg-[#adc6f4]"
            />
            <Column
              sortable={false}
              field={SELECTED_FIELD}
              // headerSelectionValue={checkHeaderSelectionValue()}
              headerClassName="bg-[#adc6f4] overflow-none"
              className="overflow-none"
              width={30}
            />
            <Column field="budget" title="식별자" sortable={false} headerClassName="justify-center bg-[#adc6f4]" />
          </Grid>
          {/**/}
          <div className="mt-4 flex items-center justify-end gap-4">
            <Button imageUrl="/images/dot-right-arrow.png" className="basic-btn flex items-center justify-start">
              이동
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={() => setShowApprovalAddItem(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </div>
  );
};
