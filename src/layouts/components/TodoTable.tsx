// src/layouts/components/TodoTable.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchTodos,
  // toggleTodo,
  removeTodo,
} from "../../features/todo/todoSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import type { Todo } from "../../types/Todo";
import { Link } from "react-router-dom";

const priorityBadge = (priority: Todo["priority"]) => {
  const styles = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };
  const labels = { high: "Cao", medium: "Trung bình", low: "Thấp" };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  );
};

const TodoTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todo
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // const handleToggle = (id: string) => {
  //   dispatch(toggleTodo(id));
  // };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa nhiệm vụ này?")) {
      dispatch(removeTodo(id));
    }
    setOpenMenuId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="2x"
          className="text-red-500"
        />
        <span className="ml-3 text-lg">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => dispatch(fetchTodos())}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm nhiệm vụ..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full lg:w-96 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-gray-400"
          />
          <Link to={"/create"}>
            <button className="">create</button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ưu tiên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {todos.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  Không có công việc nào
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr
                  key={todo._id}
                  className={`hover:bg-gray-50 transition cursor-pointer ${
                    todo.isCompleted ? "opacity-60 line-through" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {todo.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {todo.description || "-"}
                  </td>
                  <td className="px-6 py-4">{priorityBadge(todo.priority)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        todo.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {todo.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {todo.createdAt
                      ? new Date(todo.createdAt).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 relative stop-propagation">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-gray-600 hover:text-red-500 transition"
                    >
                      .
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    {openMenuId === todo._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100">
                          Sửa
                        </button>
                        <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100">
                          Xem chi tiết
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(todo._id!);
                          }}
                          className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;
