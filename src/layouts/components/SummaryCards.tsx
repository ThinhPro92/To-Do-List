import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const SummaryCards = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  const total = todos.length;
  const completed = todos.filter((t) => t.isCompleted).length;
  const pending = total - completed;
  const performance = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { title: "Nhiệm vụ", value: total, color: "text-blue-600" },
    { title: "Hoàn thành", value: completed, color: "text-green-600" },
    { title: "Chưa hoàn thành", value: pending, color: "text-red-600" },
    {
      title: "Hiệu năng",
      value: `${performance}%`,
      sub: "So với hôm qua",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <p className="text-gray-500 text-sm mb-2">{card.title}</p>
          <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
          {card.sub && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <i className="fas fa-arrow-up"></i> {card.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
