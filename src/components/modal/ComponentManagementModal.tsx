import { Dispatch, FC, SetStateAction, useEffect, useState, useCallback } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { getter } from "@progress/kendo-react-common";
import { Grid, GridColumn as Column, getSelectedState } from "@progress/kendo-react-grid";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ComponentManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
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

  const [position, setPosition] = useState<PositionInterface>({
    left: 207,
    top: 45,
    width: 1010,
    height: 740,
  });

  const DATA_ITEM_KEYS = "ProductID";
  const SELECTED_FIELDS = "selected";
  const idGetters = getter(DATA_ITEM_KEYS);

  const [checkData, setCheckData] = useState(
    [
      {
        ProductID: 1,
        CRUD: "",
        num: "1",
        keys: "SQL_GROUP_ID",
        EX: "SQL 그룹 ID",
        default: "",
      },
      {
        ProductID: 2,
        CRUD: "",
        num: "2",
        keys: "UPDATE_SQL",
        EX: "서비스 수정 SQL ID",
        default: "",
      },
      {
        ProductID: 3,
        CRUD: "",
        num: "3",
        keys: "DELETE_SERVICE_RELATION_SQL",
        EX: "서비스릴레션삭제 SQ:L ID",
        default: "",
      },
      {
        ProductID: 4,
        CRUD: "",
        num: "4",
        keys: "DELETE_SERVICE_PARAM_SQL",
        EX: "릴레션파라미터삭제 SQ:L ID",
        default: "",
      },
      {
        ProductID: 5,
        CRUD: "",
        num: "5",
        keys: "DELETE_SERVICE_RELATION_SQL",
        EX: "서비스릴레이션등록 SQ:L ID",
        default: "",
      },
    ].map((dataItem: any) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem,
      ),
    ),
  );

  const [selectedState, setSelectedState] = useState<any>({});

  const onSelectionChanges = useCallback(
    (event: any) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEYS,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState],
  );
  const onHeaderSelectionChanges = useCallback((event: any) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: any = {};
    event.dataItems.forEach((item: any) => {
      newSelectedState[idGetters(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"컴포넌트 정보"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-1 pb-[4px]">
            <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
            <div className="text-[14px] font-bold text-[#656565]">컴포넌트 정보</div>
          </div>
          <div className="flex w-full flex-col">
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  컴포넌트ID
                </label>
                <input className="ml-[2px] w-[100%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  컴포넌트명
                </label>
                <input className="ml-[2px] w-[100%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  클래스명
                </label>
                <input className="ml-[2px] w-[100%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  메소드명
                </label>
                <input className="ml-[2px] w-[100%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  유형
                </label>
                <DropDownList
                  style={{
                    width: "40%",
                    fontSize: "12px",
                    marginLeft: "2px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    color: "#656565",
                  }}
                  size={"small"}
                  data={["Component", "안전", "주의", "경계"]}
                  defaultValue={"Component"}
                />
                <span className="required">*</span>
              </div>
              <div className="flex w-[50%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  생성유형
                </label>
                <DropDownList
                  style={{
                    width: "40%",
                    fontSize: "12px",
                    marginLeft: "2px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    color: "#656565",
                  }}
                  size={"small"}
                  data={["Signleton", "안전", "주의", "경계"]}
                  defaultValue={"Signleton"}
                />
              </div>
            </div>
            <div className="flex h-[30px] w-full  border-[1px]">
              <div className="flex w-[100%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  업무분류
                </label>
                <DropDownList
                  style={{
                    width: "20%",
                    fontSize: "12px",
                    marginLeft: "2px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    color: "#656565",
                  }}
                  size={"small"}
                  data={["프레임워크", "안전", "주의", "경계"]}
                  defaultValue={"프레임워크"}
                />
                <span className="required">*</span>
              </div>
            </div>
            <div className="flex h-[103px] w-full  border-[1px]">
              <div className="flex w-[100%] items-center">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                  설명
                </label>
                <textarea className="ml-[2px] h-full w-[70%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[2px]" />
                <span className="required">*</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pb-[4px]">
            <div className="flex items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">파라미터 상세/수정</div>
            </div>
            <div className="flex gap-[2px]">
              {["행 추가", "선택행 삭제"].map((v) => {
                return (
                  <button
                    key={v}
                    className="k-button"
                    style={{
                      height: "23px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#656565",
                      borderRadius: "2px",
                      paddingRight: "4px",
                      paddingLeft: "4px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}>
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
          <Grid
            data={checkData.map((item) => ({
              ...item,
              [SELECTED_FIELDS]: selectedState[idGetters(item)],
            }))}
            style={{ height: "300px" }}
            dataItemKey={DATA_ITEM_KEYS}
            selectedField={SELECTED_FIELDS}
            selectable={{
              enabled: true,
              drag: false,
              cell: false,
              mode: "multiple",
            }}
            onSelectionChange={onSelectionChanges}
            onHeaderSelectionChange={onHeaderSelectionChanges}>
            <Column
              className="truncate whitespace-nowrap"
              field={SELECTED_FIELDS}
              headerSelectionValue={checkData.findIndex((item) => !selectedState[idGetters(item)]) === -1}
            />
            <Column className="truncate whitespace-nowrap" field="CRUD" title="CRUD" width={setPercentage(20)} />
            <Column className="flex items-center justify-center" field="num" title="파라미터 일련번호" />
            <Column className="truncate whitespace-nowrap" field="keys" title="파라미터 키" />
            <Column className="truncate whitespace-nowrap" field="EX" title="파라미터 설명" />
            <Column className="truncate whitespace-nowrap" field="default" title="초기값" />
          </Grid>
          <div className="flex flex-row-reverse gap-[2px]">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start"
              onClick={() => {
                setShowModal(false);
              }}>
              닫기
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn mt-2 flex h-7 items-center justify-start">
              전체삭제
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
