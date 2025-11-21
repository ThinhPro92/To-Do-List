import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export const selectTodoState = (state: RootState) => state.todo;

export const selectTodos = createSelector(
  selectTodoState,
  (todoState) => todoState.todos
);

export const selectLoading = createSelector(
  selectTodoState,
  (todoState) => todoState.loading
);

export const selectError = createSelector(
  selectTodoState,
  (todoState) => todoState.error
);

export const selectCompletedTodos = createSelector(selectTodos, (todos) =>
  todos.filter((t) => t.isCompleted)
);

export const selectPendingTodos = createSelector(selectTodos, (todos) =>
  todos.filter((t) => !t.isCompleted)
);
