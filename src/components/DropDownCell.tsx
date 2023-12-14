import * as React from "react";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { GridCellProps } from "@progress/kendo-react-grid";

export const DropDownCell: React.FC<{
  props: GridCellProps;
  enterEdit: (dataItem: any, field?: string) => void;
  exitEdit: (dataItem: any, field: string) => void;
}> = ({ props, enterEdit, exitEdit }) => {
  const localizedData = [
    { text: "사용중", value: "Y" },
    { text: "중지", value: "N" },
  ];

  const handleChange = (e: DropDownListChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
    if (props.dataItem[props.field || ""]) {
      console.log(
        "DropDownCell handleChange: ",
        props.dataItem[props.field || ""],
        e.target.value.value,
        e.target.value.text,
        e.target.state.text,
      );
      props.dataItem[props.field || ""] = e.target.value.text;
      props.dataItem.useYn = e.target.value.value;
      exitEdit(props.dataItem, props.field || "");
    }
  };

  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  return dataItem.inEdit === field ? (
    <td colSpan={props.colSpan} className={props.className} aria-colindex={props.ariaColumnIndex} style={props.style}>
      <DropDownList
        style={{ width: "100%" }}
        onChange={handleChange}
        value={localizedData.find((c) => c.text === dataValue)}
        data={localizedData}
        textField="text"
      />
    </td>
  ) : (
    <td
      colSpan={props.colSpan}
      className={props.className}
      aria-colindex={props.ariaColumnIndex}
      style={props.style}
      onClick={() => enterEdit(dataItem, field)}>
      <span>{dataValue}</span>
    </td>
  );
};
