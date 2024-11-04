import React from "react";
import { Task } from "../types";
import { formatTime, formatDuration } from "../utils/utils";

interface TaskHistoryProps {
  tasks: Task[];
}

const TaskHistory: React.FC<TaskHistoryProps> = ({ tasks }) => {
  const sortedTasks = [...tasks].sort((a, b) => b.startTime - a.startTime);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Work Log</h2>
      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">
                {task.name}
              </span>
              <span className="text-sm text-gray-500">
                {formatTime(task.startTime)} -{" "}
                {task.endTime ? formatTime(task.endTime) : "Ongoing"}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Duration:{" "}
              {formatDuration(task.startTime, task.endTime || Date.now())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskHistory;
