import React from "react";
import { formatTime, formatDuration } from "../utils/utils";

type Props = {
  workStartTime: number | null;
  workEndTime: number | null;
  startWorkDay: () => void;
  endWorkDay: () => void;
};

const WorkDayInfo = ({
  workStartTime,
  workEndTime,
  startWorkDay,
  endWorkDay,
}: Props) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Work Day</h2>
      <p className="mb-2">Giờ bắt đầu: {formatTime(workStartTime)}</p>
      <p className="mb-2">Giờ kết thúc: {formatTime(workEndTime)}</p>
      <p className="mb-4">
        Thời gian làm việc:{" "}
        {workStartTime &&
          formatDuration(workStartTime, workEndTime || Date.now())}
      </p>
      {!workStartTime || workEndTime ? (
        <button
          onClick={startWorkDay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Bắt đầu ngày làm việc
        </button>
      ) : (
        <button
          onClick={endWorkDay}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Kết thúc ngày làm việc
        </button>
      )}
    </div>
  );
};

export default WorkDayInfo;
