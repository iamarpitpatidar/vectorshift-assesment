import React from 'react';
import { Handle, Position } from 'reactflow';

interface LLMNodeProps {
  id: string;
  data: any; // Adjust the type of data as needed based on the specific structure you use
}

export const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <div>
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
};
