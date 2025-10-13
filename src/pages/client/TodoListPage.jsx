import { useState, useEffect } from "react";
import axios from "axios";

const TodoListPage = () => {
  const [todo, setTodo] = useState([]);
  const [meta, setMeta] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [query, setQuery] = useState({
    _page: 1,
    _limit: 6,
    _sort: "",
    _order: "",
    q: "",
    priority: undefined,
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const cleanQuery = Object.fromEntries(
          Object.entries(query).filter(
            ([, v]) => v !== undefined && v !== "" && v !== null
          )
        );
        const { data } = await axios.get(
          "https://api-class-o1lo.onrender.com/api/v1/todos",
          { params: cleanQuery }
        );
        setTodo(data.data);
        setMeta(data.meta);
      } catch (error) {
        console.log("Lỗi khi tải danh sách công việc", error);
      }
    };
    fetchTodo();
  }, [query]);

  const handleSort = (order) => {
    setQuery((prev) => ({
      ...prev,
      _sort: order ? "priority" : "",
      _order: order,
      _page: 1,
    }));
  };

  const handleFilterPriority = (value) => {
    setPriorityFilter(value);
    setQuery((prev) => ({
      ...prev,
      priority: value ? Number(value) : undefined,
      _page: 1,
    }));
  };

  const handleSearch = () => {
    setQuery((prev) => ({ ...prev, q: searchValue, _page: 1 }));
  };

  const handlePagination = (page) => {
    setQuery((prev) => ({ ...prev, _page: page }));
  };

  const handleFilterStatus = (value) => {
    setStatusFilter(value);
  };

  const handleResetFilters = () => {
    setSearchValue("");
    setPriorityFilter("");
    setStatusFilter("");
    setQuery({
      _page: 1,
      _limit: 6,
      _sort: "",
      _order: "",
      q: "",
      priority: undefined,
    });
  };

  const getTaskStatus = (item) => {
    const now = new Date();
    const due = new Date(item.dueDate);

    if (item.completed)
      return { text: "Hoàn thành", color: "bg-green-100 text-green-700" };
    if (due < now) return { text: "Quá hạn", color: "bg-red-100 text-red-600" };
    return { text: "Đang thực hiện", color: "bg-yellow-100 text-yellow-700" };
  };

  const getPriorityLabel = (value) => {
    if (value === 3) return "Cao";
    if (value === 2) return "Trung bình";
    if (value === 1) return "Thấp";
    return "—";
  };

  const filteredTodos = todo.filter((item) => {
    const status = getTaskStatus(item).text;
    if (statusFilter === "") return true;
    return status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm công việc..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200 w-full sm:w-64"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tìm kiếm
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <select
            value={priorityFilter}
            onChange={(e) => handleFilterPriority(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">Tất cả ưu tiên</option>
            <option value="3">Cao</option>
            <option value="2">Trung bình</option>
            <option value="1">Thấp</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => handleFilterStatus(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Đang thực hiện">Đang thực hiện</option>
            <option value="Quá hạn">Quá hạn</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>

          <select
            value={query._order}
            onChange={(e) => handleSort(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">Sắp xếp mặc định</option>
            <option value="asc">Ưu tiên cao → thấp</option>
            <option value="desc">Ưu tiên thấp → cao</option>
          </select>

          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Làm mới
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📋 Danh sách công việc
      </h2>

      {filteredTodos && filteredTodos.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Tên công việc</th>
                <th className="px-4 py-3 border">Mô tả</th>
                <th className="px-4 py-3 border">Trạng thái</th>
                <th className="px-4 py-3 border">Mức ưu tiên</th>
                <th className="px-4 py-3 border">Ngày hết hạn</th>
                <th className="px-4 py-3 border">Tạo lúc</th>
                <th className="px-4 py-3 border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((item, index) => {
                const status = getTaskStatus(item);
                return (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50 transition border-b last:border-none"
                  >
                    <td className="px-4 py-3 border text-gray-500">
                      {(meta?.page - 1) * query._limit + (index + 1)}
                    </td>
                    <td className="px-4 py-3 border font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 border text-gray-600 max-w-xs truncate">
                      {item.description || "—"}
                    </td>
                    <td className="px-4 py-3 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                      >
                        {status.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 border text-gray-700">
                      {getPriorityLabel(item.priority)}
                    </td>
                    <td className="px-4 py-3 border text-gray-700">
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 border text-gray-700">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 border text-center space-x-2">
                      <button className="text-blue-600 hover:underline">
                        Sửa
                      </button>
                      <button className="text-red-600 hover:underline">
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Không có công việc nào để hiển thị
        </div>
      )}

      {/* Phân trang */}
      {meta && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePagination(meta.page - 1)}
            disabled={meta.page === 1}
            className={`px-3 py-1 border rounded-lg ${
              meta.page === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            ← Trước
          </button>

          {Array.from({ length: meta.totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePagination(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                meta.page === i + 1
                  ? "bg-blue-500 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePagination(meta.page + 1)}
            disabled={meta.page === meta.totalPages}
            className={`px-3 py-1 border rounded-lg ${
              meta.page === meta.totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoListPage;
