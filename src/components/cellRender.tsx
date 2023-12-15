import * as React from "react";
import { DropDownCell } from "./DropDownCell";
import { data } from "jquery";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { Popover, Tooltip } from "@progress/kendo-react-tooltip";
import { Icon } from "@progress/kendo-react-common";

interface CellRenderProps {
  originalProps: any;
  td: React.ReactElement<HTMLTableCellElement>;
  enterEdit: (dataItem: any, field: string | undefined) => void;
  exitEdit?: (dataItem: any, field: string) => void;
  editField: string | undefined;
}

interface RowRenderProps {
  originalProps: any;
  tr: React.ReactElement<HTMLTableRowElement>;
  exitEdit: (dataItem: any, field: string) => void;
  editField: string | undefined;
}

const validateLogic = (value: any, type: string) => {
  if (type === "numeric") {
    return value > 0;
  } else if (type === "text") {
    return value === "";
  }
  return true;
};

const ValidationCell = (props: any) => {
  const ele = React.useRef<any>(null);
  const tooltip = React.useRef<Tooltip>(null);
  const [isValidate, setIsValidate] = React.useState<boolean>(false);
  const dataItem = props.originalProps.dataItem;
  const field = props.originalProps.field;
  const td = props.td;
  const type = props.originalProps.editor;
  const tdClassName = td.props.className;
  const [value, setValue] = React.useState<any>(dataItem[field]);

  console.log("ValidationCell props: ", td, type, props);

  const handleOnChange = (e: any) => {
    const validate = validateLogic(e.value, type);
    const _value = type === "text" ? e?.currentTarget?.value : e.value;
    console.log(123123, validate, e?.currentTarget?.value, type, e);
    setIsValidate(validate);
    setValue(_value);
    dataItem[field] = _value;
  };

  return (
    <td
      className={tdClassName}
      ref={(td: any) => {
        const input = td && td.querySelector("input");
        const activeElement = document.activeElement;

        if (!input || !activeElement || input === activeElement || !activeElement.contains(input)) {
          return;
        }

        if (input.type === "checkbox") {
          input.focus();
        } else {
          input.select();
        }
      }}>
      {type === "numeric" ? (
        <NumericTextBox required spinners={false} value={value} onChange={handleOnChange} ref={ele} />
      ) : type === "text" ? (
        <Input required value={value} onInput={handleOnChange} ref={ele} />
      ) : (
        <span>{dataItem[field]}</span>
      )}

      {isValidate && (
        <Tooltip
          ref={tooltip}
          showCallout={true}
          style={{ width: "max-content", height: "26px", whiteSpace: "nowrap", cursor: "pointer" }}
          anchorElement={ele.current && ele.current.element}
          position="bottom"
          openDelay={100}>
          <Icon name="warning" />
          필수 입력 값 입니다.
        </Tooltip>
      )}
    </td>
  );
};

export const CellRender = (props: CellRenderProps) => {
  const dataItem = props.originalProps.dataItem;
  const cellField = props.originalProps.field;
  const inEditField = dataItem[props.editField || ""];
  const additionalProps =
    cellField && cellField === inEditField
      ? {
          ref: (td: any) => {
            const input = td && td.querySelector("input");
            const activeElement = document.activeElement;

            if (!input || !activeElement || input === activeElement || !activeElement.contains(input)) {
              return;
            }

            if (input.type === "checkbox") {
              input.focus();
            } else {
              input.select();
            }
          },
        }
      : {
          onClick: () => {
            props.enterEdit(dataItem, cellField);
          },
        };

  const clonedProps: any = { ...props.td.props, ...additionalProps };
  const childNodes: any = props.td.props.children;

  return cellField && cellField === inEditField ? (
    <ValidationCell {...props} />
  ) : (
    React.cloneElement(props.td, clonedProps, childNodes)
  );
};

export const RowRender = (props: RowRenderProps) => {
  const trProps = {
    ...props.tr.props,
    onBlur: () => {
      setTimeout(() => {
        const activeElement = document.activeElement;

        if (activeElement && activeElement.className.indexOf("k-calendar") < 0) {
          const dataItem = props.originalProps.dataItem;
          const cellField = props.originalProps.field;
          const type = props.originalProps.editor;
          const isValidate = validateLogic(dataItem[cellField], type);

          if (!isValidate) {
            props.exitEdit(dataItem, cellField);
          } else {
            return false;
          }
        }
      });
    },
  };
  const childNodes: any = props.tr.props.children;
  return React.cloneElement(props.tr, { ...trProps }, childNodes);
};
