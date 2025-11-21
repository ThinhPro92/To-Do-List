import LayoutMain from "../layouts/LayoutMain";
import DashboardPage from "../pages/client/DashboardPage";
import DetailTodo from "../pages/client/DetailTodo";
import TodoFormPage from "../pages/client/TodoFormPage";
import NotFoundPage from "../pages/NotFoundPage";

const clientRoutes = [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { index: true, Component: DashboardPage },
      { path: "home", Component: DashboardPage },
      { path: "todo-list", Component: DashboardPage },
      {
        path: "important",
        Component: () => (
          <div className="text-3xl text-center mt-20">Sắp ra mắt...</div>
        ),
      },
      {
        path: "category",
        Component: () => (
          <div className="text-3xl text-center mt-20">Sắp ra mắt...</div>
        ),
      },
      {
        path: "settings",
        Component: () => (
          <div className="text-3xl text-center mt-20">Sắp ra mắt...</div>
        ),
      },
      { path: "edit/:id", Component: TodoFormPage },
      { path: "*", Component: NotFoundPage },
      { path: "create", Component: TodoFormPage },
      { path: "edit/:id", Component: TodoFormPage },
      { path: "detail/:id", Component: DetailTodo },
    ],
  },
];

export default clientRoutes;
