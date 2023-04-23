import React, {useState, useRef} from 'react';
import './LinkifyPage.css';
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import Selector from "../common_components/selectors/Selector"
import translate from "./../nlp/translate"
import {linkify, getArticle} from "./../nlp/linkify"
import "./../common_components/common.css"
import Chat from "./../common_components/chat/Chat.js"
import {
    setSettingsTargetLanguage,
    getSettingsTargetLanguage,
    getSettingsNativeLanguage,
    setSettingsNativeLanguage,
    getSettingsTransliterationPolicy,
    setSettingsTransliterationPolicy,
    setSettingsDoProvideGrammarExplanations,
    getSettingsDoProvideGrammarExplanations
} from "./../settings_manager/settings.js"

const LinkifyPage = () => {
    const [inputText, setInputText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState(getSettingsTargetLanguage());
    const [nativeLanguage, setNativeLanguage] = useState(getSettingsNativeLanguage());
    const [transliterationPolicy, setTransliterationPolicy] = useState(getSettingsTransliterationPolicy());
    const [doGrammarExplanations, setDoGrammarExplanations] = useState(getSettingsDoProvideGrammarExplanations());
    const [linkifiedText, setLinkifiedText] = useState(<p></p>);
    const chatRef = useRef(null);

    function onTargetLanguageSelect(lang) {
        setTargetLanguage(lang);
        console.log("Target language: " + lang)
        setSettingsTargetLanguage(lang);
    }

    function onNativeLanguageSelect(lang) {
        setNativeLanguage(lang)
        console.log("Native language: " + lang)
        setSettingsNativeLanguage(lang)
    }

    function onTransliterationPolicySelect(o) {
        setTransliterationPolicy(o)
        handleLinkify()
        setSettingsTransliterationPolicy(o)
    }

    function onExplainGrammarPolicySelect(policy) {
        setDoGrammarExplanations(policy)
        setSettingsDoProvideGrammarExplanations(policy)
    }

    function explainWord(woc) {
        if (chatRef.current.ghostMessage !== undefined) {
            return;
        }

        let header = "Explaining the word **" + woc["word"] + "** in the sentence\n" + woc["sentence"] + "\n"

        chatRef.current.cleanMessages();

        getArticle(woc["words"], woc["index"], targetLanguage, nativeLanguage, (res) => {
                chatRef.current.setGhostMessage({
                    "role": "assistant",
                    "content": header + res
                })
            },
            (res) => {
                chatRef.current.setGhostMessage(null);
                chatRef.current.addMessage({
                    "role": "assistant",
                    "content": header + res
                })
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
        let text = inputText
        linkify(text, targetLanguage, nativeLanguage, transliterationPolicy, doGrammarExplanations,
            (res) => setLinkifiedText(res),
            (res) => setLinkifiedText(res),
            (err) => console.log(err),
            explainWord
        )
    };

    const transliterationSelectorContent = [
        {value: "no", title: "Don't apply"},
        {value: "replace", title: "Replace"},
        {value: "top", title: "Put on top"},
    ]

    const explainGrammarSelectorContent = [
        {value: "yes", title: "Yes"},
        {value: "no", title: "No"},
    ]

    function handleUserChatMessage() {
        console.log("User sent message", arguments)
    }


    return (
        <div className="linkify-page">
            <div className="linkify-page-controls">
                <button onClick={handleLinkify}>Linkify</button>
                <LanguageSelector title={"Target language"} onLanguageSelect={onTargetLanguageSelect} isSorted={true}
                                  isEnglish={true} defaultLanguage={targetLanguage}></LanguageSelector>

                <LanguageSelector title={"Native language"} onLanguageSelect={onNativeLanguageSelect} isSorted={true}
                                  isEnglish={true} defaultLanguage={nativeLanguage}></LanguageSelector>
                <Selector title={'Transliteration'} onSelect={onTransliterationPolicySelect}
                          options={transliterationSelectorContent} defaultValue={transliterationPolicy}></Selector>
                <Selector title={'Explain grammar'} onSelect={onExplainGrammarPolicySelect}
                          options={explainGrammarSelectorContent} defaultValue={doGrammarExplanations}></Selector>
            </div>

            <div className="linkify-page-container">
                <div className="linkify-page-input">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter the text to translate"
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
};

export default LinkifyPage;