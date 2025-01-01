import { useGridStore } from '../store/gridStore';

interface Combination {
  sequence: number[];
  gridSize: number;
}

export default function ResultsDisplay() {
  const { combinations, selectedCombination } = useGridStore();

  return (
    <div className="absolute top-4 right-4 z-10 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 max-h-96 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">All Combinations</h2>
      {combinations.map((combo, index) => (
        <div key={index} className="p-2 border-b border-gray-200 text-sm">
          Combination: {combo.sequence.join(', ')} (Grid size: {Math.sqrt(combo.gridSize)}x{Math.sqrt(combo.gridSize)})
        </div>
      ))}
      {selectedCombination && (
        <div className="mt-4 p-2 bg-blue-50 rounded">
          <h3 className="font-bold">Selected Combination</h3>
          <div>
            Sequence: {selectedCombination.sequence.join(', ')}
            <br />
            Grid size: {Math.sqrt(selectedCombination.gridSize)}x{Math.sqrt(selectedCombination.gridSize)}
          </div>
        </div>
      )}
    </div>
  );
}