import { BoxSize } from '../types/grid';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface BoxSizeSelectorProps {
  availableSizes: BoxSize[];
  selectedSizes: BoxSize[];
  onSizeToggle: (size: BoxSize) => void;
}

export default function BoxSizeSelector({ 
  availableSizes, 
  selectedSizes, 
  onSizeToggle 
}: BoxSizeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSizesText = selectedSizes
    .map(size => `${size.width}x${size.height}`)
    .join(', ');

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Box Sizes:
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left text-sm bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
        >
          <span className="truncate">{selectedSizesText}</span>
          <ChevronDown size={16} className="ml-2 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="p-2 space-y-1">
              {availableSizes.map((size) => (
                <label key={size.id} className="flex items-center px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSizes.some(s => s.id === size.id)}
                    onChange={() => onSizeToggle(size)}
                    disabled={size.id === '1x1'}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">
                    {size.width}x{size.height}
                    {size.id === '1x1' && " (Always active)"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}