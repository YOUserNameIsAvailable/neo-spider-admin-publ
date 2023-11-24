export const PersonCell = ({ dataItem, ...props }: any) => {
  if (!dataItem || !dataItem.image) {
    return dataItem.full_name;
  }
  const imageDataUrl = dataItem.image.replace(/url\('(.*)'\)/, "$1");
  return (
    <td {...props.tdProps}>
      <img src={imageDataUrl} alt="" width="34" height="34" className="contact-img" />
      <span
        style={{
          display: "inlineBlock",
          paddingLeft: "10px",
          verticalAlign: "middle",
          lineHeight: "32px",
        }}
        className="person-name">
        {dataItem.full_name}
      </span>
    </td>
  );
};
