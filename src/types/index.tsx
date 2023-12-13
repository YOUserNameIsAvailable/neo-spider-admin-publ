import { RouteValue } from "@/constants/routes";

export interface IMenu {
  data: string;
  level: number;
  menuCheck?: string;
  gubn?: string;
  text: string;
  url?: RouteValue;
  items?: IMenu[];
  checkLayoutSegment?: string;
}

export interface ITab extends Pick<IMenu, "text" | "url"> {}

export interface ClientWebProps {
  onRowClick?: (event: any) => void;
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  // other props...
}
