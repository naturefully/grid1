import { useState } from 'react';

interface AspectRatioSelectorProps {
  onChange: (width: number, height: number) => void;
}

export default function AspectRatioSelector({ onChange }: AspectRatioSelectorProps) {
  const [ratio, setRatio] = useState(50); // 50 represents 1:1

  const handleChange = (value: number) => {
    setRatio(value);
    const width = Math.round(14 * (value / 50));
    const height = Math.round(14 * ((100 - value) / 50));
    onChange(width, height);
  };

  const getRatioText = () => {
    const width = Math.round(14 * (ratio / 50));
    const height = Math.round(14 * ((100 - ratio) / 50));
    return `${width}:${height}`;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Grid Aspect Ratio:
        </label>
        <span className="text-sm font-medium text-gray-900">
          {getRatioText()}
        </span>
      </div>
      
      <input
        type="range"
        min="25"
        max="75"
        value={ratio}
        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>1:2</span>
        <span>1:1</span>
        <span>2:1</span>
      </div>
    </div>
  );
}