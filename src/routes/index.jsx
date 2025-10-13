import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  ...clientRoutes,
  { path: "*", Component: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
