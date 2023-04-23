import React, {useState} from 'react';
import './TranslationPage.css';
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import translate from "./../nlp/translate"
import "./../common_components/common.css"
import {setSettingsTargetLanguage, getSettingsTargetLanguage} from "./../settings_manager/settings.js"

const TranslationPage = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');

    function onLanguageSelect(lang) {
        setTargetLanguage(lang)
        setSettingsTargetLanguage(lang)
    }

    const handleTranslate = () => {
        setTranslatedText('')
        translate(inputText, targetLanguage,
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
                <LanguageSelector title={"Translate to"} onLanguageSelect={onLanguageSelect} isSorted={true}
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
                        readOnly
                        placeholder="Translation will appear here"
                    />
                </div>
            </div>

        </div>
    );
};

export default TranslationPage;