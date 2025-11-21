import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

const LayoutMain = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutMain;
