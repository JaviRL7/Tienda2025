import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;