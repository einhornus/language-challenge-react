import React, {useState} from 'react';
import './LinkifyPage.css';
import LaunguageSelector from "./../common_components/language_selector/LaunguageSelector"
import translate from "./../nlp/translate"
import {linkify} from "./../nlp/linkify"
import "./../common_components/common.css"

const LinkifyPage = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');


    function onLanguageSelect(lang) {
        setTargetLanguage(lang)
    }

    function onNativeLanguageSelect(lang) {
        setNativeLanguage(lang)
    }

    const handleLinkify = () => {
        let text = inputText
        let links = linkify(text)
        setTranslatedText(links)
    };

    return (
        <div className="linkify-page">
            <div className="linkify-page-controls">
                <LaunguageSelector title={"Translate to"} onLanguageSelect={onLanguageSelect} isSorted={true}
                                   isEnglish={true}></LaunguageSelector>
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
                    {linkify(inputText)}
                </div>
            </div>

        </div>
    );
};

export default LinkifyPage;