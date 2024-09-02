import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface TextNodeProps {
  id: string;
  data: {
    text?: string;
  };
}

export const TextNode: React.FC<TextNodeProps> = ({ id, data }) => {
  const [currText, setCurrText] = useState<string>(data?.text || '{{input}}');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
