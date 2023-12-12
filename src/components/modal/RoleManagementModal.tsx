import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Window, WindowMoveEvent } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { Grid, GridColumn as Column, GridRowProps, GridNoRecords } from "@progress/kendo-react-grid";

interface PositionInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

const RowRender = (properties: any) => {
  const { row, props, onDrop, onDragStart } = properties;
  const additionalProps = {
    onDragStart: (e: any) => onDragStart(e, props.dataItem),
    onDragOver: (e: any) => {
      e.preventDefault();
    },
    onDrop: (e: any) => onDrop(e),
    draggable: true,
  };
  return React.cloneElement(row, { ...row.props, ...additionalProps }, row.props.children);
};

const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "10 boxes x 20 bags",
    UnitPrice: 18.0,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "24 - 12 oz bottles",
    UnitPrice: 19.0,
    UnitsInStock: 17,
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: "12 - 550 ml bottles",
    UnitPrice: 10.0,
    UnitsInStock: 13,
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 4,
    ProductName: "Chef Anton's Cajun Seasoning",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "48 - 6 oz jars",
    UnitPrice: 22.0,
    UnitsInStock: 53,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 5,
    ProductName: "Chef Anton's Gumbo Mix",
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: "36 boxes",
    UnitPrice: 21.35,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: true,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 6,
    ProductName: "Grandma's Boysenberry Spread",
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: "12 - 8 oz jars",
    UnitPrice: 25.0,
    UnitsInStock: 120,
    UnitsOnOrder: 0,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
  {
    ProductID: 7,
    ProductName: "Uncle Bob's Organic Dried Pears",
    SupplierID: 3,
    CategoryID: 7,
    QuantityPerUnit: "12 - 1 lb pkgs.",
    UnitPrice: 30.0,
    UnitsInStock: 15,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 7,
      CategoryName: "Produce",
      Description: "Dried fruit and bean curd",
    },
  },
];
export const RoleManagementModal: FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const element = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PositionInterface>({
    left: 250,
    top: 45,
    width: 1092,
    height: 728,
  });

  const [nestedPanes, setNestedPanes] = useState<Array<any>>([{ size: "50%", resizable: true }, {}]);

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

  const [gridData, setGridData] = useState(products);
  const [gridDataTwo, setGridDataTwo] = useState([{}]);
  const [dragFrom, setDragFrom] = useState("");
  const [dragDataItem, setDragDataItem] = useState<any>(null);

  const handleOnDropOne = (e: any) => {
    if (dragFrom === "second") {
      let newDataSecond = gridDataTwo.filter((item: any) => item.ProductID !== dragDataItem?.ProductID);
      let newDataFirst = [dragDataItem, ...gridData];
      setGridData(newDataFirst);
      setGridDataTwo(newDataSecond);
    }
  };

  const handleDragStartOne = (e: any, dataItem: any) => {
    setDragFrom("first");
    setDragDataItem(dataItem);
  };

  const handleOnDropTwo = (e: any) => {
    if (dragFrom === "first") {
      let newDataFirst = gridData.filter((item) => item.ProductID !== dragDataItem.ProductID);
      let newDataSecond = [dragDataItem, ...gridDataTwo];
      setGridData(newDataFirst);
      setGridDataTwo(newDataSecond);
    }
  };

  const handleDragStartTwo = (e: any, dataItem: any) => {
    setDragFrom("second");
    setDragDataItem(dataItem);
  };

  const rowForGridOne = (row: React.ReactElement<HTMLTableRowElement>, props: GridRowProps) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropOne} onDragStart={handleDragStartOne} />;
  };

  const rowForGridTwo = (row: React.ReactElement<HTMLTableRowElement>, props: GridRowProps) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropTwo} onDragStart={handleDragStartTwo} />;
  };
  return (
    <>
      <div className="k-overlay" />
      <Window
        minimizeButton={() => null}
        maximizeButton={() => null}
        restoreButton={() => null}
        doubleClickStageChange={false}
        title={"Role메뉴 권한 관리"}
        width={position.width}
        height={position.height}
        onMove={handleMove}
        onResize={handleResize}
        onClose={() => {
          setShowModal(false);
        }}>
        <div className="flex w-full flex-col p-4">
          <div className="pb-[10px] text-[17px] font-bold text-[#656565]">권한ID별 메뉴 권한 체크</div>
          <div className="flex h-[75vh] w-full">
            <Splitter
              panes={nestedPanes}
              onChange={(e) => {
                setNestedPanes(e.newState);
              }}>
              <div className="flex h-full w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴를 뺀 메뉴 목록</div>
                </div>
                <div className="flex h-full flex-col">
                  <div className="flex h-[40px] items-center gap-[8px] bg-[#dde6f0] px-[13px] py-[7px]">
                    <DropDownList
                      style={{
                        width: "40%",
                        fontSize: "12px",
                        marginLeft: "2px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                        fontWeight: "bold",
                        color: "#656565",
                      }}
                      size={"small"}
                      data={["menuName", "안전", "주의", "경계"]}
                      defaultValue={"menuName"}
                    />
                    <input className="ml-[2px] w-[30%] rounded-[2px] border-[1px] border-[#999999] py-[6px]" />
                  </div>
                  <Grid rowHeight={29} fixedScroll={true} data={gridData} rowRender={rowForGridOne}>
                    <GridNoRecords>
                      <div
                        onDrop={handleOnDropOne}
                        onDragOver={(e) => e.preventDefault()}
                        className="h-[17px] w-full"
                      />
                    </GridNoRecords>
                    <Column
                      field="ProductID"
                      title="Menu ID"
                      headerClassName="justify-center bg-[#adc6f4] w-[25%]"
                      className="w-[25%]"
                    />
                    <Column
                      field="ProductName"
                      title="Menu name"
                      headerClassName="justify-center bg-[#adc6f4] w-[75%]"
                      className="w-[75%]"
                    />
                  </Grid>
                  <div onDrop={handleOnDropOne} onDragOver={(e) => e.preventDefault()} className="h-full w-full" />
                </div>
              </div>
              <div className="flex h-full w-full flex-col gap-[15px] border-[1px]">
                <div className="flex items-center gap-1">
                  <img src="./images/dot_subtitle.gif" className="h-[12px] w-[12px]" />
                  <div className="text-[14px] font-bold text-[#656565]">권한ID 메뉴 목록</div>
                </div>
                <div className="flex h-full flex-col">
                  <Grid rowHeight={29} fixedScroll={true} data={gridDataTwo} rowRender={rowForGridTwo}>
                    <GridNoRecords>
                      <div onDrop={handleOnDropTwo} onDragOver={(e) => e.preventDefault()} className="h-full w-full" />
                    </GridNoRecords>
                    <Column
                      field="ProductID"
                      title="Menu ID"
                      headerClassName="justify-center bg-[#adc6f4] w-[15%]"
                      className="w-[15%]"
                    />
                    <Column
                      field="ProductName"
                      title="Menu name"
                      headerClassName="justify-center bg-[#adc6f4] w-[65%]"
                      className="w-[65%]"
                    />
                    <Column
                      field="Category.CategoryName"
                      title="Read"
                      headerClassName="justify-center bg-[#adc6f4] w-[10%]"
                      className="w-[10%]"
                    />
                    <Column
                      field="UnitPrice"
                      title="R/Write"
                      headerClassName="justify-center bg-[#adc6f4] w-[10%]"
                      className="w-[10%]"
                    />
                  </Grid>
                  <div onDrop={handleOnDropTwo} onDragOver={(e) => e.preventDefault()} className="h-full w-full" />
                </div>
              </div>
            </Splitter>
          </div>
          <div className="my-[10px] flex flex-row-reverse gap-1">
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={() => setShowModal(false)}>
              닫기
            </Button>
            <Button className="basic-btn mt-2 flex h-7 items-center justify-start">변경사항 저장</Button>
          </div>
        </div>
      </Window>
    </>
  );
};
