import React, {useState} from 'react';
import './TranslationPage.css';
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import {translate} from "./../nlp/translate"
import "./../common_components/common.css"
import {setSettingsTargetLanguage, getSettingsTargetLanguage} from "./../settings_manager/settings.js"




const TranslationPage = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    function onLanguageSelect(lang) {
        console.log("Target language: " + lang)
        setSettingsTargetLanguage(lang);
    }

    const handleTranslate = () => {
        setTranslatedText('')
        translate(inputText, getSettingsTargetLanguage(),
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

    const handleAlign = () => {
        setTranslatedText('')
        translate(inputText, getSettingsTargetLanguage(),
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
                <button onClick={handleAlign}>Create LangConnect .html</button>
                <LanguageSelector title={"Translate to"} onLanguageSelect={onLanguageSelect}
                                  isSorted={true}
                                  isEnglish={true} defaultLanguage={getSettingsTargetLanguage()}></LanguageSelector>
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
                        onChange={(e) => setTranslatedText(e.target.value)}
                        placeholder="Translation will appear here"
                    />
                </div>
            </div>

        </div>
    );
};

export default TranslationPage;