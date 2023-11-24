import { RouteValue } from "@/constants/routes";

export interface IMenu {
  data: string;
  level: number;
  menuCheck?: string;
  gubn?: string;
  text: string;
  url?: RouteValue;
  items?: IMenu[];
}

export interface ITab extends Pick<IMenu, "text" | "url"> {}
