import { Dispatch, FC, SetStateAction, useEffect, useState, useCallback } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column, getSelectedState, GridNoRecords } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { getter } from "@progress/kendo-react-common";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DATA_ITEM_KEYS = "ProductID";
const SELECTED_FIELDS = "selected";

export const PropertyDBManagementAddModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const [position, setPosition] = useState<PositionInterface>({
    left: 200,
    top: 115,
    width: 1110,
    height: 597,
  });
  const idGetters = getter(DATA_ITEM_KEYS);

  const [checkData, setCheckData] = useState(
    [].map((dataItem: any) =>
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

  const filterChange = (event: any) => {
    setDatas(filterData(event.filter));
  };

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

  const allData = [
    {
      id: 1,
      text: "전체",
    },
    {
      id: 2,
      text: "111qwe",
    },
    {
      id: 3,
      text: "Admin",
    },
    {
      id: 4,
      text: "CMS2",
    },
    {
      id: 5,
      text: "CMSTEST",
    },
    {
      id: 6,
      text: "FDSengine",
    },
  ];
  const [datas, setDatas] = useState(allData.slice());

  const filterData = (filter: any) => {
    const data = allData.slice();
    return filterBy(data, filter);
  };
  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"프로퍼티 정보 등록"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center justify-between pb-[4px]">
            <div className="flex items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">프로퍼티 그룹 정보</div>
            </div>
            <button className="k-button" style={{ width: "61px", height: "20px", backgroundColor: "#F6F6F6" }}>
              <img src="./images/btn_excel_off.gif" />
            </button>
          </div>
          <div className="flex h-[38px] w-full justify-between border-[1px]">
            <div className="flex w-full items-center">
              <label className="flex h-[38px] h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                프로퍼티 그룹 ID
              </label>
              <input className="ml-[2px] w-[12%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[4px]" />
              <button
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
                  marginLeft: "2px",
                }}>
                중복확인
              </button>
              <label className="ml-4 flex h-[38px] h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
                프로퍼티 그룹명
              </label>
              <input className="ml-[2px] w-[12%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[4px]" />
            </div>
            <button
              className="k-button"
              style={{ width: "120px", backgroundColor: "#F6F6F6", borderColor: "#656565", borderRadius: "2px" }}>
              유사프로퍼티등록
            </button>
          </div>
          <div className="flex w-full gap-[28px] pl-[13px]">
            <DropDownList
              style={{
                width: "18%",
                fontSize: "12px",
                marginLeft: "4px",
                paddingTop: "2px",
                paddingBottom: "2px",
                color: "#656565",
                fontWeight: "bold",
              }}
              size={"small"}
              data={["프로퍼티ID", "프로퍼티명"]}
              defaultValue={"프로퍼티ID"}
            />
            <input className="w-[12%] rounded-[2px] border-[1px] border-[1px] border-[#999999] py-[4px]" />
          </div>
          <div className="flex items-center justify-between pb-[4px]">
            <div className="flex items-center gap-1">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">프로퍼티 정보</div>
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
            style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}
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
            <GridNoRecords>
              <div className="flex h-[268px] w-full items-center justify-center">
                <div
                  className="flex h-[100px] items-center justify-center rounded-[10px] p-[30px]"
                  style={{
                    background: `linear-gradient(to bottom, #ffffff 30%, #f6f6f6 60%, #eeeeee,#e5e5e5)`,
                    boxShadow: `0px 0px 2px 1px rgba(0,0,0,.2)`,
                  }}>
                  No Recode Found
                </div>
              </div>
            </GridNoRecords>

            <Column
              className="truncate whitespace-nowrap"
              field={SELECTED_FIELDS}
              headerSelectionValue={checkData.findIndex((item) => !selectedState[idGetters(item)]) === -1}
            />
            <Column className="truncate whitespace-nowrap" field="CRUD" title="CRUD" />
            <Column className="truncate whitespace-nowrap" field="propertyID" title="프로퍼티ID" />
            <Column className="truncate whitespace-nowrap" field="propertyName" title="프로퍼티명" />
            <Column className="truncate whitespace-nowrap" field="propertyEx" title="프로퍼티 설명" />
            <Column className="truncate whitespace-nowrap" field="firstNum" title="초기값" />
            <Column className="truncate whitespace-nowrap" field="num" title="유효값" />
            <Column className="truncate whitespace-nowrap" field="dataType" title="data타입" />
            <Column className="truncate whitespace-nowrap" field="WAS" title="WAS별 설정" />
          </Grid>
          <div className="flex justify-between">
            <div className="flex gap-[2px]">
              {["전체 백업", "전체 복원", "WAS별 설정 백업", "WAS별 설정 복원"].map((v) => {
                return (
                  <button
                    key={v}
                    className="k-button"
                    style={{
                      height: "23px",
                      backgroundColor: "#F6F6F6",
                      borderColor: "#656565",
                      borderRadius: "2px",
                      width: "114px",
                    }}>
                    {v}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-[2px]">
              <Button
                imageUrl="/images/dot-right-arrow.png"
                className="basic-btn mt-2 flex h-7 items-center justify-start">
                전체삭제
              </Button>
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
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};
