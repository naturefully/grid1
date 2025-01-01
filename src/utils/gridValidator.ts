import { BoxOrientation } from './boxSizes';

export function validateGridSize(totalArea: number, sequence: number[]): boolean {
  const boxesArea = sequence.reduce((sum, size) => sum + size, 0);
  return boxesArea <= totalArea;
}

export function canFitBoxes(maxDimension: number, boxes: BoxOrientation[]): boolean {
  return boxes.every(box => 
    (box.width <= maxDimension && box.height <= maxDimension) ||
    (box.height <= maxDimension && box.width <= maxDimension)
  );
}