import { useState, useEffect } from "react";

const Header = () => {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const options = { weekday: "long" };
      setDay(now.toLocaleDateString("vi-VN", options));

      setDate(now.toLocaleDateString("vi-VN"));

      setTime(
        now.toLocaleTimeString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi unmount
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold">
        <span className="text-red-500">Dash</span>
        <span className="text-black">board</span>
      </h1>

      <div className="flex items-center gap-4">
        <button className="p-2 bg-red-400 hover:bg-red-500 rounded-full text-white">
          🔔
        </button>

        <button className="p-2 bg-red-400 hover:bg-red-500 rounded-full text-white">
          📅
        </button>

        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold capitalize">{day}</span>
          <span className="text-xs text-blue-500">{date}</span>
        </div>
        <span className="text-sm font-bold text-gray-700">{time}</span>
      </div>
    </header>
  );
};

export default Header;
