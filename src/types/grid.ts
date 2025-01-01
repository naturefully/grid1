export interface BoxSize {
  id: string;
  width: number;
  height: number;
}

export interface AspectRatio {
  width: number;
  height: number;
}

export interface GridState {
  gridSize: number;
  sequence: number[];
  availableSizes: BoxSize[];
  selectedSizes: BoxSize[];
  aspectRatio: AspectRatio;
  setGridSize: (size: number) => void;
  setSequence: (sequence: number[]) => void;
  setSelectedSizes: (sizes: BoxSize[]) => void;
  generateCombinations: (numElements: number, manualGridSize?: number | null, aspectRatio?: AspectRatio) => void;
}