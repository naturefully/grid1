import { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, { Background, Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { useGridStore } from '../store/gridStore';
import CustomNode from './CustomNode';
import { GridManager } from '../utils/GridManager';

const nodeTypes = {
  custom: CustomNode,
};

export default function GridFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const { gridSize, sequence, aspectRatio } = useGridStore();
  const [retryCount, setRetryCount] = useState(0);

  const gridManager = useMemo(() => 
    new GridManager(gridSize, 50, aspectRatio), 
    [gridSize, aspectRatio]
  );

  const placeBoxes = useCallback(() => {
    if (!sequence.length) return;

    try {
      const result = gridManager.placeBoxes(sequence, retryCount);
      
      if (result.success) {
        setNodes(result.nodes);
        setRetryCount(0);
      } else if (retryCount < GridManager.MAX_ATTEMPTS) {
        setRetryCount(count => count + 1);
      } else {
        console.warn(result.error);
        setNodes([]);
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Error placing boxes:', error);
      setNodes([]);
      setRetryCount(0);
    }
  }, [gridSize, sequence, setNodes, retryCount, gridManager]);

  useEffect(() => {
    if (sequence.length > 0) {
      placeBoxes();
    }
  }, [sequence, placeBoxes, retryCount]);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}