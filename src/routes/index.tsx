import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([...clientRoutes, ...authRoutes]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
