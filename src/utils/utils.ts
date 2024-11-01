export const formatTime = (timestamp: number | null): string => {
  if (!timestamp) return "Not set";
  return new Date(timestamp).toLocaleTimeString();
};

export const formatDuration = (start: number, end: number | null): string => {
  const duration = Math.floor(((end || Date.now()) - start) / 1000);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export const predefinedTasks = [
  "Dán tem",
  "Xử lí pallete",
  "Đổ rác",
  "Nghỉ trưa",
  "Cà phê",
  "Việc khác",
];
