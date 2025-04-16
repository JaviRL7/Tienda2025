import React from "react";

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors duration-300
        ${active ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
