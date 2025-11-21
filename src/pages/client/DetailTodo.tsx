// src/pages/client/DetailTodo.tsx
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const DetailTodo = () => {
  const { id } = useParams<{ id: string }>();
  const todo = useSelector((state: RootState) =>
    state.todo.todos.find((t) => t._id === id)
  );

  if (!todo) {
    return (
      <div className="text-center py-20 text-2xl">Không tìm thấy nhiệm vụ</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10">
      <h2 className="text-4xl font-bold mb-8">{todo.title}</h2>
      <div className="space-y-6 text-lg">
        <p>
          <strong>Mô tả:</strong> {todo.description || "Không có mô tả"}
        </p>
        <p>
          <strong>Độ ưu tiên:</strong>{" "}
          {todo.priority === "high"
            ? "Cao"
            : todo.priority === "medium"
            ? "Trung bình"
            : "Thấp"}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {todo.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {todo.createdAt
            ? new Date(todo.createdAt).toLocaleString("vi-VN")
            : "-"}
        </p>
        <p>
          <strong>Cập nhật lần cuối:</strong>{" "}
          {todo.updatedAt
            ? new Date(todo.updatedAt).toLocaleString("vi-VN")
            : "-"}
        </p>
      </div>
      <div className="mt-10">
        <Link
          to="/todo-list"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Quay lại
        </Link>
      </div>
    </div>
  );
};

export default DetailTodo;
