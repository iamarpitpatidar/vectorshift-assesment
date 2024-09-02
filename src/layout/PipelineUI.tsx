// PipelineUI.tsx
// Displays the drag-and-drop UI
// --------------------------------------------------

import {useCallback, useRef, useState} from 'react';
import ReactFlow, {
  Background,
  ConnectionLineType, Controls,
  Edge, MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';
import {useStore} from '../store';
import {InputNode} from '../nodes/inputNode';
import {LLMNode} from '../nodes/llmNode';
import {OutputNode} from '../nodes/outputNode';
import {TextNode} from '../nodes/textNode';

import {shallow} from 'zustand/shallow';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

type NodeType = keyof typeof nodeTypes;
interface NodeData {
  id: string;
  nodeType: NodeType;
}
const selector = (state: any) => ({
  nodes: state.nodes as Node[],
  edges: state.edges as Edge[],
  getNodeID: state.getNodeID as (type: NodeType) => string,
  addNode: state.addNode as (node: Node) => void,
  onNodesChange: state.onNodesChange as OnNodesChange,
  onEdgesChange: state.onEdgesChange as OnEdgesChange,
  onConnect: state.onConnect as OnConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID: string, type: NodeType): NodeData => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const dataTransfer = event.dataTransfer.getData('application/reactflow');

      if (dataTransfer) {
        const appData = JSON.parse(dataTransfer);
        const type = appData?.nodeType as NodeType;

        // Check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode: Node = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
