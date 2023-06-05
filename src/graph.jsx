import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    useReactFlow,
    useUpdateNodeInternals,
    useOnSelectionChange,
    MarkerType
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import AgentNode from './customNode/agent'
import StatesNode from './customNode/states'
import MainEdge from './customNode/main_edge';
import { ddata, graphStyle } from './App';


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));



const nodeWidth = 150;
const nodeHeight = 300;

export function MainGraph() {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [initialData, setInitialData] = useState();
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    const reactFlowInstance = useReactFlow();

    const onRestore = useCallback(() => {
        if (ddata) {
            let id = getId();
            // add agents
            let agentItem = {
                id: id,
                type: 'agent',
                data: { name: ddata['name'], edges: ddata['states'].length, id: id },
            }
            const { "edge": agentEdge, "node": agentNode } = onAdd(agentItem, null);

            //  add states 
            const statedata = ddata['states'].map((item) => {
                let stateItem = {
                    id: getId(),
                    type: item['type'],
                    data: { name: item['name'], edges: item['state_responses'].length },
                }
                const { edge, node } = onAdd(stateItem, agentItem.id);
                return [edge, node]
            })

            // let StateResponse = {
            //     id: getId(),
            //     type: 'StateResponse',
            //     data: { name: ddata['name'], edges: ddata['states'].length },
            // }

            // const { "edge": StateResponseEdge, "node": StateResponseNode } = onAdd(StateResponse, null);



            // process data 
            const edges = statedata.map((e) => {
                return e[0]
            }).filter((f) => { return !!f })
            const nodes = statedata.map((e) => { return e[1] })
            nodes.push(agentNode)

            // get layout position 
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges
            );
            console.log(layoutedNodes)
            console.log(layoutedEdges)
            // set layout position 
            setEdges(layoutedEdges)
            setNodes(layoutedNodes)
            if (!initialData) {
                console.log("this")
                setInitialData({
                    node: layoutedNodes,
                    edge: layoutedEdges
                })
            }
        }
    }, [ddata]);

    const onAdd = (item, sourceId) => {
        let newEdge = null;
        const newNode = {
            id: item.id,
            type: item.type,
            data: item.data,
            position: { x: 0, y: 0 },
            width: getWidth(item.data.name) - 8
        }
        if (sourceId) {
            newEdge = {
                id: sourceId + '-' + item.id,
                source: sourceId,
                target: item.id,

                type: 'main',
                style: {
                    stroke: graphStyle[item.type]
                }
            };
        }
        return { 'edge': newEdge, 'node': newNode }
    }

    const handleNodeClick = (e, data) => {
        let findChildren = edges.filter((edge) => edge.source === data.id)
        if (!findChildren.length) {
            const itemChildren = initialData.node.filter(data =>
                initialData.edge.some(child => child.target === data.id)
            );

            let edgeList = initialData.edge.filter((edge) => edge.source === data.id)

            setEdges([
                ...edges,
                ...edgeList
            ])
            setNodes(nodes.concat(itemChildren))
        } else {
            const newChildren = initialData.node.filter(data =>
                !initialData.edge.some(child => child.target === data.id)
            );
            setNodes([
                ...newChildren
            ])
            setEdges([
                ...edges.filter((item) => data.id !== item.source)
            ])
        }
    }


    return (
        <>
            <div style={{ width: '100vw', height: '90vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodeClick={handleNodeClick}
                    // onDoubleClick={handleNodeClick}
                    onInit={onRestore}
                    fitView
                >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </div>
        </>
    );
}


export default function MainMap() {
    return (
        <ReactFlowProvider>
            <MainGraph />
        </ReactFlowProvider>
    )
}



const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        // const spacingAdjustment = nodeWidth - node.width;
        const adjustedWidth = nodeWidth + node.width;
        // console.log(adjustedWidth)
        // // dagreGraph.setNode(node.id);
        // console.log(node.width) // this is the dynamic width node.width and the default width is nodeWidth = 272; how do i calculate the same width for the node
        // dagreGraph.setNode(node.id, { width: nodeWidth - node.width, height: nodeHeight });
        dagreGraph.setNode(node.id, { width: adjustedWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};




const nodeTypes = {
    agent: AgentNode,
    state: StatesNode
};

const edgeTypes = {
    main: MainEdge,
};


function getId() {
    const uniqueId = new Date().getTime(); // Generate a unique identifier using current timestamp
    const randomNum = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 100000
    const randomId = uniqueId + randomNum; // Combine the unique identifier and random number
    return randomId.toString(); // Convert the randomId to a string
}


const getWidth = (text) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
}

function SelectionChangeLogger() {
    useOnSelectionChange({
        onChange: ({ nodes, edges }) => console.log('changed selection', nodes, edges),
    });

    return null;
}


