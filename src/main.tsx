import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import "./index.css";
import store from "./provider/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MonthlySalesPage } from "./pages/monthlySalesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sales-of-month",
    element: <MonthlySalesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
