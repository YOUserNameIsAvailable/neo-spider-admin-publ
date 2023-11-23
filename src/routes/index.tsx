// batch
import { Page as BatchAppManagementPage } from "./../pages/framework/batch-management/batch-app-management";
import { Page as BatchHistoryListPage } from "./../pages/framework/batch-management/batch-history-list";
import { Page as ExecutingBatchPage } from "./../pages/framework/batch-management/executing-batch";
// code
import { Page as CodeGroupManagementPage } from "./../pages/framework/code-management/code-group-management";
import { Page as CodeManagementPage } from "./../pages/framework/code-management/code-management";
import { Page as CodeMappingManagementPage } from "./../pages/framework/code-management/code-mapping-management";
// error
import { Page as ErrorCauseHistoryPage } from "./../pages/framework/error-management/error-cause-history";
import { Page as ErrorCodeManagementPage } from "./../pages/framework/error-management/error-code-management";
import { Page as ErrorHandlerExecutionHistoryPage } from "./../pages/framework/error-management/error-handler-execution-history";
import { Page as ErrorHandlerManagementPage } from "./../pages/framework/error-management/error-handler-management";
import { Page as ErrorHistoryStatisticsPage } from "./../pages/framework/error-management/error-history-statistics";
// interface
import { Page as ApplicationMappingManagementPage } from "./../pages/framework/interface-management/application-mapping-management";
import { Page as GatewayManagementPage } from "./../pages/framework/interface-management/gateway-management";
import { Page as ListenerConnectorMappingManagementPage } from "./../pages/framework/interface-management/listener-connector-mapping-management";
import { Page as MessageHandlerManagementPage } from "./../pages/framework/interface-management/message-handler-management";
import { Page as OrgGatewayMappingManagementPage } from "./../pages/framework/interface-management/org-gateway-mapping-management";
import { Page as OrganizationManagementPage } from "./../pages/framework/interface-management/organization-management";
import { Page as WasGatewayInformationPage } from "./../pages/framework/interface-management/was-gateway-information";
import { Page as WasStatusMonitorPage } from "./../pages/framework/interface-management/was-status-monitor";
// monitor
import { Page as BankStatusManagementPage } from "./../pages/framework/monitor-management/bank-status-management";
import { Page as CreateStatusPlatePage } from "./../pages/framework/monitor-management/create-status-plate";
import { Page as InProgressProcessPage } from "./../pages/framework/monitor-management/in-progress-process";
import { Page as LogLevelAdjustmentPage } from "./../pages/framework/monitor-management/log-level-adjustment";
import { Page as ManagerLogPage } from "./../pages/framework/monitor-management/manager-log";
import { Page as MemoryStatisticsPage } from "./../pages/framework/monitor-management/memory-statistics";
import { Page as MonitoringStatisticsPage } from "./../pages/framework/monitor-management/monitoring-statistics";
import { Page as PerformanceMonitoringPage } from "./../pages/framework/monitor-management/performance-monitoring";
import { Page as PerformanceTestPage } from "./../pages/framework/monitor-management/performance-test";
import { Page as RealTimeMonitorStateManagementPage } from "./../pages/framework/monitor-management/real-time-monitor-state-management";
import { Page as StatusBoardInquiryPage } from "./../pages/framework/monitor-management/status-board-inquiry";
import { Page as StopTransactionAccessorsPage } from "./../pages/framework/monitor-management/stop-transaction-accessors";
import { Page as TransReservationHoldSetupPage } from "./../pages/framework/monitor-management/trans-reservation-hold-setup";
import { Page as TransactionHistoryPage } from "./../pages/framework/monitor-management/transaction-history";
import { Page as WebLogSearchPage } from "./../pages/framework/monitor-management/web-log-search";
// multi-language
import { Page as LabelManagementPage } from "./../pages/framework/multi-language-management/label-management";
import { Page as LocaleLabelManagementPage } from "./../pages/framework/multi-language-management/locale-label-management";
import { Page as MultiLanguageManagementPage } from "./../pages/framework/multi-language-management/multi-language-management";
// open-api
import { Page as AllianceAuthHistoryManagementPage } from "./../pages/framework/open-api-management/alliance-auth-history-management";
import { Page as AllianceAuthManagementPage } from "./../pages/framework/open-api-management/alliance-auth-management";
import { Page as ApiGroupManagementPage } from "./../pages/framework/open-api-management/api-group-management";
import { Page as ApiHistoryManagementPage } from "./../pages/framework/open-api-management/api-history-management";
import { Page as ApiManagementPage } from "./../pages/framework/open-api-management/api-management";
import { Page as ApiTokenHistoryManagementPage } from "./../pages/framework/open-api-management/api-token-history-management";
// push
import { Page as PushConnectionHistoryPage } from "./../pages/framework/push-management/push-connection-history";
import { Page as PushConnectionManagementPage } from "./../pages/framework/push-management/push-connection-management";
import { Page as PushDataManagementPage } from "./../pages/framework/push-management/push-data-management";
import { Page as PushRequestHistoryPage } from "./../pages/framework/push-management/push-request-history";
// operation-info
import { Page as BizGroupManagementPage } from "./../pages/framework/operation-info-management/biz-group-management";
import { Page as OperationInfoManagementPage } from "./../pages/framework/operation-info-management/operation-info-management";
import { Page as PropertyDbManagementPage } from "./../pages/framework/operation-info-management/property-db-management";
import { Page as WorkSpaceManagementPage } from "./../pages/framework/operation-info-management/work-space-management";
import { Page as XmlPropertyManagementPage } from "./../pages/framework/operation-info-management/xml-property-management";
// service
import { Page as BizComponentPage } from "./../pages/framework/service-management/biz-component";
import { Page as BizServiceManagementPage } from "./../pages/framework/service-management/biz-service-management";
import { Page as ComponentManagementPage } from "./../pages/framework/service-management/component-management";
import { Page as DataSourceManagementPage } from "./../pages/framework/service-management/data-source-management";
import { Page as ServiceManagementPage } from "./../pages/framework/service-management/service-management";
import { Page as SqlQueryManagementPage } from "./../pages/framework/service-management/sql-query-management";
import { Page as ValidatorComponentPage } from "./../pages/framework/service-management/validator-component";
// test
import { Page as ServiceTestPage } from "./../pages/framework/test-management/service-test";
import { Page as WebPerformanceTestPage } from "./../pages/framework/test-management/web-performance-test";
// transaction-message
import { Page as ApplyTransferDataPage } from "./../pages/framework/transaction-message-management/apply-transfer-data";
import { Page as CommonFieldMappingPage } from "./../pages/framework/transaction-message-management/common-field-mapping";
import { Page as CreateTransferDataPage } from "./../pages/framework/transaction-message-management/create-transfer-data";
import { Page as DomainManagementPage } from "./../pages/framework/transaction-message-management/domain-management";
import { Page as InwardBizTestScenarioPage } from "./../pages/framework/transaction-message-management/inward-biz-test-scenario";
import { Page as InwardMultiDataPage } from "./../pages/framework/transaction-message-management/inward-multi-data";
import { Page as InwardSimpleDataPage } from "./../pages/framework/transaction-message-management/inward-simple-data";
import { Page as MessageLogsJsonParserPage } from "./../pages/framework/transaction-message-management/message-logs-json-parser";
import { Page as MessageManagementPage } from "./../pages/framework/transaction-message-management/message-management";
import { Page as MessageTestPage } from "./../pages/framework/transaction-message-management/message-test";
import { Page as MessageTestCasePage } from "./../pages/framework/transaction-message-management/message-test-case";
import { Page as OutwardProxyMsgManagementPage } from "./../pages/framework/transaction-message-management/outward-proxy-msg-management";
import { Page as ParsingMessageLogPage } from "./../pages/framework/transaction-message-management/parsing-message-log";
import { Page as SearchLogsScenarioPage } from "./../pages/framework/transaction-message-management/search-logs-scenario";
import { Page as SearchMessageLogPage } from "./../pages/framework/transaction-message-management/search-message-log";
import { Page as SearchTransferDataPage } from "./../pages/framework/transaction-message-management/search-transfer-data";
import { Page as TransactionManagementPage } from "./../pages/framework/transaction-message-management/transaction-management";
import { Page as TransactionPerformanceStatisticsPage } from "./../pages/framework/transaction-message-management/transaction-performance-statistics";
import { Page as TransactionStopPage } from "./../pages/framework/transaction-message-management/transaction-stop";
import { Page as TransactionWebAppGroupManagePage } from "./../pages/framework/transaction-message-management/transaction-web-app-group-manage";
// user-management
import { Page as InitialScreenMenuManagementPage } from "./../pages/framework/user-management/initial-screen-menu-management";
import { Page as DatabaseManagementPage } from "./../pages/framework/user-management/database-management";
import { Page as EditPersonalInformationPage } from "./../pages/framework/user-management/edit-personal-information";
import { Page as FileManagementPage } from "./../pages/framework/user-management/file-management";
import { Page as MenuManagementPage } from "./../pages/framework/user-management/menu-management";
import { Page as RequestValuePage } from "./../pages/framework/user-management/request-value";
import { Page as RoleManagementPage } from "./../pages/framework/user-management/role-management";
import { Page as UserManagementPage } from "./../pages/framework/user-management/user-management";
// was-management
import { Page as WasGroupManagementPage } from "./../pages/framework/was-management/was-group-management";
import { Page as WasInstanceManagementPage } from "./../pages/framework/was-management/was-instance-management";
// web-app
import { Page as ClientWebAppManagementPage } from "./../pages/framework/web-app-management/client-web-app-management";
import { Page as EmergencyNoticePage } from "./../pages/framework/web-app-management/emergency-notice";
import { Page as PageGuideManagementPage } from "./../pages/framework/web-app-management/page-guide-management";
import { Page as PageNoticeManagementPage } from "./../pages/framework/web-app-management/page-notice-management";
import { Page as PiteMenuManagementPage } from "./../pages/framework/web-app-management/site-menu-management";
import { Page as WebComponentPage } from "./../pages/framework/web-app-management/web-component";
import { Page as WebMessageManagementPage } from "./../pages/framework/web-app-management/web-message-management";
import { Page as WebStandardPage } from "./../pages/framework/web-app-management/web-standard";
// web-service
import { Page as AssetGroupManagementPage } from "./../pages/framework/web-service-management/asset-group-management";
import { Page as CmsApprovementManagementPage } from "./../pages/framework/web-service-management/cms-approvement-management";
import { Page as CmsBuilderPage } from "./../pages/framework/web-service-management/cms-builder";
import { Page as CompoPageManagementPage } from "./../pages/framework/web-service-management/compo-page-management";
import { Page as DigitalAssetManagementPage } from "./../pages/framework/web-service-management/digital-asset-management";
import { Page as HanaBankCmsTemplatePage } from "./../pages/framework/web-service-management/hana-bank-cms-template";
import { Page as MyWorkRepositoryPage } from "./../pages/framework/web-service-management/my-work-repository";
import { Page as PageAssetsMappingManagementPage } from "./../pages/framework/web-service-management/page-assets-mapping-management";
import { Page as PageManagementPage } from "./../pages/framework/web-service-management/page-management";
import { Page as ProductManagementPage } from "./../pages/framework/web-service-management/product-management";
import { Page as ProductTargetSettingsPage } from "./../pages/framework/web-service-management/product-target-settings";
import { Page as TemplateManagementPage } from "./../pages/framework/web-service-management/template-management";
// quality-management
import { Page as CategoryManagementPage } from "./../pages/quality-management/category-management";
import { Page as DefectInformationManagementPage } from "./../pages/quality-management/defect-information-management";
import { Page as ImpactAssessmentPage } from "./../pages/quality-management/impact-assessment";
import { Page as PerformanceHistoryInquiryPage } from "./../pages/quality-management/performance-history-inquiry";
import { Page as ProgressManagementByCasePage } from "./../pages/quality-management/progress-management-by-case";
import { Page as ProjectManagementPage } from "./../pages/quality-management/project-management";
import { Page as ProjectProgressManagementPage } from "./../pages/quality-management/project-progress-management";
import { Page as TestCasePage } from "./../pages/quality-management/test-case";
import { Page as TestCaseScenarioPage } from "./../pages/quality-management/test-case-scenario";
// fds-meta
import { Page as MetadataManagementPage } from "./../pages/fds-meta-management/metadata-management";
import { Page as PolicyGroupManagementPage } from "./../pages/fds-meta-management/policy-group-management";
import { Page as PolicyManagementPage } from "./../pages/fds-meta-management/policy-management";
import { Page as RuleElementManagementPage } from "./../pages/fds-meta-management/rule-element-management";
import { Page as SimulationManagementPage } from "./../pages/fds-meta-management/simulation-management";
// fds-monit
import { Page as AccountProfileInformationPage } from "./../pages/fds-monitoring/account-profile-information";
import { Page as AuditedAccountTransactionLogPage } from "./../pages/fds-monitoring/audited-account-transaction-log";
import { Page as BlockedAccountsPage } from "./../pages/fds-monitoring/blocked-accounts";
import { Page as BlockedDevicesPage } from "./../pages/fds-monitoring/blocked-devices";
import { Page as CertificateTransactionLogPage } from "./../pages/fds-monitoring/certificate-transaction-log";
import { Page as CustomerProfileInformationPage } from "./../pages/fds-monitoring/customer-profile-information";
import { Page as DelayedAccountTransactionLogPage } from "./../pages/fds-monitoring/delayed-account-transaction-log";
import { Page as DetectionHistoryPage } from "./../pages/fds-monitoring/detection-history";
import { Page as SplunkMonitorPage } from "./../pages/fds-monitoring/splunk-monitor";

