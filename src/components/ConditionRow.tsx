import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { FC, useRef, useState } from "react";

export const ConditionRow: FC<{
  label?: string;
  type?: string;
  value?: string;
  listData?: string[];
  disabled?: boolean;
  isRequired?: boolean;
  Key: string;
  btnText?: string;
  setForm?: any;
  btnEvent?: () => void;
  isValidate?: boolean;
}> = ({ label, type, value, listData, disabled, isRequired, Key, btnText, btnEvent, setForm, isValidate = false }) => {
  const tooltip = useRef<Tooltip>(null);

  const updateHandler = (e: any) => {
    console.log("updateHandler: ", e.target.value);
    setForm((prev: any) => ({ ...prev, [Key]: e.target.value }));
  };

  return (
    <div className="flex w-[50%] items-center">
      <label className="flex h-full w-[150px] min-w-[150px] items-center bg-[#d1daec] p-1 text-[12px] text-black">
        {label}
      </label>
      {type === "button" ? (
        <Button
          imageUrl="/images/dot-right-arrow.png"
          className="basic-btn ml-1 flex h-7 items-center justify-start"
          onClick={btnEvent}>
          {btnText}
        </Button>
      ) : type === "select" ? (
        <div
          className="h-full w-[40%]"
          onMouseOver={(e) => {
            // console.log(tooltip.current);
            tooltip.current && tooltip.current.handleMouseOver(e);
          }}
          onMouseOut={(e) => tooltip.current && tooltip.current.handleMouseOut(e)}>
          <DropDownList
            validationMessage=""
            className="test"
            validityStyles={isValidate}
            style={{ marginRight: "2px", fontSize: "12px", marginLeft: "2px", paddingTop: "0px" }}
            size={"small"}
            defaultValue={"선택 안함"}
            data={listData}
            value={value}
            title="Select sport"
            required={isRequired}
            onChange={updateHandler}
          />
          {isValidate && isRequired && (
            <Tooltip
              ref={tooltip}
              style={{ width: "max-content", height: "26px", whiteSpace: "nowrap" }}
              anchorElement="target"
              position="right"
              openDelay={300}
            />
          )}
        </div>
      ) : (
        <div
          className="w-[45%]"
          onMouseOver={(e) => isValidate && tooltip.current && tooltip.current.handleMouseOver(e)}
          onMouseOut={(e) => isValidate && tooltip.current && tooltip.current.handleMouseOut(e)}>
          <Input
            validityStyles={isValidate}
            className="ml-[2px] mr-[2px] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
            disabled={disabled}
            defaultValue={value}
            required={isRequired}
            title={`${label}을(를) 입력하세요`}
            onChange={updateHandler}
            onInvalid={(e) => {
              e.preventDefault();
            }}
          />
          {isValidate && isRequired && (
            <Tooltip
              ref={tooltip}
              style={{ width: "max-content", height: "26px", whiteSpace: "nowrap" }}
              anchorElement="target"
              position="right"
              openDelay={300}
            />
          )}
        </div>
      )}
      {isRequired && <span className="required">*</span>}
    </div>
  );
};
