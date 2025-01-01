export function calculateAutoGridSize(numElements: number): number {
  let size = 1;
  while (true) {
    let nextSquare = (size + 1) ** 2;
    let halfNextSquare = Math.ceil(nextSquare / 2);
    if (numElements < halfNextSquare) {
      return size;
    }
    size++;
  }
}

export function calculateGridSize(numElements: number): number {
  return calculateAutoGridSize(numElements) ** 2;
}

export function calculateGridDimensions(
  size: number,
  aspectRatio: { width: number; height: number }
): { width: number; height: number } {
  const ratio = aspectRatio.width / aspectRatio.height;
  const totalArea = size * size;
  
  // Calculate dimensions maintaining aspect ratio and total area
  let width = Math.sqrt(totalArea * ratio);
  let height = totalArea / width;
  
  // Round to nearest integers while preserving area as much as possible
  width = Math.round(width);
  height = Math.round(height);
  
  return { width, height };
}