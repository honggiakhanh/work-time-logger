export interface Task {
  id: string;
  name: string;
  startTime: number;
  endTime: number | null;
}

export interface TaskStatistics {
  [key: string]: number;
}

export interface PalleteEntry {
  id: string;
  timestamp: number;
  goodType: string;
  lotCode?: string;
  slot: number;
  boxCount: number;
  itemsPerBox: number;
  otherInfo?: string;
}
