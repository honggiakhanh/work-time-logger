import React, { useState } from "react";
import { useWorkTime } from "../hooks/useWorkTime";
import { taskService } from "../services/taskService";
import WorkDayInfo from "./WorkDayInfo";
import TaskList from "./TaskList";
import TaskHistory from "./TaskHistory";
import { formatDuration } from "../utils/utils";
import { usePalleteEntries } from "../hooks/usePalleteEntries";
import PalleteEntryForm from "./PalleteEntryForm";
import PalleteList from "./PalleteList";
import { PalleteEntry } from "../types";
import DayStatistic from "./DayStatistic";

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
  const { palleteEntries, addPalleteEntry } = usePalleteEntries();

  const startWorkDay = () => {
    const now = Date.now();
    setWorkStartTime(now);
    setWorkEndTime(null);
    const initialTask = taskService.createTask("Stickering");
    setTasks([initialTask]);
    setCurrentTask(initialTask);
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
    const newTask = taskService.createTask(taskName);
    setTasks((prev) => [...taskService.endAllTasks(prev), newTask]);
    setCurrentTask(newTask);
  };

  const handlePalleteSubmit = (
    entry: Omit<PalleteEntry, "id" | "timestamp">
  ) => {
    addPalleteEntry(entry);
    setIsPalleteFormOpen(false);
  };

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
