import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTodoDetail } from "../../api/apiTodo";

const TodoDetailPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getTodoDetail(id);
        setTodo(res.data || res);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết công việc:", error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!todo)
    return (
      <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        📝 Chi tiết công việc
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Tên công việc:</strong> {todo.name}
        </p>
        <p>
          <strong>Mô tả:</strong> {todo.description || "—"}
        </p>
        <p>
          <strong>Ưu tiên:</strong>{" "}
          {todo.priority === 3
            ? "Cao"
            : todo.priority === 2
            ? "Trung bình"
            : "Thấp"}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {todo.completed ? "Hoàn thành" : "Đang thực hiện"}
        </p>
        <p>
          <strong>Ngày hết hạn:</strong>{" "}
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString()
            : "Không có"}
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {todo.createdAt
            ? new Date(todo.createdAt).toLocaleDateString()
            : "Không có"}
        </p>
      </div>

      <button
        onClick={() => navigate(location.state?.from || "/todo-list")}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ← Quay lại
      </button>
    </div>
  );
};

export default TodoDetailPage;
