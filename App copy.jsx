import React, { useCallback } from 'react';
import MainGraph from './src/graph';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'reactflow';

// import 'reactflow/dist/style.css';

// import initialNodes from './nodes.js';
// import initialEdges from './_edges.js';

export default function App() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
  //   [setEdges]
  // );


  // const onClick = useCallback(() => {
  //   const id = `${++nodeId}`;
  //   const newNode = {
  //     id,
  //     position: {
  //       x: Math.random() * 500,
  //       y: Math.random() * 500,
  //     },
  //     data: {
  //       label: `Node ${id}`,
  //     },
  //   };
  //   reactFlowInstance.addNodes(newNode);
  // }, []);

  return (
    <>
      {/* <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // selectionOnDrag
          // panOnDrag={panOnDrag}

        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div> */}
      <MainGraph />
      


    </>
  );
}



const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' }
];


const initialNodes = [
  {
    id: '1',
    type: 'agent',
    position: { x: 200, y: 20 },
    data: { label: 'agent' },
    style: {
      backgroundColor: '#03340E',
      color: 'white'
    }
  },
  {
    id: '2',
    type: 'states',
    position: { x: 100, y: 100 },
    data: { label: 'states' },
    style: {
      backgroundColor: '#6ede87',
      color: 'white'
    }
  },
  {
    id: '3',
    type: 'state',
    position: { x: 300, y: 100 },
    data: { label: 'states' },
    style: {
      backgroundColor: '#6ede87',
      color: 'white'
    }
  },
  {
    id: '4',
    type: 'state',
    position: { x: 300, y: 200 },
    data: { label: 'state' },
    style: {
      backgroundColor: '#9ED7AB',
      color: 'white'
    }
  },
];