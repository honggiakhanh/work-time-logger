import React, { useState, useEffect } from "react";
import { formatTime, formatDuration, predefinedTasks } from "../utils/utils";
import WorkDayInfo from "./WorkDayInfo";
import PalleteEntryForm from "./PalleteEntryForm";

interface Task {
  id: string;
  name: string;
  startTime: number;
  endTime: number | null;
}

const WorkTimeLogger: React.FC = () => {
  const [workStartTime, setWorkStartTime] = useState<number | null>(null);
  const [workEndTime, setWorkEndTime] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatistics, setTaskStatistics] = useState<{
    [key: string]: number;
  }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      const savedData = localStorage.getItem("workTimeLoggerData");
      console.log("Loaded data from localStorage:", savedData);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData && typeof parsedData === "object") {
            setWorkStartTime(parsedData.workStartTime || null);
            setWorkEndTime(parsedData.workEndTime || null);
            setTasks(Array.isArray(parsedData.tasks) ? parsedData.tasks : []);
            setCurrentTask(parsedData.currentTask || null);
            setTaskStatistics(parsedData.taskStatistics || {});
          } else {
            console.error("Invalid data structure in localStorage");
          }
        } catch (error) {
          console.error("Error parsing saved data:", error);
        }
      }
      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      console.log("State changed:", { workStartTime, workEndTime, tasks });
      const dataToSave = { workStartTime, workEndTime, tasks };
      localStorage.setItem("workTimeLoggerData", JSON.stringify(dataToSave));
    }
  }, [isLoaded, workStartTime, workEndTime, tasks, taskStatistics]);

  const startWorkDay = () => {
    const now = Date.now();
    setWorkStartTime(now);
    setWorkEndTime(null);
    setTasks([
      {
        id: now.toString(),
        name: "Stickering",
        startTime: now,
        endTime: null,
      },
    ]);
    setCurrentTask({
      id: now.toString(),
      name: "Stickering",
      startTime: now,
      endTime: null,
    });
  };

  const endWorkDay = () => {
    const confirmEnd = window.confirm(
      "Bạn có chắc chắn muốn kết thúc ngày làm việc?"
    );
    if (confirmEnd) {
      const now = Date.now();
      setWorkEndTime(now);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.endTime === null ? { ...task, endTime: now } : task
        )
      );
      setCurrentTask(null);
      const statistics = calculateTaskStatistics();
      setTaskStatistics(statistics);
    }
  };

  const startTask = (taskName: string) => {
    const now = Date.now();
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.endTime === null ? { ...task, endTime: now } : task
      );
      return [
        ...updatedTasks,
        {
          id: now.toString(),
          name: taskName,
          startTime: now,
          endTime: null,
        },
      ];
    });
    setCurrentTask({
      id: now.toString(),
      name: taskName,
      startTime: now,
      endTime: null,
    });
  };

  const sortedTasks = [...tasks].sort((a, b) => b.startTime - a.startTime);

  const calculateTaskStatistics = () => {
    const statistics: { [key: string]: number } = {};
    tasks.forEach((task) => {
      const duration = (task.endTime || Date.now()) - task.startTime;
      if (statistics[task.name]) {
        statistics[task.name] += duration;
      } else {
        statistics[task.name] = duration;
      }
    });
    return statistics;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Work Time Logger</h1>
      <div className="grid grid-cols-2 gap-4">
        <WorkDayInfo
          workStartTime={workStartTime}
          workEndTime={workEndTime}
          startWorkDay={startWorkDay}
          endWorkDay={endWorkDay}
        />
        <PalleteEntryForm />
      </div>
      {workEndTime && Object.keys(taskStatistics).length > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Work Day Statistics</h2>
          {Object.entries(taskStatistics).map(([taskName, duration]) => (
            <div key={taskName} className="mb-2">
              <span className="font-semibold">{taskName}:</span>{" "}
              {formatDuration(0, duration)}
            </div>
          ))}
        </div>
      )}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {predefinedTasks.map((taskName) => (
            <button
              key={taskName}
              onClick={() => startTask(taskName)}
              disabled={
                !workStartTime ||
                !!workEndTime ||
                taskName === currentTask?.name
              }
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded 
              ${
                !workStartTime || workEndTime || taskName === currentTask?.name
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } 
              ${taskName === currentTask?.name ? "opacity-50" : ""}`}
            >
              {taskName}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Task List</h3>
          {sortedTasks.map((task) => (
            <div key={task.id} className="mb-2 p-2 bg-gray-100 rounded">
              <span className="font-semibold">{task.name}</span>
              <span className="ml-2">
                {formatTime(task.startTime)} -{" "}
                {task.endTime ? formatTime(task.endTime) : "Ongoing"}
              </span>
              <span className="ml-2">
                ({formatDuration(task.startTime, task.endTime || Date.now())})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkTimeLogger;
