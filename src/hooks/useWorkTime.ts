import { useState, useEffect } from "react";
import { Task } from "../types";

export const useWorkTime = () => {
  const [workStartTime, setWorkStartTime] = useState<number | null>(null);
  const [workEndTime, setWorkEndTime] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskStatistics, setTaskStatistics] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const savedData = localStorage.getItem("workTimeLoggerData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setWorkStartTime(parsedData.workStartTime || null);
      setWorkEndTime(parsedData.workEndTime || null);
      setTasks(parsedData.tasks || []);
      setCurrentTask(parsedData.currentTask || null);
      setTaskStatistics(parsedData.taskStatistics || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "workTimeLoggerData",
      JSON.stringify({
        workStartTime,
        workEndTime,
        tasks,
        currentTask,
        taskStatistics,
      })
    );
  }, [workStartTime, workEndTime, tasks, currentTask, taskStatistics]);

  return {
    workStartTime,
    setWorkStartTime,
    workEndTime,
    setWorkEndTime,
    tasks,
    setTasks,
    currentTask,
    setCurrentTask,
    taskStatistics,
    setTaskStatistics,
  };
};
