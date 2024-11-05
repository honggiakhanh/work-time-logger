import React from "react";
import { PalleteEntry } from "../types";
import { formatTime } from "../utils/utils";

interface Props {
  entries: PalleteEntry[];
  onAddPalleteClick: () => void;
}

const PalleteList: React.FC<Props> = ({ entries, onAddPalleteClick }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center pb-2">
        <div>
          <h2 className="text-2xl font-semibold">Pallete Entries</h2>
          <p className="text-gray-600 mt-1">Total Palletes: {entries.length}</p>
        </div>
        <button
          onClick={onAddPalleteClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Pallete Entry
        </button>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{entry.goodType}</h3>
                <p className="text-sm text-gray-600">
                  {formatTime(entry.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <p>Slot: {entry.slot}</p>
                <p>Boxes: {entry.boxCount}</p>
                <p>Items/Box: {entry.itemsPerBox}</p>
              </div>
            </div>
            {entry.lotCode && <p className="mt-2">LOT Code: {entry.lotCode}</p>}
            {entry.otherInfo && (
              <p className="mt-2 text-gray-600">{entry.otherInfo}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalleteList;
