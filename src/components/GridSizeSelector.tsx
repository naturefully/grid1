import { useState, useEffect } from 'react';
import { useGridStore } from '../store/gridStore';
import { calculatePossibleCombinations } from '../utils/combinationsCalculator';
import { calculateAutoGridSize } from '../utils/gridCalculator';

interface GridSizeSelectorProps {
  defaultSize: number;
  numElements: number;
  onSizeChange: (size: number | null) => void;
}

export default function GridSizeSelector({ defaultSize, numElements, onSizeChange }: GridSizeSelectorProps) {
  const [isAuto, setIsAuto] = useState(true);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [combinations, setCombinations] = useState<number>(0);
  const { selectedSizes } = useGridStore();

  // Update combinations count and auto size
  useEffect(() => {
    if (isAuto) {
      const autoSize = calculateAutoGridSize(numElements);
      setSelectedSize(autoSize);
    }
    const count = calculatePossibleCombinations(
      numElements, 
      isAuto ? calculateAutoGridSize(numElements) : selectedSize,
      selectedSizes
    );
    setCombinations(count);
  }, [selectedSize, isAuto, selectedSizes, numElements]);

  const handleSizeChange = (size: number | 'auto') => {
    if (size === 'auto') {
      setIsAuto(true);
      const autoSize = calculateAutoGridSize(numElements);
      setSelectedSize(autoSize);
      onSizeChange(null);
    } else {
      setIsAuto(false);
      setSelectedSize(size);
      onSizeChange(size);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Grid Size:
        </label>
        <div className="flex items-center space-x-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isAuto}
              onChange={() => handleSizeChange(isAuto ? selectedSize : 'auto')}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Auto</span>
          </label>
          <span className="text-sm font-medium text-gray-900">
            {`${selectedSize}x${selectedSize}`}
          </span>
        </div>
      </div>
      
      <input
        type="range"
        min="1"
        max="14"
        value={selectedSize}
        onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1x1</span>
        <span>14x14</span>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        Possible combinations: {combinations}
      </div>
    </div>
  );
}