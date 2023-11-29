import { PRODUCTS, SPORTS } from "@/constants";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import { FC, ReactElement, cloneElement, useState, DragEvent } from "react";

export interface UserRoleManagementDialogProps {
  open: boolean;
  onClose: (payload?: any) => void;
  userId?: string;
}

interface DataItem {
  ProductID: number;
  ProductName: string;
  Category: {
    CategoryName: string;
  };
  UnitPrice: number;
  UnitsInStock: number;
}

const RowRender: FC<{
  row: ReactElement;
  props: any;
  onDrop: (e: DragEvent) => void;
  onDragStart: (e: DragEvent, dataItem: DataItem) => void;
}> = ({ row, props, onDrop, onDragStart }) => {
  const additionalProps = {
    onDragStart: (e: DragEvent) => onDragStart(e, props.dataItem),
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
    },
    onDrop: (e: DragEvent) => onDrop(e),
    draggable: true,
  };
  return cloneElement(row, { ...row.props, ...additionalProps }, row.props.children);
};

export const UserRoleManagementDialog: FC<UserRoleManagementDialogProps> = ({ onClose, open, userId }) => {
  const [gridData, setGridData] = useState<DataItem[]>(PRODUCTS.slice(0, 30));
  const [gridDataTwo, setGridDataTwo] = useState<DataItem[]>(PRODUCTS.slice(31, 60));
  const [dragFrom, setDragFrom] = useState<string>("");
  const [dragDataItem, setDragDataItem] = useState<DataItem | null>(null);

  const handleOnDropOne = (e: DragEvent) => {
    if (dragFrom === "second") {
      const newDataSecond = gridDataTwo.filter((item) => item.ProductID !== dragDataItem?.ProductID);
      const newDataFirst = [dragDataItem!, ...gridData];
      setGridData(newDataFirst);
      setGridDataTwo(newDataSecond);
    }
  };

  const handleDragStartOne = (e: DragEvent, dataItem: DataItem) => {
    setDragFrom("first");
    setDragDataItem(dataItem);
  };

  const handleOnDropTwo = (e: DragEvent) => {
    if (dragFrom === "first") {
      const newDataFirst = gridData.filter((item: any) => item.ProductID !== dragDataItem?.ProductID);
      const newDataSecond = [dragDataItem!, ...gridDataTwo];
      setGridData(newDataFirst);
      setGridDataTwo(newDataSecond);
    }
  };

  const handleDragStartTwo = (e: DragEvent, dataItem: DataItem) => {
    setDragFrom("second");
    setDragDataItem(dataItem);
  };

  const rowForGridOne = (row: ReactElement, props: any) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropOne} onDragStart={handleDragStartOne} />;
  };

  const rowForGridTwo = (row: ReactElement, props: any) => {
    return <RowRender props={props} row={row} onDrop={handleOnDropTwo} onDragStart={handleDragStartTwo} />;
  };

  const closeDialog = (payload?: any) => {
    onClose(payload);
  };

  if (!open) return <></>;

  return (
    <Dialog title={"User menu role management - 9834187"} onClose={(e) => onClose()} width={1150}>
      <div className="flex items-center gap-4 pb-4 ">
        <img src={"/images/dot_subtitle.gif"} alt="" />
        <span>A list of menus except user menu</span>
      </div>

      <div className="flex gap-2 ">
        <div>
          <div className="my-4 flex items-center gap-4 ">
            <DropDownList
              className="h-7 w-32"
              size={"small"}
              data={SPORTS}
              defaultValue="Option 1"
              filterable={false}
            />

            <Input className="h-7 w-40" />
          </div>
          <Grid style={{ height: "450px" }} data={gridData} rowRender={rowForGridOne}>
            <GridColumn field="ProductID" title="Menu ID	" width="200px" />
            <GridColumn field="ProductName" title="Menu Name" width="280px" />
          </Grid>
        </div>

        <div>
          <div className="-pt-[20] flex items-center gap-2 pb-4">
            <img src={"/images/dot_subtitle.gif"} alt="" />
            <span>User menu list</span>
          </div>
          <Grid style={{ height: "450px" }} data={gridDataTwo} rowRender={rowForGridTwo}>
            <GridColumn field="ProductID" title="Menu ID" width="200px" />
            <GridColumn field="ProductName" title="Menu Name	" width="280px" />
            <GridColumn
              field="Category.CategoryName"
              title="Read"
              width="60px"
              cell={(props) => (
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Checkbox />
                </td>
              )}
            />
            <GridColumn
              field="Category.CategoryName"
              title="R/Write"
              width="100px"
              cell={(props) => (
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Checkbox />
                </td>
              )}
            />
          </Grid>
        </div>
      </div>
      <DialogActionsBar>
        <div className="flex justify-end gap-2">
          <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
            Save
          </Button>
          <Button
            svgIcon={arrowRightIcon}
            className="mt-2 flex items-center  justify-end"
            onClick={() => closeDialog()}>
            Close
          </Button>
        </div>
      </DialogActionsBar>
    </Dialog>
  );
};
