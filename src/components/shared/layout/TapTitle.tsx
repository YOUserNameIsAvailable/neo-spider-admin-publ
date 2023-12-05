import { ITab } from "@/types";
import { usePathname } from "next/navigation";
import { SvgIcon } from "@progress/kendo-react-common";
import { xIcon } from "@progress/kendo-svg-icons";

export const TabTitle = ({
  tab,
  onSelectTab,
  onRemoveTab,
  hideClose,
}: {
  tab: ITab;
  onSelectTab: (tab: ITab) => void;
  onRemoveTab: (tab: ITab) => void;
  hideClose?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5"
      onClick={(e) => {
        e.stopPropagation();
        onSelectTab(tab);
      }}>
      <img className="w-3" src="/images/tab-icon.png" alt="" />
      <span className={`text-[11px] font-bold text-[#000] ${tab.url === pathname ? "text-[#656565]" : ""}`}>
        {tab.text}
      </span>
      {!hideClose && (
        <span
          className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button !p-0"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveTab(tab);
          }}>
          <SvgIcon
            icon={xIcon}
            size="small"
            className={`text-[#000] ${tab.url === pathname ? "text-[#656565]" : ""}`}
          />
        </span>
      )}
    </div>
  );
};
