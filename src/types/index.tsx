import { RoutePathType } from "@/routes";

export interface IMenu {
  data: string;
  level: number;
  menuCheck?: string;
  gubn?: string;
  text: string;
  url?: RoutePathType;
  items?: IMenu[];
}

export interface ITab extends Pick<IMenu, "text" | "url"> {}

export interface ClientWebProps {
  onRowClick?: (event: any) => void;
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  // other props...
}
