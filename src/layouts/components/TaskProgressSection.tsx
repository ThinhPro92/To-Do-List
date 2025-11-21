import MiniStatusCard from "../MiniStatusCard";

const progressData = [
  { label: "Hoàn thành", percent: 24, color: "bg-green-500" },
  { label: "Đang tiến hành", percent: 35, color: "bg-amber-500" },
  { label: "Chưa hoàn thành", percent: 41, color: "bg-red-500" },
];

const stats = [
  { label: "Hoàn thành", value: 8, color: "text-green-600" },
  { label: "Đang tiến hành", value: 12, color: "text-amber-600" },
  { label: "Chưa hoàn thành", value: 14, color: "text-red-600" },
];

const TaskProgressSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
      <h3 className="text-xl font-bold mb-8 text-gray-800">
        Tiến độ tổng quan
      </h3>

      <div className="mb-10">
        <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
        <p className="text-5xl font-bold text-red-500">64%</p>
        <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-700"
            style={{ width: "64%" }}
          ></div>
        </div>
      </div>

      <div className="space-y-5 mb-10">
        {progressData.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{item.percent}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-700`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat) => (
          <MiniStatusCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskProgressSection;
