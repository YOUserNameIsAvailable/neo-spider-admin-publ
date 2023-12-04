import { Dispatch, FC, SetStateAction, useEffect, useState, useCallback } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { getter } from "@progress/kendo-react-common";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn as Column, getSelectedState } from "@progress/kendo-react-grid";
import products from "@/utils/text.json";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const PropertyDBManagementWASModal: FC<{
  setWASModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setWASModal }) => {
  const DATA_ITEM_KEYS = "ProductID";
  const SELECTED_FIELDS = "selected";
  const idGetters = getter(DATA_ITEM_KEYS);

  const [checkData, setCheckData] = useState(
    products.map((dataItem: any) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem,
      ),
    ),
  );

  const [selectedState, setSelectedState] = useState<any>({});

  const [position, setPosition] = useState<PositionInterface>({
    left: 245,
    top: 84,
    width: 1100,
    height: 590,
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

  const WASCell = (props: any) => {
    return (
      <td
        {...props.tdProps}
        colSpan={1}
        style={{
          color: props.color,
        }}>
        {props.children}
      </td>
    );
  };
  const MyCustomCell = (props: any) => <WASCell {...props} color={"red"} />;

  const setPercentage = (percentage: number) => {
    return Math.round(300 / 100) * percentage;
  };
  const CustomCell = (props: any) => {
    return (
      <td>
        <button
          className="k-button"
          style={{
            height: "20px",
            backgroundColor: "#F6F6F6",
            borderColor: "#656565",
            borderRadius: "2px",
            width: "100px",
          }}>
          WAS별 설정
        </button>
      </td>
    );
  };

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"WAS별 설정값 조회"}
        left={position.left}
        top={position.top}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setWASModal(false);
        }}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[40px] w-full items-center justify-between bg-[#dde6f0] p-[5px]">
            <div className="flex w-full items-center gap-[15px]">
              <div className="text-[12px] font-bold text-[#656565]">WAS 인스턴스</div>
              <DropDownList
                style={{
                  width: "15%",
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
              <div className="text-[12px] font-bold text-[#656565]">프로퍼티 그룹 ID</div>
              <DropDownList
                style={{
                  width: "15%",
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
            </div>
            <button className="k-button" style={{ width: "61px", height: "20px", backgroundColor: "#F6F6F6" }}>
              <img src="./images/btn_excel_off.gif" />
            </button>
          </div>
          <div className="flex h-[415px] w-full flex-col overflow-auto border-[1px]">
            <div className="my-[10px] flex items-center justify-between">
              <div className="flex items-center">
                <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                <div className="pl-[2px] text-[14px] font-bold text-[#FF0000]">* 빨간색 필드만 수정 가능합니다</div>
              </div>
              <div className="mr-[8px] flex gap-[2px]">
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
              data={[
                {
                  ProductID: 1,
                  CRUD: "",
                  propertyID: "111qwe",
                  propertyName: "ACCOUNT_NEXT_STATE_DADWDWDA",
                  propertyEx: "",
                  firstNum: "01",
                  num: "USE_DEFAULT",
                  sign: "",
                  dataType: "String",
                  WAS: "",
                },
              ].map((item) => ({
                ...item,
                [SELECTED_FIELDS]: selectedState[idGetters(item)],
              }))}
              style={{ height: "341px", marginRight: "8px", marginLeft: "8px" }}
              fixedScroll={true}
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
              <Column className="truncate whitespace-nowrap" field="propertyID" title="프로퍼티그룹ID" />
              <Column className="truncate whitespace-nowrap" field="propertyName" title="프로퍼티명" />
              <Column className="truncate whitespace-nowrap" field="propertyEx" title="유효값" />
              <Column className="truncate whitespace-nowrap" field="firstNum" title="초기값" />
              <Column
                className="truncate whitespace-nowrap"
                field="num"
                title="설정된 값"
                cells={{
                  data: MyCustomCell,
                }}
              />
              <Column className="truncate whitespace-nowrap" field="sign" title="특이사항" />
              <Column className="truncate whitespace-nowrap" field="dataType" title="data타입" />
              <Column className="truncate whitespace-nowrap" field="WAS" title="WAS별 설정" cell={CustomCell} />
            </Grid>
            <div className="my-[10px] flex flex-row-reverse gap-[2px]">
              <Button
                imageUrl="/images/dot-right-arrow.png"
                className="basic-btn mt-2 flex h-7 items-center justify-start"
                onClick={() => {
                  setWASModal(false);
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
