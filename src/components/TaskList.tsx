import React from "react";
import Task from "./Task";
import { predefinedTasks } from "../utils/utils";

interface TaskListProps {
  workStartTime: number | null;
  workEndTime: number | null;
  currentTask: { name: string } | null;
  onTaskStart: (taskName: string) => void;
  onAddPalleteClick: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  workStartTime,
  workEndTime,
  currentTask,
  onTaskStart,
  onAddPalleteClick,
}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
      </div>
      <div className="flex gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-grow">
          {predefinedTasks.map((taskName) => (
            <Task
              key={taskName}
              name={taskName}
              isDisabled={
                !workStartTime ||
                !!workEndTime ||
                taskName === currentTask?.name
              }
              isActive={taskName === currentTask?.name}
              onClick={() => onTaskStart(taskName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
