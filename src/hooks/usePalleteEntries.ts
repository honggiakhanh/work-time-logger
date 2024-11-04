import { useState, useEffect } from "react";
import { PalleteEntry } from "../types";

export const usePalleteEntries = () => {
  const [palleteEntries, setPalleteEntries] = useState<PalleteEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem("palleteEntries");
    if (savedEntries) {
      setPalleteEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("palleteEntries", JSON.stringify(palleteEntries));
  }, [palleteEntries]);

  const addPalleteEntry = (entry: Omit<PalleteEntry, "id" | "timestamp">) => {
    const newEntry: PalleteEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setPalleteEntries((prev) => [newEntry, ...prev]);
  };

  return { palleteEntries, addPalleteEntry };
};
