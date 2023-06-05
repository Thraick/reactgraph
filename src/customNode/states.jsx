import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function StatesNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-stateBg border-2 border-state flex flex-col items-center justify-center" style={{ minWidth: '120px' }}>
      <div className="text-xs">State</div>
      <div className="text-lg font-bold text-center capitalize">{data.name.replace(/_/g, " ")}</div>
      <div className="text-xs text-white-900">{data.edges}</div>
      <Handle type="target" position={Position.Top} className="w-16 h-16 rounded-full bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 h-16 rounded-full bg-teal-500" />
    </div>


  );
}

export default memo(StatesNode);
