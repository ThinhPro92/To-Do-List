// src/features/todo/todoSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { todoApi } from "../../services/apiClient";
import type { Todo } from "../../types/Todo";
// ===== TYPES =====
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
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

// ===== THUNKS =====
// Fetch list
export const fetchTodos = createAsyncThunk<Todo[], Record<string, any> | void>(
  "todo/fetchTodos",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await todoApi.getTodos(params);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Không thể tải dữ liệu");
    }
  }
);

// Add
export const addTodo = createAsyncThunk<Todo, AddTodoPayload>(
  "todo/addTodo",
  async (body, { rejectWithValue }) => {
    try {
      const res = await todoApi.createTodo(body);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Thêm thất bại");
    }
  }
);

// Update
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

// Toggle
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

// Delete
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

// ===== SLICE =====
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== Fulfilled =====
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      }
    );

    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
      state.loading = false;
      state.todos.unshift(action.payload);
    });

    builder.addCase(
      updateTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.todos[index] = action.payload;
      }
    );

    builder.addCase(
      toggleTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.todos[index] = action.payload;
      }
    );

    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((t) => t._id !== action.payload);
    });

    // ===== GLOBAL pending / rejected phải đặt SAU addCase =====
    builder.addMatcher(
      (action) =>
        action.type.startsWith("todo/") && action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.startsWith("todo/") && action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export default todoSlice.reducer;
