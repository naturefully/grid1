interface BoxDimensions {
  width: number;
  height: number;
}

interface GridPosition {
  row: number;
  col: number;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function findSpaceWithOrientations(
  grid: number[][],
  width: number,
  height: number,
  gridWidth: number,
  gridHeight: number
): { position: GridPosition; dimensions: BoxDimensions } | null {
  // Try both orientations randomly
  const tryRotated = Math.random() > 0.5 && width !== height;
  
  if (tryRotated) {
    [width, height] = [height, width];
  }

  // Try first orientation
  const space = findSpace(grid, width, height, gridWidth, gridHeight);
  if (space) {
    return { position: space, dimensions: { width, height } };
  }

  // Try other orientation if different
  if (width !== height) {
    const rotatedSpace = findSpace(grid, height, width, gridWidth, gridHeight);
    if (rotatedSpace) {
      return { 
        position: rotatedSpace, 
        dimensions: { width: height, height: width } 
      };
    }
  }

  return null;
}

export function findSpace(
  grid: number[][],
  width: number,
  height: number,
  gridWidth: number,
  gridHeight: number
): GridPosition | null {
  // Generate all possible positions
  const positions: GridPosition[] = [];
  
  for (let row = 0; row <= gridHeight - height; row++) {
    for (let col = 0; col <= gridWidth - width; col++) {
      positions.push({ row, col });
    }
  }

  // Shuffle positions for random placement
  const shuffledPositions = shuffleArray(positions);

  // Try each position
  for (const pos of shuffledPositions) {
    if (canPlaceBox(grid, pos.row, pos.col, width, height)) {
      return pos;
    }
  }

  return null;
}

export function canPlaceBox(
  grid: number[][],
  row: number,
  col: number,
  width: number,
  height: number
): boolean {
  if (row < 0 || col < 0 || row + height > grid.length || col + width > grid[0].length) {
    return false;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[row + i][col + j] !== 0) {
        return false;
      }
    }
  }
  return true;
}