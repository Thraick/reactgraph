import React from 'react';
import 'reactflow/dist/style.css';
import MainMap from './graph';
import LayoutFlow from './dd';
import { Routes, Route, useNavigate } from 'react-router-dom';

import CreateNode from './createNode';

export default function App() {


    return (<>

        <MainMap />

        <Routes>
            <Route path="/info" element={<Info />} />
        </Routes>
        <CreateNode />
    </>
    );
}




export const ddata = {
    "published": true,
    "name": "Base Agent",
    "description": "Base agent image",
    "intent_confidence": 0.35,
    "entity_confidence": 0.2,
    "sentiment_confidence": 0.1,
    "response_confidence": 0.1,
    "states": [
        {
            "type": "state",
            "name": "greet",
            "published": true,
            "prompts": ["Hi", "Hello", "Hiya", "Good day"],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "Hello, how may I help you?"
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "Hi there! I'm the JIVAS AI and I'd be happy to answer any questions that you may have..."
                }
            ]
        },
        {
            "type": "state",
            "name": "what_is_your_name",
            "published": true,
            "prompts": ["Who are you?", "What is your name?", "Tell me about yourself"],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "Hello, I'm powered by AI."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "I'm the JIVAS AI"
                }
            ]
        },
        {
            "type": "state",
            "name": "how_are_you",
            "published": true,
            "prompts": ["How are you?"],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "I'm great, hope you are too."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "Hi there! I'm fine. Thanks for asking."
                }
            ]
        },
        {
            "type": "state",
            "name": "flattered",
            "published": true,
            "prompts": ["That's awesome", "You're gorgeous", "This is cool", "Amazing"],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "I'm glad you approve."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "Why, thank you."
                }
            ]
        },
        {
            "type": "state",
            "name": "goodbye",
            "published": true,
            "prompts": ["Bye", "Talk to you later", "Goodbye", "See you later, have a great day!"],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "It was nice chatting with you."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "See you later, it was nice talking to you."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "It was great talking to you. If you need any more information, you know where to find me. I'm available 24/7."
                }
            ]
        },
        {
            "type": "state",
            "name": "confused",
            "published": true,
            "prompts": [],
            "replies": [],
            "state_responses": [
                {
                    "type": "response",
                    "published": true,
                    "text": "Hmm.. I'm not sure I can help with that one"
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "I'm sorry, I'm not sure."
                },
                {
                    "type": "response",
                    "published": true,
                    "text": "Hmmm. I'm not sure how to respond to that."
                }
            ]
        }
    ]
}




export const graphStyle = {
    agent: '#930D0D',
    agentBg: '#930D0DC4',
    state: '#4E0D93',
    stateBg: '#4E0D93C4',

}

function Home() {
    return <h2>Home</h2>;
}

function Info() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">Hello</h1>
            </div>
        </div>
    );
}