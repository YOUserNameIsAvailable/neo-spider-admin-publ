export const CountryCell = ({ dataItem, ...props }: any) => {
  if (!dataItem || !dataItem.flag) {
    return null;
  }
  return (
    <td {...props.tdProps}>
      <img
        src={dataItem.flag}
        width="30"
        height="16"
        alt="Flag"
        style={{
          marginLeft: "12px",
        }}
      />
    </td>
  );
};
