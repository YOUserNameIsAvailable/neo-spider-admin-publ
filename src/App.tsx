import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { Routes } from "./routes";
import { Layout } from "./components/shared/layout/Layout";
import { TabProvider } from "./providers/TabProvider";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: Routes as unknown as RouteObject[],
  },
]);

export function App() {
  return (
    <>
      <TabProvider>
        <RouterProvider router={router} />
      </TabProvider>
    </>
  );
}
