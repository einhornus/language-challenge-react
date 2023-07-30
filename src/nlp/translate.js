import {callGPT4} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import {getSettingsLogin, getSettingsPassword} from "../settings_manager/settings";
import axios from "axios";

function translate(message, sourceLanguage, targetLanguage, onResponse, onError) {
    axios.post(process.env.REACT_APP_SERVER_URL + "/translate", {
        text: message,
        email: getSettingsLogin(),
        password: getSettingsPassword(),
        source_language: sourceLanguage,
        target_language: targetLanguage
    })
        .then((response) => {
            if (response.status === 200) {
                let data = response.data;
                if (data["status"] === "ok") {
                    onResponse(data["translation"])
                } else {
                    onError(data["error"])
                }
            } else {
                onError("Error translating")
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 500) {
                // Handle 500 error here
                onError("Server error");
            } else {
                // Handle any other errors here
                onError("Unexpected error");
            }
        });
}

export {translate};
