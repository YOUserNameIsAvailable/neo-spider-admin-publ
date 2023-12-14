"use client";

import {
  TreeView,
  TreeViewDragClue,
  processTreeViewItems,
  moveTreeViewItem,
  TreeViewDragAnalyzer,
  TreeViewItemDragOverEvent,
  TreeViewItemDragEndEvent,
  TreeViewItemClickEvent,
  TreeViewCheckChangeEvent,
  ItemRenderProps,
  TreeViewExpandChangeEvent,
} from "@progress/kendo-react-treeview";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import React, { useEffect } from "react";

interface TreeViewDataItem {
  text: string;
  expanded?: boolean;
  checked?: boolean;
  selected?: boolean;
  items?: TreeViewDataItem[];
}

function getSiblings(itemIndex: string, data: TreeViewDataItem[]) {
  let result = data;

  const indices = itemIndex.split(SEPARATOR).map((index) => Number(index));
  for (let i = 0; i < indices.length - 1; i++) {
    result = result[indices[i]].items || [];
  }

  return result;
}

const SEPARATOR = "_";
const treeData: TreeViewDataItem[] = [
  {
    text: "Furniture",
    expanded: true,
    items: [{ text: "Tables & Chairs" }, { text: "Sofas" }, { text: "Occasional Furniture" }],
  },
  {
    text: "Decor",
    expanded: true,
    items: [{ text: "Bed Linen" }, { text: "Curtains & Blinds" }, { text: "Carpets" }],
  },
];
// const treeData: TreeViewDataItem[] = [
//   {
//     text: "Furniture",
//     expanded: true,
//     items: [{ text: "Tables & Chairs" }, { text: "Sofas" }, { text: "Occasional Furniture" }],
//   },
//   {
//     text: "Decor",
//     expanded: true,
//     items: [{ text: "Bed Linen" }, { text: "Curtains & Blinds" }, { text: "Carpets" }],
//   },
// ];

