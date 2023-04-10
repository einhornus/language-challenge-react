import React, {useState} from 'react';
import './TranslationPage.css';
import LaunguageSelector from "./../common_components/language_selector/LaunguageSelector"
import translate from "./../nlp/translate"
import {tokenize} from "../nlp/linkify"
import "./../common_components/common.css"


const TranslationPage = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');


    console.log(tokenize("我是一只小猫咪，很高兴认识你", "zh"))

    function onLanguageSelect(lang){
        setTargetLanguage(lang)
    }

    const handleTranslate = () => {
        setTranslatedText('')
        let key = "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"
        translate(key, "gpt-4", inputText, targetLanguage,
            function (translation) {
                setTranslatedText(translation)
            },
            function (translation) {
                setTranslatedText(translation)
            },
            function (error) {
                setTranslatedText("ERROR: ", error)
            }
        )
    };

    return (
        <div className="translation-page">
            <div className="translation-page-controls">
                <button onClick={handleTranslate}>Translate</button>
                <LaunguageSelector title={"Translate to"} onLanguageSelect={onLanguageSelect} isSorted={true} isEnglish={true}></LaunguageSelector>
            </div>

            <div className="translation-page-container">
                <div className="translation-page-input">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter the text to translate"
                    />
                </div>
                <div className="translation-page-output">
                    <textarea
                        value={translatedText}
                        readOnly
                        placeholder="Translation will appear here"
                    />
                </div>
            </div>

        </div>
    );
};

export default TranslationPage;