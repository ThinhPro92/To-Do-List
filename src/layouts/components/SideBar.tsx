// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStar,
  faListCheck,
  faFolderOpen,
  faGear,
  faCircleQuestion,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { to: "/home", label: "Trang chủ", icon: faHome },
  { to: "/important", label: "Quan trọng", icon: faStar },
  { to: "/todo-list", label: "Nhiệm vụ của tôi", icon: faListCheck },
  { to: "/category", label: "Danh mục công việc", icon: faFolderOpen },
  { to: "/settings", label: "Cài đặt", icon: faGear },
  { to: "/faq", label: "Trợ giúp", icon: faCircleQuestion },
];

const Sidebar = () => {
  const user = {
    avatar:
      "https://cdn-media.sforum.vn/storage/app/media/Van%20Pham/hinh-nen-anime-82.jpg",
    userName: "Đàm Đức Thịnh",
    email: "thinh@example.com",
  };

  return (
    <aside className="w-72 bg-[#ff5c5c] text-white flex flex-col py-8 rounded-tr-3xl rounded-br-3xl shadow-2xl h-screen">
      {/* Avatar & Info */}
      <div className="flex flex-col items-center mb-12 px-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-xl font-bold">{user.userName}</h2>
        <p className="text-sm opacity-90">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 py-4 px-6 mb-2 rounded-2xl transition-all duration-300 font-medium no-underline ${
                isActive
                  ? "bg-white text-[#ff5c5c] shadow-lg "
                  : "hover:bg-white hover:bg-opacity-15"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-6 mt-8">
        <button className="flex items-center gap-4 py-4 px-6 rounded-2xl w-full text-lg font-medium transition-all duration-300 hover:bg-white hover:text-[#ff5c5c] no-underline">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
