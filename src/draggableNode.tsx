import { DragEvent } from "react";

interface NodeProps {
  type: string
  label: string
}
export const DraggableNode = ({ type, label }: NodeProps) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };

    const target = event.target as HTMLDivElement;

    target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event: DragEvent<HTMLDivElement>) => ((event.target as HTMLDivElement).style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#1C2536',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      draggable
    >
        <span style={{ color: '#fff' }}>{label}</span>
    </div>
  );
}
