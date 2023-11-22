export const BudgetCell = ({ dataItem, ...props }: any) => {
  if (dataItem && dataItem.target !== undefined) {
    const budget = dataItem.target;
    const formattedBudget = `$${budget.toFixed(3)}`;
    return <td {...props.tdProps}>{formattedBudget}</td>;
  }
};
