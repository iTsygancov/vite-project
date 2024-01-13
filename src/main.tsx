import Header from "./components/Header/Header.tsx";
import "./index.css";
import { ActiveItemContextProvider } from "./lib/context/ActiveItemContext.tsx";
import AddItemPage from "./routes/add-item-page.tsx";
import EditPage, { loader as editLoader } from "./routes/edit-page.tsx";
import { ErrorPage } from "./routes/error-page.tsx";
import RootPage, { loader as rootLoader } from "./routes/root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Header />,
    loader: rootLoader(queryClient),
    children: [
      { index: true, element: <RootPage /> },
      {
        path: "item/:id",
        element: <EditPage />,
        loader: editLoader(queryClient)
      },
      {
        path: "item/add",
        element: <AddItemPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveItemContextProvider>
        <RouterProvider router={router} />
      </ActiveItemContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
