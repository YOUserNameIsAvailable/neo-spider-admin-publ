import * as React from "react";
import { DropDownCell } from "./DropDownCell";
import { data } from "jquery";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { Popover, Tooltip } from "@progress/kendo-react-tooltip";
import { Icon } from "@progress/kendo-react-common";
import { useRecoilState } from "recoil";
import { validateFieldState } from "@/store";

interface CellRenderProps {
  originalProps: any;
  td: React.ReactElement<HTMLTableCellElement>;
  enterEdit: (dataItem: any, field?: string, type?: string) => void;
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
  const [validateField, setValidateField] = useRecoilState(validateFieldState);
  const ele = React.useRef<any>(null);
  const [isValidate, setIsValidate] = React.useState<boolean>(false);
  const dataItem = props.originalProps.dataItem;
  const field = props.originalProps.field;
  const type = props.originalProps.editor;
  const editField = props.editField || "";
  const inEditField = dataItem[editField];
  const [value, setValue] = React.useState<any>(dataItem[field]);

  const handleOnChange = (e: any) => {
    const _value = type === "text" ? e?.currentTarget?.value : e.value;
    const validate = validateLogic(_value, type);
    setIsValidate(validate);
    setValue(_value);
    dataItem[field] = _value;

    if (validate) {
      setValidateField(field);
    } else {
      setValidateField("");
    }
  };

  React.useEffect(() => {
    if (ele?.current) {
      const validate = validateLogic(ele.current.value, type);
      setIsValidate(validate);
    }
  }, [ele?.current]);

  return (
    <td {...props.td}>
      {field !== inEditField || (validateField !== "" && validateField !== field) ? (
        props?.childNodes
      ) : type === "numeric" ? (
        <NumericTextBox required spinners={false} value={value} onChange={handleOnChange} ref={ele} />
      ) : type === "text" ? (
        <Input required value={value} onInput={handleOnChange} ref={ele} />
      ) : (
        props?.childNodes
      )}

      <Popover show={isValidate} anchor={ele.current && ele.current.element} position="bottom">
        <Icon name="warning" />
        필수 입력 값 입니다.
      </Popover>
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

  return <ValidationCell {...props} td={clonedProps} childNodes={childNodes} />;
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

          props.exitEdit(dataItem, cellField);
        }
      });
    },
  };
  const childNodes: any = props.tr.props.children;
  return React.cloneElement(props.tr, { ...trProps }, childNodes);
};
