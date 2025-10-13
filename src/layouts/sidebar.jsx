import React from "react";
import { Link } from "react-router-dom";
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
        <Link
          to="/"
          className="flex items-center gap-3 bg-white text-[#ff5c5c] font-medium py-2 px-4 rounded-xl shadow-sm hover:opacity-90 transition-all"
        >
          <FaHome /> Trang chủ
        </Link>

        <Link
          to="/important"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all"
        >
          <FaLightbulb /> Quan trọng
        </Link>

        <Link
          to="/todo-list"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all"
        >
          <FaTasks /> Nhiệm vụ của tôi
        </Link>

        <Link
          to="/categories"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all"
        >
          <FaListAlt /> Danh mục công việc
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all"
        >
          <FaCog /> Cài đặt
        </Link>

        <Link
          to="/faq"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all"
        >
          <FaQuestionCircle /> Trợ giúp
        </Link>
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full px-6 pt-6 border-t border-white/30">
        <Link
          to="/logout"
          className="flex items-center gap-3 py-2 px-4 hover:bg-[#ff7b7b] rounded-xl transition-all w-full"
        >
          <FaSignOutAlt /> Đăng xuất
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
