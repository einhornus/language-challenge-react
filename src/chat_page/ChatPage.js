import React, {useState, useEffect, useRef, useParams} from 'react';
import './ChatPage.css';
import axios from "axios";
import {getChatServerUrl} from "../utils";
import postMessageImage from '../assets/icons/postMessage.svg'
import {useSearchParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState('');
    const lastMessageRef = useRef(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const [isTyping, setIsTyping] = useState(true);
    let timeoutValue = 76000;
    const chatWindowRef = useRef(null);

    const addMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            message,
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isTyping) {
            return
        }

        if (input.trim()) {
            axios.post(getChatServerUrl() + "/post_message", {
                session_id: sessionId,
                message: input
            }, {
                timeout: timeoutValue
            })
                .then(response => {
                    if (response.status === 200) {
                        let messages = response.data["reply_messages"];
                        for (let i = 1; i < messages.length; i++) {
                            addMessage(messages[i]);
                        }
                        //scrollToBottom()
                        setIsTyping(false);
                        console.log(response.data)
                    } else {
                        setIsTyping(false);
                        console.log(response)
                        alert("Unexpected error happened((");
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert("Timeout, no response from the OpenAI server");
                });

            setIsTyping(true);
            addMessage({"role": "user", "text": input, "type": "regular"});
            //scrollToBottom()
            setInput('');
        }
    };

    useEffect(() => {
        axios.get(getChatServerUrl() + "/handshake")
            .then(response => {
                    if (response.status === 200) {
                        console.log('Post request successful', response);
                        let temperature = 0.0
                        let language = "en"
                        let native = "en"
                        let perform_corrections = false;
                        let max_tokens = 100;
                        if (searchParams.has("temperature") !== null) {
                            temperature = searchParams.get("temperature")
                        }
                        if (searchParams.has("language") !== null) {
                            language = searchParams.get("language")
                        }
                        if (searchParams.has("native") !== null) {
                            native = searchParams.get("native")
                        }
                        if (searchParams.has("correct") !== null) {
                            perform_corrections = searchParams.get("correct")
                        }
                        if (searchParams.has("max_tokens") !== null) {
                            max_tokens = searchParams.get("max_tokens")
                        }

                        axios.get(getChatServerUrl() + "/new_session", {
                            params: {
                                bot_name: searchParams.get("bot_name"),
                                language: language,
                                temperature: temperature,
                                native: native,
                                perform_corrections: perform_corrections,
                                max_tokens: max_tokens
                            },
                            timeout: timeoutValue
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    let messages = response.data["initial_messages"];
                                    for (let i = 0; i < messages.length; i++) {
                                        addMessage(messages[i]);
                                    }
                                    console.log(response.data)
                                    setIsTyping(false);
                                    setSessionId(response.data["session_id"]);
                                } else {
                                    setIsTyping(false);
                                    console.log(response)
                                    alert("Unexpected error happened((");
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                alert("Timeout, no response from the OpenAI server((");
                            });
                    } else {
                        setIsTyping(false);
                        alert("The server is down. Please try again later");
                        console.error('Handshake failed', response);
                    }
                }
            );

        addMessage('bot', 'Welcome to the chat!');
        addMessage('bot', 'How can I help you today?');
    }, []); // Empty dependency array ensures the effect runs only on mount


    useEffect(() => {
        console.log("Need scroll")
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);


    const scrollToBottom = () => {
        console.log("SCROLL")
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((message, index) => (
                    <div ref={index === messages.length - 1 ? lastMessageRef : null} key={index}
                         className={`chat-message ${
                             message["role"] === 'user' ? 'user' : 'assistant'
                         } ${message["type"]}`}>
                        <ReactMarkdown
                        >
                            {message["text"]}
                        </ReactMarkdown>
                    </div>
                ))}
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
};

export default ChatPage;