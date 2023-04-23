import React, {useState, useEffect, useRef} from 'react';
import './Chat.css';
import postMessageImage from '../..//assets/icons/postMessage.svg';
import {useSearchParams} from "react-router-dom";
import {forwardRef, useImperativeHandle} from 'react';
import Markdown from 'markdown-to-jsx';
import {render} from 'react-dom';

const Chat = forwardRef(({onUserMessage}, ref) => { // Add the onUserMessage prop
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const lastMessageRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const chatWindowRef = useRef(null);
    const [ghostMessage, setGhostMessage] = useState(null);

    const addMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            message,
        ]);
    };

    const cleanMessages = () => {
        setMessages([]);
    };

    // Use the useImperativeHandle hook to expose functions or values to the parent component
    useImperativeHandle(ref, () => ({
        addMessage,
        cleanMessages,
        setGhostMessage,
        getMessages: () => messages,
    }));


    const handleSubmit = (e) => {
        if (isActive) {
            if (input.length > 0) {
                const userMessage = {"role": "user", "content": input, "type": "regular"};
                addMessage(userMessage);
                setInput('');

                if (typeof onUserMessage === 'function') {
                    onUserMessage(userMessage);
                }
            }
        }
        e.preventDefault();
    };

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    // Add a new useEffect hook for ghostMessage updates
    useEffect(() => {
        if (chatWindowRef.current && ghostMessage) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [ghostMessage]);

    return (
        <div className="chat-container">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((message, index) => {
                    const messageClass = `${message.role}${message.type === 'highlighted' ? '-highlighted' : ''}`;
                    return (
                        <div ref={index === messages.length - 1 ? lastMessageRef : null} key={index}
                             className={`chat-message ${messageClass}`}>
                            <Markdown>{message.content}</Markdown>
                        </div>
                    );
                })}
                {ghostMessage && (
                    <div className="chat-message assistant-highlighted">
                        <Markdown>{ghostMessage.content}</Markdown>
                    </div>
                )}
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <img src={postMessageImage} className="post-message-button" width={50} height={50}
                     onClick={handleSubmit}/>
            </form>
        </div>
    );
});

export default Chat;