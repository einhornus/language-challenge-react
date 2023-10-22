import React, {useState, useRef, useEffect} from 'react';
import './LinkifyPage.css';
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import Selector from "../common_components/selectors/Selector"
import translate from "./../nlp/translate"
import {linkify, getArticle, linkify2, linkifyMarkdown} from "./../nlp/linkify"
import "./../common_components/common.css"
import Chat from "./../common_components/chat/Chat.js"
import {useLocation} from 'react-router-dom'; // import useLocation hook

import {
    setSettingsTargetLanguage,
    getSettingsTargetLanguage,
    getSettingsNativeLanguage,
    setSettingsNativeLanguage,
    getSettingsTransliterationPolicy,
    setSettingsTransliterationPolicy,
    setSettingsDoProvideGrammarExplanations,
    getSettingsDoProvideGrammarExplanations,
    getSettingsLogin,
    getSettingsPassword,
    getSettingsSignedUp,
    getSettingsDoUseGPT4, setSettingsDoUseGPT4, getSettingsModel
} from "./../settings_manager/settings.js"

import {getBalance} from "../auth/SignInPage";
import {codeToLanguage} from "../nlp/language_utils";
import {callGPT4} from "../gpt4/api";


const LinkifyPage = () => {
    const [doGrammarExplanations, setDoGrammarExplanations] = useState(getSettingsDoProvideGrammarExplanations());
    const [linkifiedText, setLinkifiedText] = useState(<p></p>);
    const chatRef = useRef(null);
    const [discussedWord, setDiscussedWord] = useState('');
    const [article, setArticle] = useState('');
    const [balance, setBalance] = useState(0);
    const useGPT4Ref = useRef(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isSimplified = searchParams.get("simplified") === "1"
    const startingInput = searchParams.get("text") ? searchParams.get("text") : ""
    const [inputText, setInputText] = useState(startingInput);


    useEffect(() => {
        getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
            setBalance(balance);
        }, (error) => {
            if (getSettingsSignedUp()) {
                window.location.assign("/sign_in?from=correct");
            } else {
                window.location.assign("/?from=correct");
            }
        });

        if (isSimplified) {
            const words = searchParams.get("words") ? searchParams.get("words").split("~") : []
            const index = searchParams.get("index") ? parseInt(searchParams.get("index")) : 0
            const word = words[index]
            const woc = {"word": word, "index": index, "words": words}
            explainWord(woc)
        }
    }, []);

    let useGPT4Options = [
        {value: "yes", title: "Yes"},
        {value: "no", title: "No"},
    ]

    function onTargetLanguageSelect(lang) {
        console.log("Target language: " + lang)
        setSettingsTargetLanguage(lang);
    }

    function onNativeLanguageSelect(lang) {
        console.log("Native language: " + lang)
        setSettingsNativeLanguage(lang)
    }

    function onUseGPT4Select(val) {
        setSettingsDoUseGPT4(val)
    }

    function onExplainGrammarPolicySelect(policy) {
        console.log("Explain grammar policy: " + policy)
        setDoGrammarExplanations(policy)
        setSettingsDoProvideGrammarExplanations(policy)
    }

    function explainWord(woc) {
        if (chatRef.current.ghostMessage !== null) {
            return
        }

        let header = "Word: **" + woc["word"] + "** \n\n"
        header += "\n\n"
        let tl = getSettingsTargetLanguage()
        let nl = getSettingsNativeLanguage()
        chatRef.current.cleanMessages();

        getArticle(woc["words"], woc["index"], tl, nl, (res) => {
                let new_res = res.replaceAll("[", "").replaceAll("]", "").replaceAll(" - ", " — ")
                chatRef.current.setGhostMessage({
                    "role": "assistant",
                    "content": header + new_res
                })
            },
            (res) => {
                setArticle(res)
                linkifyMarkdown(res, getSettingsTargetLanguage(), (res) => {
                        chatRef.current.setGhostMessage(null);
                        chatRef.current.addMessage({
                            "role": "assistant",
                            "content": header + res
                        })
                        setDiscussedWord(woc["word"])

                        getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                            setBalance(balance);
                        }, (error) => {
                            alert(error);
                        });
                    }, (err) => {
                        chatRef.current.setGhostMessage(null);
                        chatRef.current.addMessage({
                            "role": "assistant",
                            "content": header + res
                        })
                    }
                )

                setDiscussedWord(woc["word"])
            },
            (err) => {
                chatRef.current.addMessage({
                    "role": "assistant",
                    "content": "Error: " + err
                })
            }
        )

        chatRef.current.setGhostMessage({
            "role": "assistant",
            "content": header
        })
    }

    const handleLinkify = () => {
        console.log("Grammar:", getSettingsDoProvideGrammarExplanations())

        if (getSettingsDoProvideGrammarExplanations() === "no") {
            linkify2(inputText, getSettingsTargetLanguage(), getSettingsNativeLanguage(),
                explainWord,
                (res) => {
                    setLinkifiedText(res)
                },
                (res) => {
                    setLinkifiedText(res)
                    getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                        setBalance(balance);
                    }, (error) => {
                        alert(error);
                    });
                },
                (err) => setLinkifiedText("Error: " + err),
            )
        } else {
            linkify(inputText, getSettingsTargetLanguage(), getSettingsNativeLanguage(),
                explainWord,
                (res) => {
                    setLinkifiedText(res)
                },
                (res) => {
                    setLinkifiedText(res)
                    getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                        setBalance(balance);
                    }, (error) => {
                        alert(error);
                    });
                },
                (err) => setLinkifiedText("Error: " + err),
            )
        }
    };

    const explainGrammarSelectorContent = [
        {value: "yes", title: "Yes"},
        {value: "no", title: "No"},
    ]

    function handleUserChatMessage() {
        if (arguments[0].content === "/reset") {
            chatRef.current.cleanMessages();
            setDiscussedWord('')
            setArticle('')
            return
        }

        let genIndex = arguments[0].content.indexOf("/gen")
        if (genIndex !== -1) {
            let description = arguments[0].content.substring(genIndex + 4).trim()
            if (description === "") {
                description = "a text"
            }
            prompt = [
                {
                    "role": "system",
                    "content": "You are an extremely creative " + codeToLanguage(getSettingsTargetLanguage()) + " writer"
                },
                {
                    "role": "user",
                    "content": "Please write " + description + " in " + codeToLanguage(getSettingsTargetLanguage()) + ". Show only the result, without any additional information."
                }
            ]

            callGPT4(getSettingsModel(), prompt, 1, 1000, (res) => {
                    setInputText(res)
                    getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                        setBalance(balance);
                    }, (error) => {
                        alert(error);
                    });
                }, (res) => {
                    setInputText(res)
                },
                (err) => {
                    setInputText(err)
                })
            return
        }

        prompt = []

        let messages = chatRef.current.getMessages();
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].content.indexOf("/gen") !== 0) {
                if (i === 0 && messages[i].content.indexOf("<strong>") !== -1) {
                    prompt.push({
                        "role": messages[i].role,
                        "content": article
                    })
                }
            }
        }

        if (discussedWord === '') {
            prompt.push({
                "role": "system",
                "content": "You are the most professional " + codeToLanguage(getSettingsTargetLanguage()) + " language tutor.\n" +
                    "Please only tell the information you know for sure, and do not guess.\n" +
                    "If you don't know the answer, please say 'I don't know'.\n" +
                    "Your student prefers to speak in " + codeToLanguage(getSettingsNativeLanguage()) + ".\n" +
                    "Please always enclose " + codeToLanguage(getSettingsTargetLanguage()) + " words, phrases and sentences in square brackets: [word/phrase/sentence]\n"
            })
        } else {
            prompt.push({
                "role": "system",
                "content": "You are the most professional " + codeToLanguage(getSettingsTargetLanguage()) + " language tutor.\n" +
                    "You are discussing the word **" + discussedWord + "** with your student.\n" +
                    "Please only tell the information you know for sure, and do not guess.\n" +
                    "If you don't know the answer, please say 'I don't know'.\n" +
                    "Please always enclose " + codeToLanguage(getSettingsTargetLanguage()) + " words, phrases and sentences in square brackets: [word/phrase/sentence]\n"
            })
        }

        prompt.push({
            "role": "user",
            "content": arguments[0].content
        })

        callGPT4(getSettingsModel(), prompt, 0, 1000, (res) => {
                linkifyMarkdown(res, getSettingsTargetLanguage(), (res) => {
                        chatRef.current.setGhostMessage(null);
                        chatRef.current.addMessage({
                            "role": "assistant",
                            "content": res
                        })

                        getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                            setBalance(balance);
                        }, (error) => {
                            alert(error);
                        });
                    }, (err) => {
                        chatRef.current.setGhostMessage(null);
                        chatRef.current.addMessage({
                            "role": "assistant",
                            "content": res
                        })
                    }
                )
            }, (res) => {
                chatRef.current.setGhostMessage({
                    "role": "assistant",
                    "content": res.replaceAll("[", "").replaceAll("]", "").replaceAll(" - ", " — ")
                })
            },
            (err) => {
                chatRef.current.addMessage({
                    "role": "assistant",
                    "content": "Error: " + err
                })
            })
    }


    if (!isSimplified) {
        return (
            <div className="linkify-page">
                <div className="linkify-page-controls">
                    <button onClick={handleLinkify}>Linkify</button>
                    <LanguageSelector title={"Target language"} onLanguageSelect={onTargetLanguageSelect}
                                      isSorted={true}
                                      isEnglish={true} defaultLanguage={getSettingsTargetLanguage()}></LanguageSelector>

                    <LanguageSelector title={"Native language"} onLanguageSelect={onNativeLanguageSelect}
                                      isSorted={true}
                                      isEnglish={true} defaultLanguage={getSettingsNativeLanguage()}></LanguageSelector>

                    <Selector ref={useGPT4Ref} title={"Use GPT-4"} onSelect={onUseGPT4Select}
                              options={useGPT4Options}
                              defaultValue={getSettingsDoUseGPT4()}></Selector>

                    <Selector title={'Explain grammar'} onSelect={onExplainGrammarPolicySelect}
                              options={explainGrammarSelectorContent}
                              defaultValue={getSettingsDoProvideGrammarExplanations()}></Selector>

                    <div>
                        {getSettingsLogin()}<br></br>{balance}💰
                    </div>
                </div>

                <div className="linkify-page-container">
                    <div className="linkify-page-input">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter the text to linkify"
                    />
                    </div>
                    <div className="linkify-page-output">
                        {linkifiedText}
                    </div>
                    <div className="linkify-page-chat">
                        <Chat ref={chatRef} onUserMessage={handleUserChatMessage}></Chat>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="linkify-page">
                <div className="linkify-page-controls">
                    <div>
                        {getSettingsLogin()}<br></br>{balance}💰
                    </div>
                </div>

                <div className="linkify-page-container">
                    <div className="linkify-page-chat">
                        <Chat ref={chatRef} onUserMessage={handleUserChatMessage}></Chat>
                    </div>
                </div>
            </div>
        );
    }
};

export default LinkifyPage;