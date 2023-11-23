import { GridColumnMenuSort, GridColumnMenuFilter, GridColumnMenuGroup } from "@progress/kendo-react-grid";

export const ColumnMenu = ({ dataItem, ...props }: any) => {
  return (
    <div >
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} />
      <GridColumnMenuGroup {...props} />
    </div>
  );
};
