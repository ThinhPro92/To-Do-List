import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { todoApi } from "../../services/apiClient";
import type { Todo } from "../../types/Todo";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface TodoQueryParams {
  keyword?: string;
  isCompleted?: boolean;
  priority?: "low" | "medium" | "high";
  page?: number;
  limit?: number;
}

export interface AddTodoPayload {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}

export interface UpdateTodoPayload {
  id: string;
  data: Partial<Omit<Todo, "_id" | "createdAt" | "updatedAt">>;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// ==== THUNKS ====
export const fetchTodos = createAsyncThunk<Todo[], TodoQueryParams | undefined>(
  "todo/fetchTodos",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await todoApi.getTodos(params);
      return res.data;
    } catch {
      return rejectWithValue("Không thể tải dữ liệu");
    }
  }
);

export const addTodo = createAsyncThunk<Todo, AddTodoPayload>(
  "todo/addTodo",
  async (body, { rejectWithValue }) => {
    try {
      const res = await todoApi.createTodo(body);
      return res.data;
    } catch {
      return rejectWithValue("Thêm thất bại");
    }
  }
);

export const updateTodo = createAsyncThunk<Todo, UpdateTodoPayload>(
  "todo/updateTodo",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await todoApi.updateTodo(id, data);
      return res.data;
    } catch {
      return rejectWithValue("Cập nhật thất bại");
    }
  }
);

export const toggleTodo = createAsyncThunk<Todo, Todo>(
  "todo/toggleTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const res = await todoApi.updateTodo(todo._id!, {
        isCompleted: !todo.isCompleted,
      });
      return res.data;
    } catch {
      return rejectWithValue("Cập nhật thất bại");
    }
  }
);

export const removeTodo = createAsyncThunk<string, string>(
  "todo/removeTodo",
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.deleteTodo(id);
      return id;
    } catch {
      return rejectWithValue("Xóa thất bại");
    }
  }
);

// ==== SLICE ====
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== Fulfilled =====
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.unshift(action.payload);
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) state.todos[index] = action.payload;
    });

    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) state.todos[index] = action.payload;
    });

    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((t) => t._id !== action.payload);
    });

    // ===== GLOBAL PENDING =====
    builder.addMatcher(
      isPending(fetchTodos, addTodo, updateTodo, toggleTodo, removeTodo),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    // ===== GLOBAL REJECTED =====
    builder.addMatcher(
      isRejected(fetchTodos, addTodo, updateTodo, toggleTodo, removeTodo),
      (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error?.message ||
          "Có lỗi xảy ra!";
      }
    );
  },
});

export default todoSlice.reducer;
