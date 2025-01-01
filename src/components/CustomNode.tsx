import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

function CustomNode({ data }: NodeProps) {
  return (
    <div
      className="relative bg-white border-2 border-gray-800 rounded-lg shadow-lg opacity-0 animate-fade-in"
      style={{
        width: data.width - 10, // Subtract 10px for gap
        height: data.height - 10, // Subtract 10px for gap
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-700">{data.label}</span>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !opacity-0" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !opacity-0" />
    </div>
  );
}

export default memo(CustomNode);