import LayoutAuth from "../layouts/LayoutAuth";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

const authRoutes = [
  {
    path: "auth",
    Component: LayoutAuth,
    children: [
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
    ],
  },
];

export default authRoutes;
