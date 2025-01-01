// Utility functions for grid operations
export function markGridSpace(
  grid: number[][],
  row: number,
  col: number,
  width: number,
  height: number
): void {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      grid[row + i][col + j] = 1;
    }
  }
}