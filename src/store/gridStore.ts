import { create } from 'zustand';
import { BoxSize, GridState, AspectRatio } from '../types/grid';
import { calculateGridDimensions, calculateAutoGridSize } from '../utils/gridCalculator';

const DEFAULT_SIZES: BoxSize[] = [
  { id: '1x1', width: 1, height: 1 },
  { id: '1x2', width: 1, height: 2 },
  { id: '1x3', width: 1, height: 3 },
  { id: '2x2', width: 2, height: 2 },
  { id: '2x3', width: 2, height: 3 },
];

export const useGridStore = create<GridState>((set) => ({
  gridSize: 3,
  sequence: [],
  availableSizes: DEFAULT_SIZES,
  selectedSizes: [DEFAULT_SIZES[0]],
  aspectRatio: { width: 1, height: 1 },
  setGridSize: (size) => set({ gridSize: size }),
  setSequence: (sequence) => set({ sequence }),
  setSelectedSizes: (sizes) => set({ selectedSizes: sizes }),
  generateCombinations: (x, manualGridSize = null, aspectRatio = { width: 1, height: 1 }) => {
    const state = useGridStore.getState();
    const sizes = state.selectedSizes.map(size => size.width * size.height).sort((a, b) => a - b);
    let allCombinations: number[][] = [];

    const baseSize = manualGridSize || calculateAutoGridSize(x);
    const { width, height } = calculateGridDimensions(baseSize, aspectRatio);
    const totalArea = width * height;

    function findCombs(currentCombination: number[], currentSum: number, lastSizeIndex: number) {
      if (currentCombination.length === x) {
        if (currentSum === totalArea) {
          allCombinations.push([...currentCombination]);
        }
        return;
      }

      for (let i = lastSizeIndex; i < sizes.length; i++) {
        const size = sizes[i];
        if (currentSum + size <= totalArea) {
          findCombs([...currentCombination, size], currentSum + size, i);
        }
      }
    }

    findCombs([], 0, 0);

    if (allCombinations.length > 0) {
      const selectedCombination = allCombinations[Math.floor(Math.random() * allCombinations.length)];
      set({
        gridSize: baseSize,
        sequence: selectedCombination,
        aspectRatio
      });

      const resultsDiv = document.getElementById('results');
      const selectedResultDiv = document.getElementById('selectedResult');
      if (resultsDiv && selectedResultDiv) {
        resultsDiv.innerHTML = allCombinations
          .map(combo => `<div>Combination: ${combo.join(', ')} (Grid size: ${width}x${height})</div>`)
          .join('');
        selectedResultDiv.innerHTML = `Selected: ${selectedCombination.join(', ')} (Grid size: ${width}x${height})`;
      }
    }
  }
}));