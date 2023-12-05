export const Routes = {
  home: "/",

  // batch
  batch_app_management: "/batch-app-management",
  batch_history_list: "/batch-history-list",
  executing_batch: "/executing-batch",

  // code
  code_group_management: "/code-group-management",
  code_management: "/code-management",
  code_mapping_management: "/code-mapping-management",

  // error
  error_cause_history: "/error-cause-history",
  error_code_management: "/error-code-management",
  error_handler_execution_history: "/error-handler-execution-history",
  error_handler_management: "/error-handler-management",
  error_history_statistics: "/error-history-statistics",

  // interface
  application_mapping_management: "/application-mapping-management",
  gateway_management: "/gateway-management",
  listener_connector_mapping_management: "/listener-connector-mapping-management",
  message_handler_management: "/message-handler-management",
  org_gateway_mapping_management: "/org-gateway-mapping-management",
  organization_management: "/organization-management",
  was_gateway_information: "/was-gateway-information",
  was_status_monitor: "/was-status-monitor",

  // monitor
  bank_status_management: "/bank-status-management",
  create_status_plate: "/create-status-plate",
  in_progress_process: "/in-progress-process",
  log_level_adjustment: "/log-level-adjustment",
  manager_log: "/manager-log",
  memory_statistics: "/memory-statistics",
  monitoring_statistics: "/monitoring-statistics",
  performance_monitoring: "/performance-monitoring",
  performance_test: "/performance-test",
  real_time_monitor_state_management: "/real-time-monitor-state-management",
  status_board_inquiry: "/status-board-inquiry",
  stop_transaction_accessors: "/stop-transaction-accessors",
  trans_reservation_hold_setup: "/trans-reservation-hold-setup",
  transaction_history: "/transaction-history",
  web_log_search: "/web-log-search",

  // multi-language
  label_management: "/label-management",
  locale_label_management: "/locale-label-management",
  multi_language_management: "/multi-language-management",

  // open-api
  alliance_auth_history_management: "/alliance-auth-history-management",
  alliance_auth_management: "/alliance-auth-management",
  api_group_management: "/api-group-management",
  api_history_management: "/api-history-management",
  api_management: "/api-management",
  api_token_history_management: "/api-token-history-management",

  // push
  push_connection_history: "/push-connection-history",
  push_connection_management: "/push-connection-management",
  push_data_management: "/push-data-management",
  push_request_history: "/push-request-history",

  // operation-info
  biz_group_management: "/biz-group-management",
  operation_info_management: "/operation-info-management",
  property_db_management: "/property-db-management",
  work_space_management: "/work-space-management",
  xml_property_management: "/xml-property-management",

  // service
  biz_component: "/biz-component",
  biz_service_management: "/biz-service-management",
  component_management: "/component-management",
  data_source_management: "/data-source-management",
  service_management: "/service-management",
  sql_query_management: "/sql-query-management",
  validator_component: "/validator-component",

  // test
  service_test: "/service-test",
  web_performance_test: "/web-performance-test",

  // transaction-message
  apply_transfer_data: "/apply-transfer-data",
  common_field_mapping: "/common-field-mapping",
  create_transfer_data: "/create-transfer-data",
  domain_management: "/domain-management",
  inward_biz_test_scenario: "/inward-biz-test-scenario",
  inward_multi_data: "/inward-multi-data",
  inward_simple_data: "/inward-simple-data",
  message_logs_json_parser: "/message-logs-json-parser",
  message_management: "/message-management",
  message_test: "/message-test",
  message_test_case: "/message-test-case",
  outward_proxy_msg_management: "/outward-proxy-msg-management",
  parsing_message_log: "/parsing-message-log",
  search_logs_scenario: "/search-logs-scenario",
  search_message_log: "/search-message-log",
  search_transfer_data: "/search-transfer-data",
  transaction_management: "/transaction-management",
  transaction_performance_statistics: "/transaction-performance-statistics",
  transaction_stop: "/transaction-stop",
  transaction_web_app_group_manage: "/transaction-web-app-group-manage",

  // user-management
  initial_screen_menu_management: "/initial-screen-menu-management",
  database_management: "/database-management",
  edit_personal_information: "/edit-personal-information",
  file_management: "/file-management",
  menu_management: "/menu-management", // <--------------------------
  request_value: "/request-value",
  role_management: "/role-management", // <--------------------------
  user_management: "/user-management", // <--------------------------
  // was-management
  was_group_management: "/was-group-management",
  was_instance_management: "/was-instance-management",
  my_workspace_management: "/my-workspace-management",
  approval_management: "/approval_management",

  // web-app
  client_web_app_management: "/client-web-app-management", // <--------------------------
  emergency_notice: "/emergency-notice",
  page_guide_management: "/page-guide-management",
  page_notice_management: "/page-notice-management",
  site_menu_management: "/site-menu-management",
  web_component: "/web-component",
  web_message_management: "/web-message-management",
  web_standard: "/web-standard",

  // web service
  asset_group_management: "/asset-group-management",
  cms_approvement_management: "/cms-approvement-management",
  cms_builder: "/cms-builder",
  compo_page_management: "/compo-page-management",
  digital_asset_management: "/digital-asset-management",
  hana_bank_cms_template: "/hana-bank-cms-template",
  my_work_repository: "/my-work-repository",
  page_assets_mapping_management: "/page-assets-mapping-management",
  page_management: "/page-management",
  product_management: "/product-management",
  product_target_settings: "/product-target-settings",
  template_management: "/template-management",

  // quality-management
  category_management: "/category-management",
  defect_information_management: "/defect-information-management",
  impact_assessment: "/impact-assessment",
  performance_history_inquiry: "/performance-history-inquiry",
  progress_management_by_case: "/progress-management-by-case",
  project_management: "/project-management",
  project_progress_management: "/project-progress-management",
  test_case: "/test-case",
  test_case_scenario: "/test-case-scenario",

  // fds-meta
  metadata_management: "/metadata-management",
  policy_group_management: "/policy-group-management",
  policy_management: "/policy-management",
  rule_element_management: "/rule-element-management",
  simulation_management: "/simulation-management",

  // fds-monit
  account_profile_information: "/account-profile-information",
  audited_account_transaction_log: "/audited-account-transaction-log",
  blocked_accounts: "/blocked-accounts",
  blocked_devices: "/blocked-devices",
  certificate_transaction_log: "/certificate-transaction-log",
  customer_profile_information: "/customer-profile-information",
  delayed_account_transaction_log: "/delayed-account-transaction-log",
  detection_history: "/detection-history",
  splunk_monitor: "/splunk-monitor",
} as const;

export type RouteKey = keyof typeof Routes;
export type RouteValue = (typeof Routes)[RouteKey];
