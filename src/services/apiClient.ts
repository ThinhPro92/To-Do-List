import api from ".";
import type { Todo } from "../types/Todo";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface TodoQueryParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  q?: string;
  priority?: "low" | "medium" | "high";
  isCompleted?: boolean;
}

export const todoApi = {
  getTodos: async (
    params: TodoQueryParams = {}
  ): Promise<ApiResponse<Todo[]>> => {
    const response = await api.get<ApiResponse<Todo[]>>("/todos", { params });
    return response.data;
  },

  getTodoById: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.get<ApiResponse<Todo>>(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (
    body: Pick<Todo, "title" | "description" | "priority">
  ): Promise<ApiResponse<Todo>> => {
    const response = await api.post<ApiResponse<Todo>>("/todos", body);
    return response.data;
  },

  updateTodo: async (
    id: string,
    body: Partial<
      Pick<Todo, "title" | "description" | "priority" | "isCompleted">
    >
  ): Promise<ApiResponse<Todo>> => {
    const response = await api.patch<ApiResponse<Todo>>(`/todos/${id}`, body);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/todos/${id}`);
    return response.data;
  },
};
