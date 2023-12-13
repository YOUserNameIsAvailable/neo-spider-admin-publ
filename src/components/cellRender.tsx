import * as React from "react";

interface CellRenderProps {
  originalProps: any;
  td: React.ReactElement<HTMLTableCellElement>;
  enterEdit: (dataItem: any, field: string | undefined) => void;
  editField: string | undefined;
}

interface RowRenderProps {
  originalProps: any;
  tr: React.ReactElement<HTMLTableRowElement>;
  exitEdit: () => void;
  editField: string | undefined;
}

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
  return React.cloneElement(props.td, clonedProps, childNodes);
};

export const RowRender = (props: RowRenderProps) => {
  const trProps = {
    ...props.tr.props,
    onBlur: () => {
      setTimeout(() => {
        const activeElement = document.activeElement;

        if (activeElement && activeElement.className.indexOf("k-calendar") < 0) {
          props.exitEdit();
        }
      });
    },
  };
  const childNodes: any = props.tr.props.children;
  return React.cloneElement(props.tr, { ...trProps }, childNodes);
};
