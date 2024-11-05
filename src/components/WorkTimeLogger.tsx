import React, { useEffect, useState } from "react";
import { useWorkTime } from "../hooks/useWorkTime";
import { taskService } from "../services/taskService";
import WorkDayInfo from "./WorkDayInfo";
import TaskList from "./TaskList";
import TaskHistory from "./TaskHistory";
import { usePalleteEntries } from "../hooks/usePalleteEntries";
import PalleteEntryForm from "./PalleteEntryForm";
import PalleteList from "./PalleteList";
import { PalleteEntry } from "../types";
import DayStatistic from "./DayStatistic";
import { predefinedTasks } from "../utils/utils";

const WorkTimeLogger: React.FC = () => {
  const {
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
  } = useWorkTime();

  const [isPalleteFormOpen, setIsPalleteFormOpen] = useState(false);
  const { palleteEntries, addPalleteEntry, resetPalleteEntries } =
    usePalleteEntries();

  const startWorkDay = () => {
    const now = Date.now();
    setWorkStartTime(now);
    setWorkEndTime(null);
    const initialTask = taskService.createTask(predefinedTasks[0]);
    setTasks([initialTask]);
    setCurrentTask(initialTask);
    resetPalleteEntries();
  };

  const endWorkDay = () => {
    if (window.confirm("Bạn có chắc chắn muốn kết thúc ngày làm việc?")) {
      const now = Date.now();
      setWorkEndTime(now);
      const endedTasks = taskService.endAllTasks(tasks);
      setTasks(endedTasks);
      setCurrentTask(null);
      setTaskStatistics(taskService.calculateTaskStatistics(endedTasks));
    }
  };

  const startTask = (taskName: string) => {
    if (!predefinedTasks.includes(taskName)) {
      console.error(`Invalid task name: ${taskName}`);
      return;
    }

    if (currentTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id ? { ...task, endTime: Date.now() } : task
        )
      );
    }

    const newTask = taskService.createTask(taskName);
    setTasks((prev) => [...prev, newTask]);
    setCurrentTask(newTask);
  };

  const handlePalleteSubmit = (
    entry: Omit<PalleteEntry, "id" | "timestamp">
  ) => {
    addPalleteEntry(entry);
    setIsPalleteFormOpen(false);
  };

  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdateTrigger((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Work Time Logger</h1>
      <div>
        <WorkDayInfo
          workStartTime={workStartTime}
          workEndTime={workEndTime}
          startWorkDay={startWorkDay}
          endWorkDay={endWorkDay}
        />
        {workEndTime ? (
          <DayStatistic statistics={taskStatistics} isVisible={!!workEndTime} />
        ) : null}
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <TaskList
            workStartTime={workStartTime}
            workEndTime={workEndTime}
            currentTask={currentTask}
            onTaskStart={startTask}
            onAddPalleteClick={() => setIsPalleteFormOpen(true)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TaskHistory tasks={tasks} />
        <PalleteList
          entries={palleteEntries}
          onAddPalleteClick={() => setIsPalleteFormOpen(true)}
        />
      </div>
      <PalleteEntryForm
        isOpen={isPalleteFormOpen}
        onClose={() => setIsPalleteFormOpen(false)}
        onSubmit={handlePalleteSubmit}
      />
    </div>
  );
};

export default WorkTimeLogger;
