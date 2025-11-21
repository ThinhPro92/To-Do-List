import type { ReactNode } from "react";

interface SocialButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}

const SocialButton = ({ children, icon, onClick }: SocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default SocialButton;