const MENUS = [
  {
    data: "msg_manage",
    level: 2,
    text: "Trans & msg management",
    items: [
      {
        data: "msg_trx_manage",
        level: 3,
        text: "Transaction management",
        url: "/transaction-management",
      },
      {
        data: "message_manage",
        level: 3,
        text: "Message management",
        url: "/message-management",
      },
      {
        data: "message_parsing_test",
        level: 3,
        text: "Parsing message log",
        url: "/parsing-message-log",
      },
      {
        data: "db_log",
        level: 3,
        text: "Search message log(DB)",
        url: "/search-message-log",
      },
      {
        data: "trans_data_popup",
        level: 3,
        text: "Create transfer data",
        url: "/create-transfer-data",
      },
      {
        data: "trans_data_exec",
        level: 3,
        text: "Apply transfer data",
        url: "/apply-transfer-data",
      },
      {
        data: "trans_data_list",
        level: 3,
        text: "Search transfer data",
        url: "/search-transfer-data",
      },
      {
        data: "trx",
        level: 3,
        text: "Transaction stop",
        url: "/transaction-stop",
      },
      {
        data: "web_app_group",
        level: 3,
        text: "Transaction /WebApp Group manage",
        url: "/transaction-web-app-group-manage",
      },
      {
        data: "req_message_test",
        level: 3,
        gubn: "iframe",
        text: "Message test",
        url: "/message-test",
      },
      {
        data: "message_statistics",
        level: 3,
        text: "Performance statistics by transaction(DB)",
        url: "/transaction-performance-statistics",
      },
      {
        data: "trx_test_case",
        level: 3,
        gubn: "iframe",
        text: "Message Testcase",
        url: "/message-test-case",
      },
      {
        data: "domain_manage",
        level: 3,
        text: "Domain Manage",
        url: "/domain-management",
      },
      {
        data: "common_field",
        level: 3,
        text: "Common Field Mapping",
        url: "/common-field-mapping",
      },
      {
        data: "proxy_testdata",
        level: 3,
        gubn: "iframe",
        text: "Outward proxy msg management",
        url: "/outward-proxy-msg-management",
      },
      {
        data: "simple_testdata",
        level: 3,
        gubn: "iframe",
        text: "Inward data(simple)",
        url: "/inward-simple-data",
      },
      {
        data: "multi_testdata",
        level: 3,
        gubn: "iframe",
        text: "Inward data(multi)",
        url: "/inward-multi-data",
      },
      {
        data: "multi_testcase",
        level: 3,
        gubn: "iframe",
        text: "Inward test scenario(biz)",
        url: "/inward-biz-test-scenario",
      },
      {
        data: "multi_testcase_result",
        level: 3,
        gubn: "iframe",
        text: "Search log (scenario)",
        url: "/search-logs-scenario",
      },
      {
        data: "message_parsing_json",
        level: 3,
        text: "Parsing message log to JSON",
        url: "/message-logs-json-parser",
      },
    ],
  },
  {
    data: "interface_manage",
    level: 2,
    text: "Interface management",
    items: [
      {
        data: "connect_org_manage",
        level: 3,
        text: "Organization management",
        url: "/organization-management",
      },
      {
        data: "gw_manage",
        level: 3,
        text: "Gateway management",
        url: "/gateway-management",
      },
      {
        data: "org_trans_manage",
        level: 3,
        text: "Org-Gateway mapping management",
        url: "/org-gateway-mapping-management",
      },
      {
        data: "msg_handle_manage",
        level: 3,
        text: "Message handler management",
        url: "/message-handler-management",
      },
      {
        data: "listener_connector_manage",
        level: 3,
        text: "Listener-Connector mapping management",
        url: "/listener-connector-mapping-management",
      },
      {
        data: "was_status",
        level: 3,
        text: "Gateway info per WAS",
        url: "/was-gateway-information",
      },
      {
        data: "app_mapping_manage",
        level: 3,
        text: "Application mapping management",
        url: "/application-mapping-management",
      },
      {
        data: "was_status_monitor",
        level: 3,
        text: "WAS Status Monitor",
        url: "/was-status-monitor",
      },
    ],
  },
  {
    data: "cd_manage",
    level: 2,
    text: "Code management",
    items: [
      {
        data: "neb_code_group_manage",
        level: 3,
        text: "Code group management",
        url: "/code-group-management",
      },
      {
        data: "code_manage",
        level: 3,
        text: "Code management",
        url: "/code-management",
      },
      {
        data: "code_mapping_manage",
        level: 3,
        text: "Code mapping management",
        url: "/code-mapping-management",
      },
    ],
  },
  {
    data: "opt_manage",
    level: 2,
    text: "Operation info management",
    items: [
      {
        data: "system_oper_mange",
        level: 3,
        text: "Operation info manage (reload)",
        url: "/operation-info-management",
      },
      {
        data: "property_db_manage",
        level: 3,
        text: "Property DB management",
        url: "/property-db-management",
      },
      {
        data: "biz_group",
        level: 3,
        text: "Biz group management",
        url: "/biz-group-management",
      },
      {
        data: "work_space_manage",
        level: 3,
        text: "Work Space Management",
        url: "/work-space-management",
      },
      {
        data: "xml_property_manage",
        level: 3,
        text: "XML Property Management",
        url: "/xml-property-management",
      },
    ],
  },
  {
    data: "batch_manage",
    level: 2,
    text: "Batch management",
    items: [
      {
        data: "batch_app_manage",
        level: 3,
        text: "Batch app management",
        url: "/batch-app-management",
      },
      {
        data: "batch_his_list",
        level: 3,
        text: "Batch history list",
        url: "/batch-history-list",
      },
      {
        data: "executing_batch",
        level: 3,
        gubn: "iframe",
        text: "Executing batch",
        url: "/executing-batch",
      },
    ],
  },
  {
    data: "error_manage",
    level: 2,
    text: "Error management",
    items: [
      {
        data: "error_cause_his",
        level: 3,
        text: "Error cause history",
        url: "/error-cause-history",
      },
      {
        data: "error_code",
        level: 3,
        text: "Error code management",
        url: "/error-code-management",
      },
      {
        data: "error_handle_app_his_monitor",
        level: 3,
        text: "Handler execution history for each error",
        url: "/error-handler-execution-history",
      },
      {
        data: "error_his_stats",
        level: 3,
        text: "Error history statistics",
        url: "/error-history-statistics",
      },
      {
        data: "error_manage_app",
        level: 3,
        text: "Error handler management",
        url: "/error-handler-management",
      },
    ],
  },
  {
    data: "was_manage",
    level: 2,
    text: "WAS management",
    items: [
      {
        data: "was_group_manage",
        level: 3,
        text: "WAS group management",
        url: "/was-group-management",
      },
      {
        data: "was_instance",
        level: 3,
        text: "Was instance management",
        url: "/was-instance-management",
      },
      {
        data: "my_workspace_manage",
        level: 3,
        text: "My Workspace management",
        url: "/my-workspace-management",
      },
      {
        data: "approval_manage",
        level: 3,
        text: "Approval management",
        url: "/approval-management",
      },
    ],
  },
  {
    data: "service_manager",
    level: 2,
    text: "Service management",
    items: [
      {
        data: "neb_service_base_info",
        level: 3,
        text: "Service management",
        url: "/service-management",
      },
      {
        data: "neb_biz_component",
        level: 3,
        text: "Component management",
        url: "/component-management",
      },
      {
        data: "validator_component",
        level: 3,
        text: "Validator Component",
        url: "/validator-component",
      },
      {
        data: "biz_app",
        level: 3,
        text: "Biz Component",
        url: "/biz-component",
      },
      {
        data: "sql_query_manage",
        level: 3,
        text: "SQL Query Management",
        url: "/sql-query-management",
      },
      {
        data: "sql_dataSource_manage",
        level: 3,
        text: "datasource manage",
        url: "/data-source-management",
      },
      {
        data: "neb_biz_service_base_info",
        level: 3,
        text: "Biz Service Management",
        url: "/biz-service-management",
      },
    ],
  },
  {
    data: "admin_monitor",
    level: 2,
    text: "Monitor manage",
    items: [
      {
        data: "system_biz_view",
        level: 3,
        text: "Status board inquiry",
        url: "/status-board-inquiry",
      },
      {
        data: "system_biz_reg",
        level: 3,
        text: "Create status plate",
        url: "/create-status-plate",
      },
      {
        data: "context_monitor",
        level: 3,
        text: "Memory statistics",
        url: "/memory-statistics",
      },
      {
        data: "access_user_id",
        level: 3,
        text: "Stop transaction accessors",
        url: "/stop-transaction-accessors",
      },
      {
        data: "trx_stop_his",
        level: 3,
        text: "Transaction history",
        url: "/transaction-history",
      },
      {
        data: "perfomance_monitoring",
        level: 3,
        text: "Performance monitoring",
        url: "/performance-monitoring",
      },
      {
        data: "monitoring_stat",
        level: 3,
        text: "Monitoring statistics",
        url: "/monitoring-statistics",
      },
      {
        data: "trx_reservation_stop",
        level: 3,
        text: "Set up a transaction reservation stop",
        url: "/trans-reservation-hold-setup",
      },
      {
        data: "log_level_manage",
        level: 3,
        text: "Log level adjustment",
        url: "/log-level-adjustment",
      },
      {
        data: "wroking_thread_monitor",
        level: 3,
        gubn: "iframe",
        text: "Process in progress",
        url: "/in-progress-process",
      },
      {
        data: "testcase",
        level: 3,
        text: "Performance test",
        url: "/performance-test",
      },
      {
        data: "web_log_search",
        level: 3,
        text: "Web Log Search",
        url: "/web-log-search",
      },
      {
        data: "user_page_log",
        level: 3,
        text: "Maneger Log",
        url: "/manager-log",
      },
      {
        data: "bank_status_manage",
        level: 3,
        text: "Bank Status Management",
        url: "/bank-status-management",
      },
      {
        data: "biz_part_status",
        level: 3,
        text: "Real-time Monitor State Management",
        url: "/real-time-monitor-state-management",
      },
    ],
  },
  {
    data: "test_manage",
    level: 2,
    text: "Test manage",
    items: [
      {
        data: "req_service_test",
        level: 3,
        gubn: "iframe",
        text: "Service test",
        url: "/service-test",
      },
      {
        data: "neb_testcase",
        level: 3,
        gubn: "iframe",
        text: "Web performance test",
        url: "/web-performance-test",
      },
    ],
  },
  {
    data: "fwk_user_manage",
    level: 2,
    text: "User management",
    items: [
      {
        data: "user_manage",
        level: 3,
        text: "User management",
        url: "/user-management",
      },
      {
        data: "menu_manage",
        level: 3,
        text: "Menu management",
        url: "/menu-management",
      },
      {
        data: "role_manage",
        level: 3,
        text: "Role management",
        url: "/role-management",
      },
      {
        data: "my_favorites",
        level: 3,
        text: "Inital screen menu manage",
        url: "/initial-screen-menu-management",
      },
      {
        data: "file_upload_manage",
        level: 3,
        gubn: "iframe",
        text: "file management",
        url: "/file-management",
      },
      {
        data: "db_manage",
        level: 3,
        gubn: "iframe",
        text: "db manage",
        url: "/database-management",
      },
      {
        data: "request_input_data",
        level: 3,
        gubn: "iframe",
        text: "request value",
        url: "/request-value",
      },
      {
        data: "my_info_manage",
        level: 3,
        text: "Personal information modification",
        url: "/edit-personal-information",
      },
    ],
  },
  {
    data: "multi_lang_manage",
    level: 2,
    text: "Multi Language Mananage",
    items: [
      {
        data: "label_manage",
        level: 3,
        text: "Label Management",
        url: "/label-management",
      },
      {
        data: "locale_label_manage",
        level: 3,
        text: "Locale Label Management",
        url: "/locale-label-management",
      },
      {
        data: "I18n_manage",
        level: 3,
        text: "Multi Language Management",
        url: "/multi-language-management",
      },
    ],
  },
  {
    data: "PT_site_manager",
    level: 2,
    text: "Web App Manage",
    items: [
      {
        data: "custWebAppList",
        level: 3,
        text: "Client WebApp Manage",
        url: "/client-web-app-management",
      },
      {
        data: "site_menu",
        level: 3,
        text: "Site Menu Management",
        url: "/site-menu-management",
      },
      {
        data: "guide_manage",
        level: 3,
        text: "Page Guide Management",
        url: "/page-guide-management",
      },
      {
        data: "notice_popup_manage",
        level: 3,
        text: "Page Notice Management",
        url: "/page-notice-management",
      },
      {
        data: "emergency_notice",
        level: 3,
        text: "Emergency Notice",
        url: "/emergency-notice",
      },
      {
        data: "cust_menu_app",
        level: 3,
        text: "Web Component",
        url: "/web-component",
      },
      {
        data: "web_message_manage",
        level: 3,
        text: "Web Message Manage",
        url: "/web-message-management",
      },
      {
        data: "w3c_validate",
        level: 3,
        text: "Web standard",
        url: "/web-standard",
      },
    ],
  },
  {
    data: "OPEN_API",
    level: 2,
    text: "Open API",
    items: [
      {
        data: "ops_api_group_tm",
        level: 3,
        text: "API Group Management",
        url: "/api-group-management",
      },
      {
        data: "ops_api_tm",
        level: 3,
        text: "API Management",
        url: "/api-management",
      },
      {
        data: "ops_api_token",
        level: 3,
        text: "API Token History Management",
        url: "/api-token-history-management",
      },
      {
        data: "ops_alliance_auth",
        level: 3,
        text: "Alliance Auth Management",
        url: "/alliance-auth-management",
      },
      {
        data: "ops_alliance_auth_history",
        level: 3,
        text: "Aliiance Auth History Manage",
        url: "/alliance-auth-history-management",
      },
      {
        data: "ops_api_history",
        level: 3,
        text: "API History Manage",
        url: "/api-history-management",
      },
    ],
  },
  {
    data: "PT service_manager",
    level: 2,
    text: "Web service (CMS) manage",
    items: [
      {
        data: "template_manage",
        level: 3,
        text: "template manage",
        url: "/template-management",
      },
      {
        data: "page_manage",
        level: 3,
        text: "page manage",
        url: "/page-management",
      },
      {
        data: "web_asset_manage",
        level: 3,
        text: "product manage",
        url: "/product-management",
      },
      {
        data: "myWork_manage",
        level: 3,
        text: "my work repository",
        url: "/my-work-repository",
      },
      {
        data: "asset_page_manage",
        level: 3,
        text: "asset page mapping management",
        url: "/page-assets-mapping-management",
      },
      {
        data: "cms_approvement_manage",
        level: 3,
        text: "CMS APPROVEMENT MANAGE",
        url: "/cms-approvement-management",
      },
      {
        data: "cmsBuilderTool",
        level: 3,
        text: "CMS Builder",
        url: "/cms-builder",
      },
      {
        data: "asset_group_manage",
        level: 3,
        text: "ASSET group manage",
        url: "/asset-group-management",
      },
      {
        data: "하나은행_CMS_템플릿",
        level: 3,
        text: "hanaBank_cms_template",
        url: "/hana-bank-cms-template",
      },
      {
        data: "compoPageManage",
        level: 3,
        text: "compoPageManage",
        url: "/compo-page-management",
      },
      {
        data: "target_manage",
        level: 3,
        text: "product target settings",
        url: "/product-target-settings",
      },
      {
        data: "digitalAssetManage",
        level: 3,
        text: "digitalAssetManage",
        url: "/digital-asset-management",
      },
    ],
  },
  {
    data: "push_manage",
    level: 2,
    text: "PUSH Management",
    items: [
      {
        data: "push_conn_manage",
        level: 3,
        text: "PUSH Connection Manage",
        url: "/push-connection-management",
      },
      {
        data: "push_conn_his",
        level: 3,
        text: "push connect history",
        url: "/push-connection-history",
      },
      {
        data: "push_data",
        level: 3,
        text: "PUSH DATA",
        url: "/push-data-management",
      },
      {
        data: "push_req_his",
        level: 3,
        text: "push req history",
        url: "/push-request-history",
      },
    ],
  },
];

