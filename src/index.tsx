import React from "react";
import ReactDOM from "react-dom/client";

import "./themes/kendo-theme-custom.scss";
import "./index.scss";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/shared/layout/Layout";
import { TabProvider } from "./providers/TabProvider";
import ServiceManagementPage from "./pages/framework/service-management/service-management";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceManagementPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <TabProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </TabProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
