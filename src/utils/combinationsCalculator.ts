import { BoxSize } from '../types/grid';

export function calculatePossibleCombinations(
  numElements: number,
  gridSize: number,
  selectedSizes: BoxSize[]
): number {
  const n = gridSize * gridSize;
  const sizes = selectedSizes.map(size => size.width * size.height).sort((a, b) => a - b);
  let count = 0;

  function countCombs(remaining: number, elements: number, lastSizeIndex: number) {
    if (elements === 0) {
      if (remaining === 0) count++;
      return;
    }
    if (remaining < 0) return;

    for (let i = lastSizeIndex; i < sizes.length; i++) {
      countCombs(remaining - sizes[i], elements - 1, i);
    }
  }

  countCombs(n, numElements, 0);
  return count;
}