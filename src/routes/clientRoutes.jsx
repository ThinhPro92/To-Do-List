import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import LayoutClient from "../layouts/LayoutClient";
import Home from "../pages/client/Home";
import ImportantTodoList from "../pages/client/ImportantTodoList";
import TodoListPage from "../pages/client/TodoListPage";
import TodoDetailPage from "../pages/admin/TodoDetailPage";
import CategoryTodo from "../pages/client/CaterotyTodo";
import FAQ from "../pages/client/FAQ";
import TodoForm from "../pages/admin/ToDoForm";

const clientRoutes = [
  {
    path: "/",
    Component: LayoutClient,
    children: [
      { index: true, element: <Navigate to="/todo-list" /> },
      { path: "home", Component: Home },
      { path: "important", Component: ImportantTodoList },
      { path: "todo-list", Component: TodoListPage },
      { path: "todos/:id", Component: TodoDetailPage },
      { path: "/todos/create", Component: TodoForm },
      { path: "/todos/edit/:id", Component: TodoForm },
      { path: "categories", Component: CategoryTodo },
      { path: "faq", Component: FAQ },
    ],
  },
];

export default clientRoutes;
