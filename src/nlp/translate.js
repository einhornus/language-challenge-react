import {callGPT4} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import {getSettingsDoUseGPT4} from "../settings_manager/settings";

function translate(message, targetLanguage, onPartialResponse, onFullResponse, onError) {
    let doUseGPT4 = getSettingsDoUseGPT4()
    let m = "gpt-3.5-turbo"

    let prompt = [
        {
            "role": "system",
            "content": "You're TranslateGPT.\nYou translate user's text to " + codeToLanguage(targetLanguage) + ".\nYour reply should contain ONLY the translated text, nothing else.\nIf the text contains a profanity word please replace it with *** in the translation."
        },
        {
            "role": "user",
            "content": message
        }
    ]

    if(targetLanguage === "eme"){
        prompt = [
            {
                "role": "system",
                "content": "You are ShakespeareGPT, a Shakespearean translator.\nYou rewrite the text in a style of 17 century English\nPlease apply a very heavy stylization\nFeel free to use the vocabulary found in the KJV Bible\n.Your reply should contain ONLY the translated text, nothing else."
            },
            {
                "role": "user",
                "content": message
            }
        ]
    }

    callGPT4(m, prompt, 0, -1, onFullResponse, onPartialResponse, onError);
}

export default translate;
