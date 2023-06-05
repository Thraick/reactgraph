import React, { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import CreateNode from '../createNode'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
 // Import the Modal component from react-modal

function AgentNode({ data }) {
  const navigateTo = useNavigate();


  const handleDoubleClick = () => {
    navigateTo('/info');


  };


  return (
    <div
      onDoubleClick={handleDoubleClick}

      className="px-4 py-2 shadow-md rounded-full bg-agentBg border-2 border-agent flex flex-col items-center justify-center">
      <div className="text-xs ">Agent</div>
      {/* <div className="text-lg font-bold text-center capitalize">{data.name}</div> */}
      <div className="text-lg font-bold text-center capitalize">{data.name.replace(/_/g, " ")}</div>
      <div className="text-xs text-white-900">{data.edges}</div>
      <Handle type="source" position={Position.Bottom} className="w-16 h-16 rounded-full" />
    </div>

  );
}

export default memo(AgentNode);

