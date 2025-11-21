import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { addTodo, updateTodo, fetchTodos } from "../../features/todo/todoSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const todoSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
});

type TodoFormData = z.infer<typeof todoSchema>;

const TodoFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const todoToEdit = todos.find((t) => t._id === id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (isEdit && todoToEdit) {
      setValue("title", todoToEdit.title);
      setValue("description", todoToEdit.description || "");
      setValue("priority", todoToEdit.priority);
    }
  }, [isEdit, todoToEdit, setValue]);

  const onSubmit = async (data: TodoFormData) => {
    if (isEdit) {
      await dispatch(updateTodo({ id: id!, data }));
    } else {
      await dispatch(addTodo(data));
    }
    reset();
    navigate("/todo-list");
    dispatch(fetchTodos());
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8">
        {isEdit ? "Sửa nhiệm vụ" : "Thêm nhiệm vụ mới"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề *
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Độ ưu tiên
          </label>
          <select
            {...register("priority")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
            <option value="low">Thấp</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            {isEdit ? "Cập nhật" : "Thêm nhiệm vụ"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/todo-list")}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoFormPage;
