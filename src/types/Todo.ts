export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type PriorityType = "low" | "medium" | "high";

export type TodoStatus = "all" | "completed" | "pending" | "in-progress";
