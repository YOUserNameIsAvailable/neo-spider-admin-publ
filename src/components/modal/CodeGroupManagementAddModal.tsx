import React, {
  ChangeEvent,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import {
  Grid,
  GridColumn as Column,
  GridItemChangeEvent,
  GridCellProps,
  GridRowProps,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import { setExpandedState } from "@progress/kendo-react-data-tools";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { CellRender, RowRender } from "../cellRender";
import { DropDownCell } from "../DropDownCell";
import { useDialogModalContext } from "@/hooks/ModalDialogContext";
import { useRecoilState } from "recoil";
import { validateFieldState } from "@/store";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const DATA_ITEM_KEY = "rowSeq";
const SELECTED_FIELD = "selected";

export const CodeGroupManagementAddModal: FC<{
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowAddModal }) => {
  const idGetter = getter(DATA_ITEM_KEY);
  const [validateField, setValidateField] = useRecoilState(validateFieldState);
  const modalContext = useDialogModalContext();
  const [currentSelectedState, setCurrentSelectedState] = useState<any>({});
  const [group, setGroup] = useState<any>();

  const [isExcelCopy, setIsExcelCopy] = useState<boolean>(false);
  const [copyData, setCopyData] = useState<any[]>([]);
  const [dataResult, setDataResult] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [position, setPosition] = useState<PositionInterface>({
    left: 307,
    top: 225,
    width: 860,
    height: 640,
  });

  const updateDetail = async () => {
    const gridData = dataResult
      .filter((item: any) => item.CRUD === "수정" || item.CRUD === "추가" || item.CRUD === "삭제")
      .map((item: any) => {
        const rest = { ...item, CRUD: item.CRUD === "추가" ? "C" : item.CRUD === "수정" ? "U" : "D" };
        return rest;
      });

    const updateJson = await fetch("/api/spider/code-group-management/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codeGroupId: group.codeGroupId,
        codeGroupName: group.codeGroupName,
        codeGroupDesc: group.codeGroupDesc,
        gridData,
      }),
    });

    const updateResult = await updateJson.json();
    console.log("updateResult: ", updateResult);
  };

  const checkCodeGroupId = async () => {
    try {
      console.log(123123, group);
      if (group?.codeGroupId === "" || !group?.codeGroupId) {
        await modalContext.showDialog(" ", "코드그룹ID를 입력해주세요.", "alert");
        return;
      }
      const checkJson = await fetch("/api/spider/code-group-management/dupCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeGroupId: group?.codeGroupId,
        }),
      });

      const checkResult = await checkJson.json();
      const dupcheck = checkResult?.body?.dupcheck?.dupcheck;
      console.log("checkResult: ", checkResult, dupcheck);
      const message = dupcheck === "N" ? "중복된 코드그룹이 존재 하지 않습니다." : "중복된 코드그룹이 존재 합니다.";
      await modalContext.showDialog("알림", message, "alert");
    } catch (err) {
      console.error(err);
    }
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

  const setSelectedValue = (data: any) => {
    let newData = data.map((item: any) => {
      if (item.items) {
        return {
          ...item,
          items: setSelectedValue(item.items),
        };
      } else {
        return {
          ...item,
          selected: currentSelectedState[idGetter(item)],
        };
      }
    });

    return newData;
  };

  const onHeaderSelectionChange = useCallback(
    (event: any) => {
      const checkboxElement = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      const newSelectedState: any = {};
      data.forEach((item: any) => {
        newSelectedState[idGetter(item)] = checked;
      });
      setCurrentSelectedState(newSelectedState);
      const newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: checked,
      }));

      setDataResult(newData);
    },
    [data],
  );

  const onSelectionChange = (event: any) => {
    const selectedId = event.dataItem.rowSeq;

    const newData = data.map((item: any) => {
      if (item.rowSeq === selectedId) {
        item.selected = !item.selected;
      }
      return item;
    });

    setCurrentSelectedState((prevState: any) => ({
      ...prevState,
      [selectedId]: !prevState[selectedId],
    }));

    setDataResult(newData);
  };

  const getNumberOfItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfItems(item.items);
      } else {
        count++;
      }
    });
    return count;
  };

  const getNumberOfSelectedItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfSelectedItems(item.items);
      } else {
        count = count + (item.selected == true ? 1 : 0);
      }
    });
    return count;
  };

  const checkHeaderSelectionValue = () => {
    const newData = setExpandedState({
      data: setSelectedValue(dataResult),
      collapsedIds: [],
    });

    let selectedItems = getNumberOfSelectedItems(newData);
    return newData.length > 0 && selectedItems === getNumberOfItems(newData);
  };

  const itemChange = (event: GridItemChangeEvent) => {
    let field = event.field || "";
    let newData = dataResult.map((item: any) => {
      if (item.rowSeq === event.dataItem.rowSeq) {
        item[field] = event.value;
      }
      return item;
    });

    console.log("itemChange: ", newData);
    setDataResult(newData);
  };

  const enterEdit = async (dataItem: any, field?: string) => {
    if (field !== validateField && validateField !== "") {
      return;
    }
    if (field === "code" && dataItem?.CRUD !== "추가") {
      await modalContext.showDialog("알림", "Primary key 필드는 추가시에만 입력이 가능합니다.", "alert");
      return;
    }
    const newData = dataResult.map((item: any) => ({
      ...item,
      ["inEdit"]: item.rowSeq === dataItem.rowSeq ? field : undefined,
    }));

    console.log("enterEdit: ", newData, dataItem, field);

    setDataResult(newData);

    // setData(newData);
  };

  const exitEdit = (dataItem: any, field: string) => {
    if (field !== validateField && validateField !== "") {
      return;
    }
    const newData = dataResult.map((item: any, index: number) => {
      if (item.rowSeq === dataItem.rowSeq) {
        item.inEdit = undefined;
        console.log("exitEdit: ", data[index], dataItem);
        if (JSON.stringify(data[index]) !== JSON.stringify(dataItem) && dataItem.CRUD !== "추가") {
          item.CRUD = "수정";
        }
      }

      return item;
    });

    console.log("exitEdit: ", newData);

    setDataResult(newData);
  };

  const customCellRender: any = (td: ReactElement<HTMLTableCellElement>, props: GridCellProps) => (
    <CellRender originalProps={props} td={td} enterEdit={enterEdit} exitEdit={exitEdit} editField={"inEdit"} />
  );

  const customRowRender: any = (tr: ReactElement<HTMLTableRowElement>, props: GridRowProps) => (
    <RowRender originalProps={props} tr={tr} exitEdit={exitEdit} editField={"inEdit"} />
  );

  const addRow = () => {
    const addCount = dataResult.length + 1;
    const newDataItem = { rowSeq: addCount, CRUD: "추가" };

    setData([...data, newDataItem]);
    setDataResult([...data, newDataItem]);

    console.log("addRow: ", newDataItem, [...data, newDataItem]);
  };

  const delRow = () => {
    const newData = data
      .map((item: any) => {
        console.log("item: ", item);
        return !item.selected ? item : item?.CRUD ? {} : { ...item, CRUD: "삭제" };
      })
      .filter((item: any) => Object.keys(item).length > 0);

    setData(newData);
    setDataResult(newData);
  };

  const handlePaste = (e: any) => {
    if (e.target.tagName && e.target.tagName.match(/(input|textarea)/i)) {
      // Do not handle past when an input element is currently focused
      return;
    }

    // Get clipboard data as text
    const data = e.clipboardData.getData("text");

    // Simplified parsing of the TSV data with hard-coded columns
    const rows = data.split("\n");
    const result = rows.map((row: any, index: number) => {
      const cells = row.split("\t");
      return {
        CRUD: "추가",
        code: cells[0],
        codeDesc: cells[1],
        codeEngname: cells[2],
        codeGroupId: group?.codeGroupId,
        codeName: cells[3],
        rowSeq: dataResult.length + index + 1,
        sortOrder: cells[4],
        useYn: cells[5],
      };
    });
    setCopyData(result);
  };

  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"코드 정보 상세"}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowAddModal(false);
        }}>
        <div className="flex flex-col">
          <div className="mb-4 flex flex-col gap-[12px]">
            <div className="flex items-center gap-1 pb-[4px]">
              <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
              <div className="text-[14px] font-bold text-[#656565]">코드 그룹 정보</div>
            </div>
          </div>
          <div className="flex flex-col border-[1px] border-[#dfe1e1]">
            <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
              <div className="flex flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹ID
                </label>
                <Input
                  className="my-[2px] ml-[2px] mr-[15px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  value={group?.codeGroupId}
                  onInput={(e) => {
                    setGroup({ ...group, codeGroupId: e?.currentTarget?.value });
                    console.log(123123, e?.currentTarget?.value, group);
                  }}
                />
                <Button className="basic-small-btn" onClick={checkCodeGroupId}>
                  중복확인
                </Button>
              </div>
            </div>
            {/*  */}
            <div className="flex h-[29px] flex-row border-b-[1px] border-[#dfe1e1]">
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹
                </label>
                <Input
                  className="my-[2px] ml-[2px] w-[175px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  value={group?.codeGroupName}
                  onInput={(e) => setGroup((prev: any) => ({ ...prev, codeGroupName: e?.currentTarget?.value }))}
                />
              </div>
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  최종수정사용자
                </label>
                <div className="break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]"></div>
              </div>
            </div>
            {/*  */}
            <div className="flex h-[57px] flex-row">
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  코드그룹설명
                </label>
                <TextArea
                  className="m-[2px] w-full resize-none rounded-[2px] border-[1px] border-[#999999] py-[2px]"
                  value={group?.codeGroupDesc}
                  onInput={(e) => setGroup((prev: any) => ({ ...prev, codeGroupDesc: e?.currentTarget?.value }))}
                />
              </div>
              <div className="flex w-[50%] flex-row">
                <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-[4px] text-[12px] text-black">
                  최종수정일시
                </label>
                <div className="flex items-center break-all px-[2px] py-[4px] text-[11px] font-bold text-[#656565]"></div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="my-4 flex w-full flex-row">
            <div className="shrink-1 flex flex-grow items-center text-[#656565]">
              ※Excel데이터 Copy는 Excel복사버튼 클릭하세요!
            </div>
            <div className="flex flex-row gap-[2px]">
              {isExcelCopy ? (
                <>
                  <Button
                    className="basic-small-btn"
                    onClick={() => {
                      setDataResult((prev) => [...prev, ...copyData]);
                      setCopyData([]);
                      setIsExcelCopy(false);
                    }}>
                    확인
                  </Button>
                  <Button className="basic-small-btn" onClick={() => setIsExcelCopy(false)}>
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button className="basic-small-btn" onClick={() => setIsExcelCopy(true)}>
                    Excel복사
                  </Button>
                  <Button className="basic-small-btn" onClick={addRow}>
                    행 추가
                  </Button>
                  <Button className="basic-small-btn" onClick={delRow}>
                    선택형 삭제
                  </Button>
                </>
              )}
            </div>
          </div>
          {/*  */}
          <div onPaste={handlePaste}>
            <Grid
              style={
                isExcelCopy
                  ? {
                      height: "300px",
                      backgroundColor: "red",
                      padding: "1px",
                    }
                  : {
                      height: "300px",
                    }
              }
              rowHeight={29}
              fixedScroll={true}
              data={isExcelCopy ? copyData : dataResult}
              expandField="expanded"
              dataItemKey={DATA_ITEM_KEY}
              selectedField={SELECTED_FIELD}
              resizable={true}
              editField="inEdit"
              cellRender={customCellRender}
              rowRender={customRowRender}
              onItemChange={itemChange}
              onHeaderSelectionChange={onHeaderSelectionChange}
              onSelectionChange={onSelectionChange}>
              <GridNoRecords>
                <div id="noRecord" className="popup_pop_norecord">
                  No Record Found.
                </div>
              </GridNoRecords>
              <Column
                filterable={false}
                field={SELECTED_FIELD}
                width={30}
                editable={false}
                headerSelectionValue={checkHeaderSelectionValue()}
                headerClassName="bg-[#adc6f4] overflow-none"
                className="overflow-none"
              />
              <Column
                field="CRUD"
                title="CRUD"
                headerClassName="justify-center bg-[#adc6f4]"
                width={53}
                editable={false}
              />
              <Column
                field="code"
                headerClassName="justify-center w-[6%]"
                className="w-[6%]"
                title="코드"
                editor="text"
              />
              <Column
                field="codeName"
                headerClassName="justify-center w-[17%]"
                className="w-[17%]"
                title="코드한글명"
                editor="text"
              />
              <Column
                field="codeEngname"
                headerClassName="justify-center w-[17%]"
                className="w-[17%]"
                title="코드영문명"
                editor="text"
              />
              <Column
                field="codeDesc"
                headerClassName="justify-center w-[26%]"
                className="w-[26%]"
                title="코드설명"
                editor="text"
              />
              <Column
                field="sortOrder"
                headerClassName="justify-center w-[9%]"
                className="w-[9%]"
                title="정렬순서"
                editor="numeric"
              />
              <Column
                field="useYn"
                headerClassName="justify-center w-[13%]"
                className="w-[13%]"
                title="사용여부"
                cell={(props) => (
                  <DropDownCell
                    props={props}
                    enterEdit={enterEdit}
                    exitEdit={exitEdit}
                    listData={[
                      { text: "Y", value: "Y" },
                      { text: "N", value: "N" },
                    ]}
                  />
                )}
              />
            </Grid>
          </div>
          {/*  */}
          <div className="my-4 flex w-full flex-row justify-end gap-[4px]">
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={updateDetail}>
              저장
            </Button>
            <Button
              imageUrl="/images/dot-right-arrow.png"
              className="basic-btn flex items-center justify-start"
              onClick={() => setShowAddModal(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Window>
    </>
  );
};
