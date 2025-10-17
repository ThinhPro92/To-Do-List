import { useEffect, useState } from "react";
import { getToDo } from "../../api/apiTodo";

const ImportantTodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchImportant = async () => {
      try {
        const res = await getToDo({ priority: 3 });
        setTodos(res.data);
      } catch (error) {
        console.error("Lỗi khi tải công việc quan trọng:", error);
      }
    };
    fetchImportant();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        ⭐ Công việc quan trọng
      </h2>

      {todos.length > 0 ? (
        <ul className="space-y-4">
          {todos.map((item) => (
            <li
              key={item._id}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-gray-600">
                {item.description || "Không có mô tả"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          Không có công việc quan trọng nào
        </p>
      )}
    </div>
  );
};

export default ImportantTodoList;
