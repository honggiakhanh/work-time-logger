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
      className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${isActive ? "opacity-50" : ""}`}
    >
      {name}
    </button>
  );
};

export default Task;
