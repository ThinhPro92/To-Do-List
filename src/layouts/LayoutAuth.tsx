import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 lg:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to from-pink-100 via-orange-50 to-white" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default LayoutAuth;
