import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { FC, useState } from "react";

export const ConditionRow: FC<{
  label?: string;
  type?: string;
  value?: string;
  listData?: string[];
  disabled?: boolean;
  isDot?: boolean;
  Key: string;
  btnText?: string;
  setForm?: any;
  btnEvent?: () => void;
}> = ({ label, type, value, listData, disabled, isDot, Key, btnText, btnEvent, setForm }) => {
  const updateHandler = () => {
    setForm({ [Key]: value });
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
        <DropDownList
          style={{ width: "40%", marginRight: "2px", fontSize: "12px", marginLeft: "2px" }}
          size={"small"}
          data={listData}
          defaultValue={"선택 안 함"}
          value={value}
          onChange={updateHandler}
        />
      ) : (
        <input
          className="ml-[2px] mr-[2px] w-[45%] rounded-[2px] border-[1px] border-[#999999] py-[2px]"
          disabled={disabled}
          defaultValue={value}
          onChange={updateHandler}
        />
      )}
      {isDot && <span className="required">*</span>}
    </div>
  );
};
