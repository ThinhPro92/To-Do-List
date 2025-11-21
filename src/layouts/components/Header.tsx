import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [currentTime, setCurrentTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Ho_Chi_Minh",
      };

      setCurrentTime({
        date: now.toLocaleDateString("vi-VN", optionsDate),
        time: now.toLocaleTimeString("vi-VN", optionsTime),
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 lg:px-10 py-5 bg-stone-100 shadow-sm">
      <h1 className="text-3xl font-bold">
        <span className="text-red-500">Dash</span>
        <span className="text-gray-900">board</span>
      </h1>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-5 text-gray-600">
          <div className="relative cursor-pointer hover:text-red-500 transition">
            <FontAwesomeIcon icon={faBell} size="lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>
          <FontAwesomeIcon
            icon={faCalendarDays}
            size="lg"
            className="hidden sm:block cursor-pointer hover:text-red-500 transition"
          />
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">{currentTime.date}</p>
          <p className="text-xl font-semibold text-gray-800">
            {currentTime.time}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
