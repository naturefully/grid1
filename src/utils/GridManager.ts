import { Node } from 'reactflow';
import { BOX_ORIENTATIONS } from './boxSizes';
import { findSpaceWithOrientations } from './boxPlacer';
import { markGridSpace } from './gridOperations';
import { validateGridSize, canFitBoxes } from './gridValidator';
import { calculateGridDimensions } from './gridCalculator';

interface PlacementResult {
  success: boolean;
  nodes?: Node[];
  error?: string;
}

interface GridDimensions {
  width: number;
  height: number;
}

export class GridManager {
  static readonly MAX_ATTEMPTS = 5;
  private dimensions: GridDimensions;

  constructor(
    private gridSize: number,
    private baseSize: number,
    private aspectRatio: { width: number; height: number } = { width: 1, height: 1 }
  ) {
    this.dimensions = calculateGridDimensions(gridSize, aspectRatio);
  }

  placeBoxes(sequence: number[], attempt: number): PlacementResult {
    if (!validateGridSize(this.dimensions.width * this.dimensions.height, sequence)) {
      return {
        success: false,
        error: 'Total box area exceeds grid size'
      };
    }

    const boxes = sequence.map(size => BOX_ORIENTATIONS[size][0]);
    if (!canFitBoxes(Math.max(this.dimensions.width, this.dimensions.height), boxes)) {
      return {
        success: false,
        error: 'Some boxes are too large for the grid'
      };
    }

    const grid = Array(this.dimensions.height).fill(null)
      .map(() => Array(this.dimensions.width).fill(0));
    const nodes: Node[] = [];
    let placementFailed = false;

    // Sort boxes by size (largest first) for better placement
    const sortedBoxes = [...sequence]
      .sort((a, b) => b - a)
      .map(size => ({ size }));

    for (const { size } of sortedBoxes) {
      if (placementFailed) break;

      const orientations = BOX_ORIENTATIONS[size];
      const result = findSpaceWithOrientations(
        grid,
        orientations[0].width,
        orientations[0].height,
        this.dimensions.width,
        this.dimensions.height
      );

      if (result) {
        const { position, dimensions } = result;
        nodes.push(this.createNode(nodes.length, position, dimensions, size));
        markGridSpace(grid, position.row, position.col, dimensions.width, dimensions.height);
      } else {
        placementFailed = true;
      }
    }

    if (placementFailed) {
      return {
        success: false,
        error: attempt >= GridManager.MAX_ATTEMPTS ? 
          'Failed to place all boxes after maximum attempts' : 
          'Retrying box placement'
      };
    }

    return { success: true, nodes };
  }

  private createNode(
    index: number,
    position: { row: number; col: number },
    dimensions: { width: number; height: number },
    size: number
  ): Node {
    return {
      id: `node-${index}`,
      type: 'custom',
      position: { 
        x: position.col * this.baseSize, 
        y: position.row * this.baseSize 
      },
      data: { 
        width: dimensions.width * this.baseSize, 
        height: dimensions.height * this.baseSize, 
        label: `${size}x` 
      }
    };
  }
}