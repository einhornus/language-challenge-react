import axios from 'axios';

import {Configuration, OpenAIApi} from 'openai';
import {getSettingsLogin, getSettingsPassword, getSettingsModel} from "../settings_manager/settings";


async function callGPT4(messages, temperature, max_tokens, onFullResult, onPartialResult, onError) {
    let model = getSettingsModel()

    console.log("Calling GPT4 with model: ", model, " and messages: ")
    console.log(messages)

    let l = getSettingsLogin()
    let p = getSettingsPassword()

    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/chat_completion", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: l,
            password: p,
            model: model,
            messages: JSON.stringify(messages),
            max_tokens: max_tokens,
            temperature: temperature,
        }),
    });

    // If the response is not ok, call the onError callback with the status code and return
    if (!response.ok) {
        onError(response.status);
        return;
    }

    // Initialize an empty string to accumulate content
    let content = '';

    // Get a reader for the response body stream
    const reader = response.body.getReader();
    // Initialize a TextDecoder to decode the response stream
    const decoder = new TextDecoder();

    content = ""
    let isError = false

    for (let qqq = 0; qqq < 10000; qqq++) {
        let stuff = await reader.read();
        let chunk = decoder.decode(stuff.value);

        if (chunk === "{\"status\":\"error\",\"error\":\"Not enough money\"}") {
            onError("Not enough money");
            isError = true
            break;
        }

        if (chunk === "{\"status\":\"error\",\"error\":\"Not enough money\"}") {
        }

        if (chunk === "DONE!!!ERROR!!!") {
            onError("Unexpected error");
            isError = true
            break;
        }

        if (chunk.indexOf("DONE!!!") !== -1) {
            chunk = chunk.replace("DONE!!!", "");
            content += chunk;
            onPartialResult(content);
            break;
        }

        content += chunk;
        onPartialResult(content);
        if (chunk === "ERROR!!!") {
            onError(content);
            break;
        }
    }

    if (!isError) {
        onFullResult(content);
    }
}


export {callGPT4};