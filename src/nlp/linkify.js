import {callGPT4} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import './styles.css';
import {romanize} from "./romanize.js";
import {getSettingsDoUseGPT4, getSettingsLogin, getSettingsPassword} from "../settings_manager/settings";
import {makeLinkifyPrompt} from "./linkify_prompt";
import {translate} from "./translate";
import axios from "axios";
import {tokenize, tokenizeLocal} from "./tokenize";

function getArticle(sentence, index, targetLanguage, nativeLanguage, onPartialResponse, onFullResponse, onError) {
    prompt = makeLinkifyPrompt(sentence, index, targetLanguage, nativeLanguage)
    callGPT4(prompt, 0, 1000, onFullResponse, onPartialResponse, onError);
}

const findAlignmentText = (tokensArray, alignment) => {
    let tokensCount = 0;
    for (let i = 0; i < tokensArray.length; i++) {
        if (tokensArray[i].text !== " ") {
            tokensCount += 1;
        }
    }

    for (let pair of alignment) {
        let pairsFound = 0;
        let leftCount = 0;
        for (let leftToken of pair.left) {
            if (leftToken.text !== " ") {
                leftCount += 1;
            }
        }

        for (let leftToken of pair.left) {
            for (let token of tokensArray) {
                if (leftToken.text === token.text && leftToken.start === token.start && leftToken.end === token.end) {
                    pairsFound += 1
                }
            }
        }
        if (pairsFound === tokensCount && pairsFound === leftCount) {
            return pair.right.map(token => token.text).join(' ');
        }
    }
    return null;
}

const createRubyElements = (tokens, alignment, handleClick) => {
    let jsxElements = [];
    tokens.forEach(tokenArray => {
        let currentTokenIndex = 0
        let sentence = tokenArray.map(t => t.text).join('')

        while (currentTokenIndex < tokenArray.length) {
            if (tokenArray[currentTokenIndex] === undefined) {
                continue
            }

            if (tokenArray[currentTokenIndex].text === "\n") {
                currentTokenIndex += 1
                jsxElements.push(<br/>)
                continue
            }

            if (tokenArray[currentTokenIndex].text === " ") {
                jsxElements.push(" ");
                currentTokenIndex += 1
            } else {
                let found = null
                let foundCount = 0
                let foundTokens = []
                for (let i = 1; i < 5; i++) {
                    let t = tokenArray.slice(currentTokenIndex, currentTokenIndex + i)
                    let alignmentText = findAlignmentText(t, alignment);
                    if (alignmentText) {
                        let stuff = []
                        for (let q = 0; q < t.length; q++) {
                            let wordInContext = {
                                sentence: sentence,
                                word: t[q].text,
                                words: tokenArray.map(t => t.text),
                                index: q + currentTokenIndex,
                            }

                            if (t[q] === undefined || t[q].text === "\n") {
                                stuff.push(<br/>)
                            } else {
                                let elements = <a
                                    href="#"
                                    onClick={(event) => handleClick(event, wordInContext)}
                                    className="link"
                                >
                                    {t[q].text}
                                </a>
                                stuff.push(elements)
                            }
                        }

                        found =
                            <ruby>
                                {stuff}
                                <rt style={{fontSize: "15px"}}>&nbsp;&nbsp;&nbsp;{alignmentText}&nbsp;&nbsp;&nbsp;</rt>
                            </ruby>
                        foundCount = i
                        foundTokens = t
                        break
                    }
                }


                if (!found) {
                    let wordInContext = {
                        sentence: sentence,
                        word: tokenArray[currentTokenIndex].text,
                        words: tokenArray.map(t => t.text),
                        index: currentTokenIndex,
                    }

                    let element = <a
                        href="#"
                        onClick={(event) => handleClick(event, wordInContext)}
                        className="link"
                    >
                        {tokenArray[currentTokenIndex].text}
                    </a>

                    if (tokenArray[currentTokenIndex] === undefined || tokenArray[currentTokenIndex].text === "\n") {
                        jsxElements.push(<br/>)
                    } else {
                        jsxElements.push(element);
                    }
                    currentTokenIndex += 1
                } else {
                    jsxElements.push(found)
                    currentTokenIndex += foundCount
                }
            }
        }
    });

    return <p style={{fontSize: "24px"}}>{jsxElements}</p>;
};

function linkify(text, tl, nl, clickHandler, onPartialResponse, onFullResponse, onError) {
    const handleClick = (event, woc) => {
        event.preventDefault();
        clickHandler(woc)
    };

    tokenize(text,
        (tokens) => {
            onPartialResponse(
                <div>
                    <p>{text}</p>
                    <p>Translating...</p>
                </div>
            )

            translate(text, tl, nl,
                (res) => {
                    onPartialResponse(
                        <div>
                            <p>{text}</p>
                            <p>{res}</p>
                            <p>Aligning...</p>
                        </div>
                    )

                    console.log("Translation", res)

                    axios.post(process.env.REACT_APP_SERVER_URL + "/align", {
                        email: getSettingsLogin(),
                        password: getSettingsPassword(),
                        text: text,
                        translation: res
                    }).then((response) => {
                        if (response.status === 200) {
                            let data = response.data
                            if (data["status"] === "ok") {
                                console.log("Alignment", data["alignment"])
                                console.log("Tokens", tokens)
                                onFullResponse(
                                    createRubyElements(tokens, data["alignment"], handleClick)
                                )
                            } else {
                                onError(data["error"])
                            }
                        } else {
                            onError("Error aligning")
                        }
                    }).catch((error) => {
                        onError("Error aligning")
                    })
                },
                (res) => {
                    onError("Error translating")
                }
            )
        },
        onError("Error tokenizing")
    )
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
        let romanized = romanize(words, tl)
        for (let j = 0; j < words.length; j++) {
            let obj = {
                word: words[j],
                sentence: sentences[i],
                transliterated: romanized[j],
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
        format: "markdown"
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


export {getArticle, linkify, linkify2, linkifyMarkdown};
