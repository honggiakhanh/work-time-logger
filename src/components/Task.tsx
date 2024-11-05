import React from "react";

interface TaskProps {
  name: string;
  isDisabled: boolean;
  isActive: boolean;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ name, isDisabled, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={` text-white font-bold py-2 px-4 rounded 
        ${isDisabled ? "cursor-not-allowed" : ""} 
        ${
          isActive
            ? "bg-green-500 hover:bg-green-700 text-white"
            : "bg-gray-500 hover:bg-gray-400 text-white"
        }
      `}
    >
      {name}
    </button>
  );
};

export default Task;