export const Routes = [
  // batch
  { path: "/", element: <ServiceManagementPage /> },
  { path: "/batch-app-management", element: <BatchAppManagementPage /> },
  { path: "/batch-history-list", element: <BatchHistoryListPage /> },
  { path: "/executing-batch", element: <ExecutingBatchPage /> },
  // code
  { path: "/code-group-management", element: <CodeGroupManagementPage /> },
  { path: "/code-management", element: <CodeManagementPage /> },
  { path: "/code-mapping-management", element: <CodeMappingManagementPage /> },
  // error
  { path: "/error-cause-history", element: <ErrorCauseHistoryPage /> },
  { path: "/error-code-management", element: <ErrorCodeManagementPage /> },
  { path: "/error-handler-execution-history", element: <ErrorHandlerExecutionHistoryPage /> },
  { path: "/error-handler-management", element: <ErrorHandlerManagementPage /> },
  { path: "/error-history-statistics", element: <ErrorHistoryStatisticsPage /> },
  // interface
  { path: "/application-mapping-management", element: <ApplicationMappingManagementPage /> },
  { path: "/gateway-management", element: <GatewayManagementPage /> },
  { path: "/listener-connector-mapping-management", element: <ListenerConnectorMappingManagementPage /> },
  { path: "/message-handler-management", element: <MessageHandlerManagementPage /> },
  { path: "/org-gateway-mapping-management", element: <OrgGatewayMappingManagementPage /> },
  { path: "/organization-management", element: <OrganizationManagementPage /> },
  { path: "/was-gateway-information", element: <WasGatewayInformationPage /> },
  { path: "/was-status-monitor", element: <WasStatusMonitorPage /> },
  // monitor
  { path: "/bank-status-management", element: <BankStatusManagementPage /> },
  { path: "/create-status-plate", element: <CreateStatusPlatePage /> },
  { path: "/in-progress-process", element: <InProgressProcessPage /> },
  { path: "/log-level-adjustment", element: <LogLevelAdjustmentPage /> },
  { path: "/manager-log", element: <ManagerLogPage /> },
  { path: "/memory-statistics", element: <MemoryStatisticsPage /> },
  { path: "/monitoring-statistics", element: <MonitoringStatisticsPage /> },
  { path: "/performance-monitoring", element: <PerformanceMonitoringPage /> },
  { path: "/performance-test", element: <PerformanceTestPage /> },
  { path: "/real-time-monitor-state-management", element: <RealTimeMonitorStateManagementPage /> },
  { path: "/status-board-inquiry", element: <StatusBoardInquiryPage /> },
  { path: "/stop-transaction-accessors", element: <StopTransactionAccessorsPage /> },
  { path: "/trans-reservation-hold-setup", element: <TransReservationHoldSetupPage /> },
  { path: "/transaction-history", element: <TransactionHistoryPage /> },
  { path: "/web-log-search", element: <WebLogSearchPage /> },
  // multi-language
  { path: "/label-management", element: <LabelManagementPage /> },
  { path: "/locale-label-management", element: <LocaleLabelManagementPage /> },
  { path: "/multi-language-management", element: <MultiLanguageManagementPage /> },
  // open-api
  { path: "/alliance-auth-history-management", element: <AllianceAuthHistoryManagementPage /> },
  { path: "/alliance-auth-management", element: <AllianceAuthManagementPage /> },
  { path: "/api-group-management", element: <ApiGroupManagementPage /> },
  { path: "/api-history-management", element: <ApiHistoryManagementPage /> },
  { path: "/api-management", element: <ApiManagementPage /> },
  { path: "/api-token-history-management", element: <ApiTokenHistoryManagementPage /> },
  // push
  { path: "/push-connection-history", element: <PushConnectionHistoryPage /> },
  { path: "/push-connection-management", element: <PushConnectionManagementPage /> },
  { path: "/push-data-management", element: <PushDataManagementPage /> },
  { path: "/push-request-history", element: <PushRequestHistoryPage /> },
  // operation-info
  { path: "/biz-group-management", element: <BizGroupManagementPage /> },
  { path: "/operation-info-management", element: <OperationInfoManagementPage /> },
  { path: "/property-db-management", element: <PropertyDbManagementPage /> },
  { path: "/work-space-management", element: <WorkSpaceManagementPage /> },
  { path: "/xml-property-management", element: <XmlPropertyManagementPage /> },
  // service
  { path: "/biz-component", element: <BizComponentPage /> },
  { path: "/biz-service-management", element: <BizServiceManagementPage /> },
  { path: "/component-management", element: <ComponentManagementPage /> },
  { path: "/data-source-management", element: <DataSourceManagementPage /> },
  { path: "/service-management", element: <ServiceManagementPage /> },
  { path: "/sql-query-management", element: <SqlQueryManagementPage /> },
  { path: "/validator-component", element: <ValidatorComponentPage /> },
  // test
  { path: "/service-test", element: <ServiceTestPage /> },
  { path: "/web-performance-test", element: <WebPerformanceTestPage /> },
  // transaction-message
  { path: "/apply-transfer-data", element: <ApplyTransferDataPage /> },
  { path: "/common-field-mapping", element: <CommonFieldMappingPage /> },
  { path: "/create-transfer-data", element: <CreateTransferDataPage /> },
  { path: "/domain-management", element: <DomainManagementPage /> },
  { path: "/inward-biz-test-scenario", element: <InwardBizTestScenarioPage /> },
  { path: "/inward-multi-data", element: <InwardMultiDataPage /> },
  { path: "/inward-simple-data", element: <InwardSimpleDataPage /> },
  { path: "/message-logs-json-parser", element: <MessageLogsJsonParserPage /> },
  { path: "/message-management", element: <MessageManagementPage /> },
  { path: "/message-test", element: <MessageTestPage /> },
  { path: "/message-test-case", element: <MessageTestCasePage /> },
  { path: "/outward-proxy-msg-management", element: <OutwardProxyMsgManagementPage /> },
  { path: "/parsing-message-log", element: <ParsingMessageLogPage /> },
  { path: "/search-logs-scenario", element: <SearchLogsScenarioPage /> },
  { path: "/search-message-log", element: <SearchMessageLogPage /> },
  { path: "/search-transfer-data", element: <SearchTransferDataPage /> },
  { path: "/transaction-management", element: <TransactionManagementPage /> },
  { path: "/transaction-performance-statistics", element: <TransactionPerformanceStatisticsPage /> },
  { path: "/transaction-stop", element: <TransactionStopPage /> },
  { path: "/transaction-web-app-group-manage", element: <TransactionWebAppGroupManagePage /> },
  // user-management
  { path: "/initial-screen-menu-management", element: <InitialScreenMenuManagementPage /> },
  { path: "/database-management", element: <DatabaseManagementPage /> },
  { path: "/edit-personal-information", element: <EditPersonalInformationPage /> },
  { path: "/file-management", element: <FileManagementPage /> },
  { path: "/menu-management", element: <MenuManagementPage /> },
  { path: "/request-value", element: <RequestValuePage /> },
  { path: "/role-management", element: <RoleManagementPage /> },
  { path: "/user-management", element: <UserManagementPage /> },
  // was-management
  { path: "/was-group-management", element: <WasGroupManagementPage /> },
  { path: "/was-instance-management", element: <WasInstanceManagementPage /> },
  // web-app
  { path: "/client-web-app-management", element: <ClientWebAppManagementPage /> },
  { path: "/emergency-notice", element: <EmergencyNoticePage /> },
  { path: "/page-guide-management", element: <PageGuideManagementPage /> },
  { path: "/page-notice-management", element: <PageNoticeManagementPage /> },
  { path: "/site-menu-management", element: <PiteMenuManagementPage /> },
  { path: "/web-component", element: <WebComponentPage /> },
  { path: "/web-message-management", element: <WebMessageManagementPage /> },
  { path: "/web-standard", element: <WebStandardPage /> },
  // web service
  { path: "/asset-group-management", element: <AssetGroupManagementPage /> },
  { path: "/cms-approvement-management", element: <CmsApprovementManagementPage /> },
  { path: "/cms-builder", element: <CmsBuilderPage /> },
  { path: "/compo-page-management", element: <CompoPageManagementPage /> },
  { path: "/digital-asset-management", element: <DigitalAssetManagementPage /> },
  { path: "/hana-bank-cms-template", element: <HanaBankCmsTemplatePage /> },
  { path: "/my-work-repository", element: <MyWorkRepositoryPage /> },
  { path: "/page-assets-mapping-management", element: <PageAssetsMappingManagementPage /> },
  { path: "/page-management", element: <PageManagementPage /> },
  { path: "/product-management", element: <ProductManagementPage /> },
  { path: "/product-target-settings", element: <ProductTargetSettingsPage /> },
  { path: "/template-management", element: <TemplateManagementPage /> },
  // quality-management
  { path: "/category-management", element: <CategoryManagementPage /> },
  { path: "/defect-information-management", element: <DefectInformationManagementPage /> },
  { path: "/impact-assessment", element: <ImpactAssessmentPage /> },
  { path: "/performance-history-inquiry", element: <PerformanceHistoryInquiryPage /> },
  { path: "/progress-management-by-case", element: <ProgressManagementByCasePage /> },
  { path: "/project-management", element: <ProjectManagementPage /> },
  { path: "/project-progress-management", element: <ProjectProgressManagementPage /> },
  { path: "/test-case", element: <TestCasePage /> },
  { path: "/test-case-scenario", element: <TestCaseScenarioPage /> },
  // fds-meta
  { path: "/metadata-management", element: <MetadataManagementPage /> },
  { path: "/policy-group-management", element: <PolicyGroupManagementPage /> },
  { path: "/policy-management", element: <PolicyManagementPage /> },
  { path: "/rule-element-management", element: <RuleElementManagementPage /> },
  { path: "/simulation-management", element: <SimulationManagementPage /> },
  // fds-monit
  { path: "/account-profile-information", element: <AccountProfileInformationPage /> },
  { path: "/audited-account-transaction-log", element: <AuditedAccountTransactionLogPage /> },
  { path: "/blocked-accounts", element: <BlockedAccountsPage /> },
  { path: "/blocked-devices", element: <BlockedDevicesPage /> },
  { path: "/certificate-transaction-log", element: <CertificateTransactionLogPage /> },
  { path: "/customer-profile-information", element: <CustomerProfileInformationPage /> },
  { path: "/delayed-account-transaction-log", element: <DelayedAccountTransactionLogPage /> },
  { path: "/detection-history", element: <DetectionHistoryPage /> },
  { path: "/splunk-monitor", element: <SplunkMonitorPage /> },
] as const;

export type RoutePathType = (typeof Routes)[number]["path"];
