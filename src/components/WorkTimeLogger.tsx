import React, { useState, useEffect } from "react";

interface Task {
  id: string;
  name: string;
  startTime: number;
  endTime: number | null;
}

const predefinedTasks = [
  "Stickering",
  "Preparing pallete",
  "Handling finished pallete",
  "Trash",
  "Lunch",
  "Coffee Break",
  "Other",
];

const WorkTimeLogger: React.FC = () => {
  const [workStartTime, setWorkStartTime] = useState<number | null>(null);
  const [workEndTime, setWorkEndTime] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
  }, [isLoaded, workStartTime, workEndTime, tasks]);

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
  };

  const endWorkDay = () => {
    const confirmEnd = window.confirm(
      "Are you sure you want to end the work day?"
    );
    if (confirmEnd) {
      const now = Date.now();
      setWorkEndTime(now);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.endTime === null ? { ...task, endTime: now } : task
        )
      );
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
  };

  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return "Not set";
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDuration = (start: number, end: number | null) => {
    const duration = Math.floor(((end || Date.now()) - start) / 1000);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const sortedTasks = [...tasks].sort((a, b) => b.startTime - a.startTime);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Work Time Logger</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Work Day</h2>
        <p className="mb-2">Start Time: {formatTime(workStartTime)}</p>
        <p className="mb-2">End Time: {formatTime(workEndTime)}</p>
        <p className="mb-4">
          Duration:{" "}
          {workStartTime &&
            formatDuration(workStartTime, workEndTime || Date.now())}
        </p>
        {!workStartTime || workEndTime ? ( // Show button if no start time or work has ended
          <button
            onClick={startWorkDay}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Work Day
          </button>
        ) : (
          <button
            onClick={endWorkDay}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            End Work Day
          </button>
        )}
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {predefinedTasks.map((taskName) => (
            <button
              key={taskName}
              onClick={() => startTask(taskName)}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                !workStartTime || workEndTime
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!workStartTime || !!workEndTime}
            >
              Start {taskName}
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
