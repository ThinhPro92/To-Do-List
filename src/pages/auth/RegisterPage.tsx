import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebookF,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import SocialButton from "../../layouts/components/auth/SocialButton";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-500">TodoMaster</h1>
        <p className="text-gray-500 mt-2">Tạo tài khoản mới</p>
      </div>

      <h2 className="text-3xl font-bold text-[#1F1F1F]">Create your account</h2>

      {/* Social */}
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

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            placeholder="Nhập họ và tên..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Tối thiểu 8 ký tự"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              mat
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              mat
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới tính
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Nam</option>
            <option>Nữ</option>
            <option>Khác</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
            required
          />
          <span className="text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <Link to="/terms" className="text-red-500 hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link to="/privacy" className="text-red-500 hover:underline">
              Chính sách bảo mật
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#E44232] hover:bg-[#D23626] active:bg-[#C12F22] text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-red-500 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
