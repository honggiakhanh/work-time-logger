import { Task, TaskStatistics } from "../types";
import { predefinedTasks } from "../utils/utils";

export const taskService = {
  calculateTaskStatistics(tasks: Task[]): TaskStatistics {
    return tasks.reduce((stats, task) => {
      const duration = (task.endTime || Date.now()) - task.startTime;
      return {
        ...stats,
        [task.name]: (stats[task.name] || 0) + duration,
      };
    }, {} as TaskStatistics);
  },

  createTask(name: string): Task {
    if (!predefinedTasks.includes(name)) {
      throw new Error(`Invalid task name: ${name}`);
    }

    const now = Date.now();
    return {
      id: now.toString(),
      name,
      startTime: now,
      endTime: null,
    };
  },

  endAllTasks(tasks: Task[]): Task[] {
    const now = Date.now();
    return tasks.map((task) =>
      task.endTime === null ? { ...task, endTime: now } : task
    );
  },
};
