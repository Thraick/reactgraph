// import React, { useState, useCallback } from 'react';
// import ReactFlow, {
//     MiniMap,
//     Controls,
//     Background,
//     useNodesState,
//     useEdgesState,
//     addEdge,
//     ReactFlowProvider,
//     useReactFlow,
//     Panel
// } from 'reactflow';

// import 'reactflow/dist/style.css';
// import AgentNode from './customNode/agent'
// import StatesNode from './customNode/states'
// import { ddata, graphStyle } from './App';
// import MainEdge from './customNode/main_edge';

// export function MainGraph() {
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//     const { setViewport } = useReactFlow();

//     const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//     const onRestore = useCallback(() => {
//         const restoreFlow = async () => {
//             if (ddata) {
//                 let agentItem = {
//                     id: getId(),
//                     type: 'agent',
//                     data: { name: ddata['name'], edges: ddata['states'].length },
//                 }
//                 const agentPosition = onAdd(agentItem, null);
//                 ddata['states'].map((item) => {
//                     let stateItem = {
//                         id: getId(),
//                         type: item['type'],
//                         data: { name: item['name'], edges: item['state_responses'].length },
//                     }
//                     onAdd(stateItem, agentItem.id, agentPosition);
//                 })
//             }
//         }
//         restoreFlow();
//     }, [setNodes, setViewport]);

//     const onAdd = (item, sourceId) => {
//         const position = {
//             x: randomX,
//             y: randomY,
//         };

//         const newNode = {
//             id: item.id,
//             type: item.type,
//             data: item.data,
//             position: {
//                 x: Math.random() * window.innerWidth - 100,
//                 y: Math.random() * window.innerHeight,
//             }
//         }
//         setNodes((nds) => nds.concat(newNode));

//         if (sourceId) {
//             const newEdge = {
//                 id: sourceId + '-' + item.id,
//                 source: sourceId,
//                 target: item.id,
//                 type: 'main',
//                 style: {
//                     stroke: graphStyle[item.type]
//                 }
//             };
//             setEdges((eds) => eds.concat(newEdge));
//         }
//         return position
//     }


//     return (
//         <>
//             <div style={{ width: '100vw', height: '90vh' }}>
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     nodeTypes={nodeTypes}
//                     edgeTypes={edgeTypes}
//                     onInit={onRestore}
//                 >
//                     <Controls />
//                     <MiniMap />
//                     <Background variant="dots" gap={12} size={1} />
//                 </ReactFlow>
//             </div>
//         </>
//     );
// }




// const initialNodes = [
//     {
//         id: '1',
//         type: 'agent',
//         position: { x: 500, y: 20 },
//         data: { name: 'Agent X', edges: '4' },
//     },
//     {
//         id: '2',
//         type: 'state',
//         position: { x: 300, y: 200 },
//         data: { name: 'Greetings', edges: '4' },
//     },
//     {
//         id: '3',
//         type: 'state',
//         position: { x: 700, y: 200 },
//         data: { name: 'Goodbye', edges: '4' },
//     },
//     {
//         id: '4',
//         type: 'state',
//         position: { x: 500, y: 400 },
//         data: { name: 'Faq', edges: '4' },
//     },
// ];


// const nodeTypes = {
//     agent: AgentNode,
//     state: StatesNode
// };

// const edgeTypes = {
//     main: MainEdge,
//     // agent: AgentEdge,
//     // state: StatesEdge
// };


// // const initialEdges = [
// //     { id: 'e1-2', source: '1', target: '2' },
// //     { id: 'e1-3', source: '1', target: '3' }
// // ];


// export default function MainMap() {
//     return (
//         <ReactFlowProvider>
//             <MainGraph />
//         </ReactFlowProvider>
//     )
// }

// function getId() {
//     const uniqueId = new Date().getTime(); // Generate a unique identifier using current timestamp
//     const randomNum = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 100000
//     const randomId = uniqueId + randomNum; // Combine the unique identifier and random number
//     return randomId.toString(); // Convert the randomId to a string

// }