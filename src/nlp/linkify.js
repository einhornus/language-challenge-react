import {callGPT4} from "./../gpt4/api.js"
import './styles.css';
import {
    getSettingsModel,
} from "../settings_manager/settings";

import {makeLinkifyPrompt} from "./linkify_prompt";
import axios from "axios";
import {tokenize, tokenizeLocal} from "./tokenize";


function getWiktionaryContext(word, language, onSuccess, onFailure) {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/wiktionary?word=${word}&lang=${language}`)
        .then(response => {
            console.log(response.data);
            if (response.data["status"] === "ok") {
                onSuccess(response.data["wiktionary_context"]);
            } else {
                onFailure(response.data["error"])
            }
        })
        .catch(error => {
            onFailure(error)
        });
}

function getArticle(sentence, index, targetLanguage, nativeLanguage, onPartialResponse, onFullResponse, onError) {
    getWiktionaryContext(sentence[index], targetLanguage, (wiktionaryContext) => {
            let model = getSettingsModel();
            prompt = makeLinkifyPrompt(wiktionaryContext, sentence, index, targetLanguage, nativeLanguage)
            callGPT4(model, prompt, 0, 1000, onFullResponse, onPartialResponse, onError);
        }
        , onError)
}

function linkify2(text, tl, nl, clickHandler, onPartialResponse, onFullResponse, onError) {
    const handleClick = (event, woc) => {
        event.preventDefault();
        clickHandler(woc)
    };

    let sentences = tokenizeLocal(text, tl, 'sentence');
    let wordsInContext = []
    for (let i = 0; i < sentences.length; i++) {
        let words = tokenizeLocal(sentences[i], tl, 'word');
        for (let j = 0; j < words.length; j++) {
            let obj = {
                word: words[j],
                sentence: sentences[i],
                transliterated: words[j],
                words: words,
                index: j
            }
            wordsInContext.push(obj)
        }
    }

    const links = wordsInContext.map((word_in_content, index) => (
        word_in_content['word'] === '\n' ?
            <br key={index}/>
            : (
                word_in_content['word'] === ' ' ? (
                    ' '
                ) : (
                    <a
                        key={index}
                        href="#"
                        onClick={(event) => handleClick(event, word_in_content)}
                        className="link"
                    >
                        {word_in_content['word']}
                    </a>
                ))
    ));

    let res = <div style={{fontSize: 20}}>{links}</div>;

    onFullResponse(res)
}


function linkifyMarkdown(text, tl, onResponse, onError) {
    axios.post(process.env.REACT_APP_SERVER_URL + "/linkify", {
        text: text,
        lang: tl,
        format: "html"
    })
        .then((response) => {
            if (response.status === 200) {
                let data = response.data;
                if (data["status"] === "ok") {
                    onResponse(data["linkified"])
                } else {
                    onError(data["error"])
                }
            } else {
                onError(response.status.toString())
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 500) {
                onError("Server error");
            } else {
                // Handle any other errors here
                onError("Unexpected error");
            }
        });
}


export {getArticle, linkify2, linkifyMarkdown};
