import React from "react";
import {
  FaHome,
  FaLightbulb,
  FaTasks,
  FaListAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#ff5c5c] text-white flex flex-col items-center py-6 rounded-tr-2xl rounded-br-2xl shadow-lg">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/hinh-nen-anime-82.jpg"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <h2 className="mt-3 text-lg font-semibold">Đàm Đức Thịnh</h2>
        <p className="text-sm text-gray-200">thinhdam92@gmail.com</p>
      </div>

      {/* Menu items */}
      <nav className="flex flex-col gap-3 w-full px-6">
        <button className="flex items-center gap-3 bg-white text-[#ff5c5c] font-medium py-2 px-4 rounded-xl shadow-sm">
          <FaHome /> Bảng điều khiển
        </button>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all">
          <FaLightbulb /> Quan trọng
        </button>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all">
          <FaTasks /> Nhiệm vụ của tôi
        </button>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all">
          <FaListAlt /> Danh mục công việc
        </button>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all">
          <FaCog /> Cài đặt
        </button>

        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all">
          <FaQuestionCircle /> Trợ giúp
        </button>
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full px-6 pt-6 border-t border-white/30">
        <button className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all w-full">
          <FaSignOutAlt /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
