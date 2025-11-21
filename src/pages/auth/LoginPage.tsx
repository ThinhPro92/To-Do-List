import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebookF,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import SocialButton from "../../layouts/components/auth/SocialButton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-500">TodoMaster</h1>
        <p className="text-gray-500 mt-2">Quản lý công việc thông minh</p>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-[#1F1F1F]">Welcome back!</h2>
      <p className="text-gray-600">Đăng nhập để tiếp tục quản lý công việc</p>

      {/* Social Login */}
      <div className="space-y-3">
        <SocialButton
          icon={<FontAwesomeIcon icon={faGoogle} className="text-lg" />}
        >
          Continue with Google
        </SocialButton>
        <SocialButton
          icon={
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-lg text-[#1877F2]"
            />
          }
        >
          Continue with Facebook
        </SocialButton>
        <SocialButton
          icon={<FontAwesomeIcon icon={faApple} className="text-xl" />}
        >
          Continue with Apple
        </SocialButton>
      </div>

      <div className="relative text-center text-gray-500 my-6">
        <span className="bg-white px-4">Or</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gray-300 -z-10" />
      </div>

      {/* Form */}
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition pr-12"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              mat
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/auth/forgot"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#E44232] hover:bg-[#D23626] active:bg-[#C12F22] text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Log in
        </button>
      </form>

      <p className="text-center text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/auth/register"
          className="text-red-500 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
