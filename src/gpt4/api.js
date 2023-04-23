import axios from 'axios';

import {Configuration, OpenAIApi} from 'openai';

let resultMap = new Map();


async function callGPT4APIJSStreaming(model, key, messages, temperature, max_tokens, onFullResult, onPartialResult, onError) {
    let hash = 0;

    if(temperature === 0) {
        let argumentsHashString = JSON.stringify(messages);
        argumentsHashString += model;
        argumentsHashString += max_tokens;

        for (let i = 0; i < argumentsHashString.length; i++) {
            hash = ((hash << 5) - hash) + argumentsHashString.charCodeAt(i);
            hash |= 0;
        }

        if(resultMap.has(hash)) {
            onFullResult(resultMap.get(hash));
            return;
        }
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: model,
                messages,
                max_tokens: max_tokens,
                n: 1,
                temperature: temperature,
                stream: true,
            }),
        });

        if (!response.ok) {
            onError(response.status);
            return
        }

        let content = '';

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const {done, value} = await reader.read();

            if (done) {
                break;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    if (line.includes('[DONE]')) {
                        break;
                    }

                    const data = JSON.parse(line.slice(6));

                    if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                        content += data.choices[0].delta.content;
                        onPartialResult(content);
                    }
                }
            }
        }

        onFullResult(content);
        if(temperature === 0) {
            resultMap.set(hash, content);
        }
    } catch (error) {
        onError(error);
    }
}

async function callGPT4APIJS(model, key, messages, temperature, max_tokens, onFullResult, onError) {
    const configuration = new Configuration({
        apiKey: key,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createChatCompletion({
            model: model,
            messages: messages,
            max_tokens: max_tokens,
            n: 1,
            temperature: temperature,
            stream: false
        }, {responseType: 'stream'});

        onFullResult(response.data.choices[0].message.content);
    } catch (error) {
        onError(error);
    }
}

function callGPT4APIWS(model, messages, temperature, max_tokens, onFullResult, onPartialResult, onError) {
    const websocketUrl = 'wss://llm-server.herokuapp.com/';
    //const websocketUrl = "ws://localhost:8080/"

    const websocket = new WebSocket(websocketUrl);

    websocket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
        let obj = {"model": model, "messages": messages, "temperature": temperature, "max_tokens": max_tokens};
        let stringified = JSON.stringify(obj);
        websocket.send(stringified)
    });

    websocket.addEventListener('message', (event) => {
        let obj = JSON.parse(event.data);
        if (obj.type === 'partial') {
            onPartialResult(obj.content);
        }
        if (obj.type === 'full') {
            onFullResult(obj.content);
            websocket.close();
        }
    });

    websocket.addEventListener('close', (event) => {
    });

    websocket.addEventListener('error', (event) => {
        onError(event);
        websocket.close();
    });
}

export {callGPT4APIJS, callGPT4APIJSStreaming, callGPT4APIWS};