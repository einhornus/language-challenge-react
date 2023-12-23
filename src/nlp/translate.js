import {getSettingsLogin, getSettingsPassword} from "../settings_manager/settings";
import axios from "axios";

import {callGPT4} from "./../gpt4/api.js"
import {
    getSettingsModel,
} from "../settings_manager/settings";
import {detect} from "./detect_language";
import {codeToLanguage} from "./language_utils";

function translate(message, targetLanguage, onPartialResponse, onFullResponse, onError) {
    detect(message, (sourceLanguage) => {
        let messages = [
            {
                "role": "system",
                "content": "Please translate the user message from "+codeToLanguage(sourceLanguage)+" "+
                "to "+codeToLanguage(targetLanguage)+". "+
                "Make the translation sound as natural as possible."
            },
            {
                "role": "user",
                "content": message
            }
        ]
        let model = getSettingsModel();
        callGPT4(model, messages, 0, message.length*2, onFullResponse, onPartialResponse, onError);
    }, onError)
}

export {translate};
