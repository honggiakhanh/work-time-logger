import React, { useState } from "react";
import Modal from "./Modal";

interface PalleteEntry {
  goodType: string;
  lotCode?: string;
  slot: number;
  boxCount: number;
  itemsPerBox: number;
  otherInfo?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<PalleteEntry, "id" | "timestamp">) => void;
}

const goodTypes = [
  "Mesam3060",
  "Mesam3061",
  "Mesam3096",
  "Mesam3097",
  "Mesam3117",
  "Mesam3084",
  "Mebc2534",
  "Mebc2657",
  "Mebc2658",
];

const PalleteEntryForm: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PalleteEntry>({
    goodType: goodTypes[0],
    lotCode: "",
    slot: 0,
    boxCount: 40,
    itemsPerBox: 24,
    otherInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      goodType: goodTypes[0],
      lotCode: "",
      slot: 0,
      boxCount: 40,
      itemsPerBox: 24,
      otherInfo: "",
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "slot" || name === "boxCount" || name === "itemsPerBox"
          ? Number(value)
          : value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Pallete Entry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type of Good
              <select
                name="goodType"
                value={formData.goodType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {goodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LOT Code (optional)
              <input
                type="text"
                name="lotCode"
                pattern="[0-9]*"
                value={formData.lotCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter LOT code"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slot
              <input
                type="number"
                name="slot"
                required
                value={formData.slot}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Boxes
              <input
                type="number"
                name="boxCount"
                required
                value={formData.boxCount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Items per Box
              <input
                type="number"
                name="itemsPerBox"
                required
                value={formData.itemsPerBox}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
              <textarea
                name="otherInfo"
                value={formData.otherInfo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Enter any additional information"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Pallete Entry
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default PalleteEntryForm;
