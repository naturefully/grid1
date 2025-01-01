import { useState } from 'react';
import { useGridStore } from '../store/gridStore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BoxSizeSelector from './BoxSizeSelector';
import GridSizeSelector from './GridSizeSelector';
import AspectRatioSelector from './AspectRatioSelector';
import { BoxSize } from '../types/grid';

export default function Controls() {
  const [numElements, setNumElements] = useState(5);
  const [isOpen, setIsOpen] = useState(true);
  const [manualGridSize, setManualGridSize] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState({ width: 1, height: 1 });
  const { generateCombinations, availableSizes, selectedSizes, setSelectedSizes } = useGridStore();

  const handleGenerate = () => {
    generateCombinations(numElements, manualGridSize, aspectRatio);
  };

  const handleSizeToggle = (size: BoxSize) => {
    if (size.id === '1x1') return;
    
    const newSelectedSizes = selectedSizes.some(s => s.id === size.id)
      ? selectedSizes.filter(s => s.id !== size.id)
      : [...selectedSizes, size];
    
    if (!newSelectedSizes.some(s => s.id === '1x1')) {
      newSelectedSizes.push(availableSizes[0]);
    }
    
    setSelectedSizes(newSelectedSizes);
  };

  const handleAspectRatioChange = (width: number, height: number) => {
    setAspectRatio({ width, height });
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg border-2 border-gray-200 w-80">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-3 flex items-center justify-between text-lg font-bold border-b"
      >
        Grid Generator
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isOpen && (
        <div className="p-3">
          <div className="mb-4">
            <label htmlFor="numElements" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Elements:
            </label>
            <input
              type="number"
              id="numElements"
              value={numElements}
              onChange={(e) => setNumElements(parseInt(e.target.value, 10))}
              min="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <GridSizeSelector
            defaultSize={3}
            numElements={numElements}
            onSizeChange={setManualGridSize}
          />
          
          <AspectRatioSelector
            onChange={handleAspectRatioChange}
          />
          
          <BoxSizeSelector
            availableSizes={availableSizes}
            selectedSizes={selectedSizes}
            onSizeToggle={handleSizeToggle}
          />

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate Grid
          </button>

          <div className="mt-4 space-y-2">
            <div id="selectedResult" className="text-sm font-medium text-gray-900"></div>
            <div id="results" className="text-sm text-gray-600 max-h-48 overflow-y-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
}