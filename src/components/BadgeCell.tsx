import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";

export const BadgeCell = ({ dataItem, ...props }: any) => {
  const isOnline = dataItem.is_online;

  return (
    <td {...props.tdProps}>
      <BadgeContainer>
        {isOnline ? (
          <Badge size="small" themeColor="success" cutoutBorder={true}>
            <span>Online</span>
          </Badge>
        ) : (
          <Badge
            size="small"
            align={{
              vertical: "bottom",
              horizontal: "end",
            }}
            themeColor="error"
            cutoutBorder={true}
          >
            <span>Offline</span>
          </Badge>
        )}
      </BadgeContainer>
    </td>
  );
};
