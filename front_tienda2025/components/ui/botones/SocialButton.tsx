import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";

interface SocialButtonProps {
  icon: ReactNode; // Ahora 'icon' en lugar de 'network'
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center hover:bg-gray-50 transition-colors"
    >
      {icon}
    </button>
  );
};

export default SocialButton;