const TreeItem = (props: ItemRenderProps) => {
  return (
    <div className="flex h-full items-center gap-2">
      {props.item.items?.length > 0 ? (
        <img src="/images/folder.png" alt="" />
      ) : (
        <img className="w-5" src="/images/document.png" alt="" />
      )}
      <span className="capitalize">{props.item.text}</span>
    </div>
  );
};

export default function Page() {
  const dragClue = React.useRef<any>();
  const dragOverCnt = React.useRef<number>(0);
  const isDragDrop = React.useRef<boolean>(false);
  // const [tree, setTree] = React.useState(treeData);
  const [tree, setTree] = React.useState(MENUS);
  const [expand, setExpand] = React.useState({ ids: [], idField: "text" });
  const [selected, setSelected] = React.useState<any>([]);
  const [writeRoute, setWriteRoute] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<any>({
    data: "",
    level: 0,
    text: "",
    url: "",
  });

  const getClueClassName = (event: any) => {
    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
    const { itemHierarchicalIndex: itemIndex } = eventAnalyzer.destinationMeta;

    if (eventAnalyzer.isDropAllowed) {
      switch (eventAnalyzer.getDropOperation()) {
        case "child":
          return "k-i-plus";
        case "before":
          return itemIndex === "0" || itemIndex.endsWith(`${SEPARATOR}0`) ? "k-i-insert-up" : "k-i-insert-middle";
        case "after":
          const siblings = getSiblings(itemIndex, tree);
          const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

          return lastIndex < siblings.length - 1 ? "k-i-insert-middle" : "k-i-insert-down";
        default:
          break;
      }
    }

    return "k-i-cancel";
  };
  const onItemDragOver = (event: TreeViewItemDragOverEvent) => {
    dragOverCnt.current++;
    dragClue.current.show(event.pageY + 10, event.pageX, event.item.text, getClueClassName(event));
  };

  const onItemDragEnd = (event: TreeViewItemDragEndEvent) => {
    isDragDrop.current = dragOverCnt.current > 0;
    dragOverCnt.current = 0;
    dragClue.current.hide();

    const eventAnalyzer: any = new TreeViewDragAnalyzer(event).init();
    const destinationIndex = eventAnalyzer.destinationMeta.itemHierarchicalIndex;
    const destinationItem: any = getItemByIndex(destinationIndex, tree);

    // console.log("eventAnalyzer: ", eventAnalyzer);
    // console.log("itemHierarchicalIndex: ", event.itemHierarchicalIndex);
    // console.log("destinationItem: ", destinationItem);
    // if (destinationItem && destinationItem.items) {
    //   console.log("destinationItem: ", destinationItem.items, destinationItem.items.length);
    // }

    const sourceIndex = event.itemHierarchicalIndex;
    const parentIndex: any = sourceIndex.substring(0, sourceIndex.lastIndexOf(SEPARATOR));
    console.log("parentIndex: ", parentIndex, typeof parentIndex);

    // if (parentIndex) {
    //   console.log("parentIndex: ", parentIndex, typeof parentIndex);
    //   console.log("tree[parentIndex].items.length: ", tree[parentIndex].items.length);
    //   console.log("tree[parentIndex].items.length > 1: ", tree[parentIndex].items.length > 1);
    // }

    if (eventAnalyzer.isDropAllowed && destinationItem && destinationItem?.items && destinationItem?.items.length > 0) {
      const updatedTree: any = moveTreeViewItem(
        event.itemHierarchicalIndex,
        tree,
        eventAnalyzer.getDropOperation() || "child",
        eventAnalyzer.destinationMeta.itemHierarchicalIndex,
      );
      //${eventAnalyzer.event.item.text}
      // const value = writeRoute + `\n${eventAnalyzer.event.item.text} to ${destinationItem.text}`;
      // setWriteRoute(value);
      if (updatedTree.length !== tree.length) {
        setWriteRoute((prevText) => prevText + "\n" + "오류가 발생했습니다 다시 시도해주세요");
        return;
      }
      if (parentIndex && tree[parentIndex].items.length === 1) {
        setWriteRoute((prevText) => prevText + "\n" + "폴더를 비울 수 없습니다");
        return;
      }
      setWriteRoute((prevText) => prevText + "\n" + `${eventAnalyzer.event.item.text} to ${destinationItem.text}`);
      setTree(updatedTree);
      setSelectedValue({
        data: "",
        level: 0,
        text: "",
        url: "",
      });
    }
  };

  function getItemByIndex(index: any, items: any) {
    const indices = index.split(SEPARATOR).map((i: any) => parseInt(i, 10));
    let currentItem: any = null;

    indices.forEach((i: any) => {
      currentItem = (currentItem ? currentItem.items : items)[i];
    });

    return currentItem || null;
  }

  const onItemClick = ({ item: _item, itemHierarchicalIndex }: TreeViewItemClickEvent) => {
    console.log("itemHierarchicalIndex: ", itemHierarchicalIndex, _item);
    if (!isDragDrop.current) {
      // let ids: any = selected.ids.slice();
      // const index = ids.indexOf(event.item.text);
      //
      // index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
      setSelectedValue(_item);
      setSelected([itemHierarchicalIndex]);
    }
  };
  const onExpandChange = (event: TreeViewCheckChangeEvent) => {
    let ids: any = expand.ids.slice();
    const index = ids.indexOf(event.item.text);

    index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
    setExpand({ ids, idField: "text" });
  };

  useEffect(() => {
    console.log("selected: ", selected);
  }, [selected]);
  useEffect(() => {
    console.log("expand: ", expand);
  }, [expand]);
  useEffect(() => {
    console.log("tree: ", tree);
  }, [tree]);

  const updateItemText = () => {
    if ((selectedValue && selected.length > 0, selectedValue.text.length > 1)) {
      const updatedTree = updateTreeItemText(tree, selected[0], selectedValue.text);
      setTree(updatedTree);
    }
  };

  function updateTreeItemText(items: any, index: any, newText: any) {
    const indices = index.split("_").map((x: any) => parseInt(x, 10));
    let currentLevel = items;

    indices.forEach((idx: any, i: any) => {
      if (i === indices.length - 1) {
        currentLevel[idx].text = newText;
      } else {
        currentLevel = currentLevel[idx].items || [];
      }
    });

    return [...items];
  }

  return (
    <>
      <div className="flex h-full w-full flex-row">
        <TreeViewDragClue ref={dragClue} />
        <div className="h-full bg-red-100">
          <TreeView
            draggable={true}
            onItemDragOver={onItemDragOver}
            onItemDragEnd={onItemDragEnd}
            data={processTreeViewItems(tree, { expand: expand, select: selected })}
            expandIcons={true}
            onExpandChange={onExpandChange}
            onItemClick={onItemClick}
            item={TreeItem}
          />
          {/*<TreeViewDragClue ref={dragClue} />*/}
        </div>
        <div className="flex h-full w-full flex-col">
          <div className="h-[300px] w-full overflow-y-scroll whitespace-pre-line bg-blue-100">{writeRoute}</div>
          <div className="h-[300px] w-full whitespace-pre-line bg-green-100">
            <Input
              value={selectedValue?.text}
              onChange={(e) => setSelectedValue({ ...selectedValue, text: e.target.value })}
              className="mb-4 w-[300px] pb-4 pt-4"
            />
            <Button onClick={updateItemText}>change Text</Button>
          </div>
        </div>
      </div>

      {/*<div className="flex justify-end">*/}
      {/*  <Button className="basic-btn mt-2 flex h-7 items-center justify-start" onClick={undefined}>*/}
      {/*    + ADD*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
}
