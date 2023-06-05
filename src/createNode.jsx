import { ddata, graphStyle } from "./App";



export default function CreateNode() {
    createData(ddata)
    
    return (
        <div>create</div>
    );
}


function createData(data){
    if (data){
        // console.log(data)
        let edges = [];
        let nodes = [];

        // agent 
        let agentData = {
            id: getId(),
            type: 'agent',
            data: { 
                edges: data['states'].length, 
                name: data['name'], 
                published: data['published'],
                description: data['description'],
                intent_confidence: data['intent_confidence'],
                entity_confidence: data['entity_confidence'],
                sentiment_confidence: data['sentiment_confidence'],
                response_confidence: data['response_confidence']
            },
        }
        const { "edge": agentEdge, "node": agentNode } = onAdd(agentData, null);
        nodes = [agentNode]
        // state 
        const statedata = ddata['states'].map((item) => {

            let stateItem = {
                id: getId(),
                type: item['type'],
                data: { 
                    edges: item['state_responses'].length,
                    name: item['name'], 
                    type: item['type'],
                    published: item['published']
                },
            }
            const { edge, node } = onAdd(stateItem, agentData.id);

            edges = [...edges, edge];
            nodes = [...nodes, node];
        })


        
        console.log("nodessss");
        console.log(nodes);
        console.log(edges);

    }
}


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
