import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, updateTodo, getTodoDetail } from "../../api/apiTodo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToDoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      priority: "1",
      description: "",
      dueDate: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        try {
          const data = await getTodoDetail(id);
          reset({
            name: data.name || "",
            priority: data.priority ? String(data.priority) : "1",
            description: data.description || "",
            dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
            completed: !!data.completed,
          });
        } catch {
          toast.error(" Lỗi khi tải dữ liệu công việc!");
        }
      };
      fetchTodo();
    }
  }, [id, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        priority: Number(formData.priority),

        completed: !!formData.completed,
      };

      if (id) {
        await updateTodo(id, payload);
        toast.success(" Cập nhật công việc thành công!");
      } else {
        await createTodo({ ...payload, completed: false });
        toast.success(" Thêm công việc thành công!");
      }

      setTimeout(() => navigate("/todo-list"), 1500);
    } catch {
      toast.error(" Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-xl">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {id ? "✏️ Chỉnh sửa công việc" : "➕ Thêm công việc mới"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tên công việc:
          </label>
          <input
            type="text"
            {...register("name", { required: "Không được để trống" })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Mức độ ưu tiên:
          </label>
          <select
            {...register("priority")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Thấp</option>
            <option value="2">Trung bình</option>
            <option value="3">Cao</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Mô tả:</label>
          <textarea
            {...register("description")}
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Hạn chót:
          </label>
          <input
            type="date"
            {...register("dueDate", {
              required: "Vui lòng chọn ngày hết hạn",
            })}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {id && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              checked={watch("completed")}
              onChange={(e) => setValue("completed", e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <label htmlFor="completed" className="text-gray-700">
              Hoàn thành
            </label>
          </div>
        )}

        <div className="text-center space-x-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {id ? "Cập nhật" : "Tạo mới"}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Đặt lại
          </button>
          <button
            type="button"
            onClick={() => navigate("/todo-list")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToDoForm;
