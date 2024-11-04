import React from "react";
import { TaskStatistics } from "../types";
import { formatDuration } from "../utils/utils";

interface DayStatisticProps {
  statistics: TaskStatistics;
  isVisible: boolean;
}

const DayStatistic: React.FC<DayStatisticProps> = ({
  statistics,
  isVisible,
}) => {
  if (!isVisible) return null;

  const totalTime = Object.values(statistics).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Day Statistics</h2>
      <div className="space-y-4">
        {Object.entries(statistics).map(([taskName, duration]) => {
          const percentage = ((duration / totalTime) * 100).toFixed(1);
          return (
            <div key={taskName} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{taskName}</span>
                <span className="text-gray-600">
                  {formatDuration(0, duration)} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-bold">Total Time:</span>
            <span className="font-bold">{formatDuration(0, totalTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayStatistic;
