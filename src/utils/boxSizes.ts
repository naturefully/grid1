export interface BoxOrientation {
  width: number;
  height: number;
}

export const BOX_ORIENTATIONS: Record<number, BoxOrientation[]> = {
  6: [
    { width: 3, height: 2 },
    { width: 2, height: 3 }
  ],
  4: [
    { width: 2, height: 2 }
  ],
  3: [
    { width: 3, height: 1 },
    { width: 1, height: 3 }
  ],
  2: [
    { width: 2, height: 1 },
    { width: 1, height: 2 }
  ],
  1: [
    { width: 1, height: 1 }
  ]
};