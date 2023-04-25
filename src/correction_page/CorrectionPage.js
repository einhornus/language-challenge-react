import React, {useRef, useState} from 'react';
import './CorrectionPage.css';
import Selector from "../common_components/selectors/Selector"
import correct from "../nlp/correct.js"
import "./../common_components/common.css"
import Markdown from 'markdown-to-jsx';
import {codeToLanguage} from "../nlp/language_utils";
import proofreadingPng from "./proofreading.png"
import settingsPng from "./settings.png"

import {
    setSettingsCorrectLanguage,
    setSettingsDoUseGPT4,
    getSettingsDoUseGPT4,
    getSettingsCorrectLanguage,
    getSettingsCorrectionType,
    setSettingsCorrectionType, getSettingsKey
} from "./../settings_manager/settings.js"
import {detect} from "../nlp/detect_language";
import LanguageSelector from "../common_components/selectors/LanguageSelector";

const CorrectionPage = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const correctionTypeRef = useRef(null);
    const useGPT4Ref = useRef(null);
    const languageRef = useRef(null);

    function onCorrectionTypeSelect(val) {
        setSettingsCorrectionType(val)
    }

    function onUseGPT4Select(val) {
        setSettingsDoUseGPT4(val)
    }

    function onTargetLanguageSelect(val) {
        console.log("Switched to language: ", val)
        setSettingsCorrectLanguage(val)
    }

    const handleGoToSettings = () => {
        let currentUrl = window.location.href;
        let newUrl = currentUrl.replace("correct", "settings");
        //go to the new url
        window.open(newUrl, "_blank")
    };


    const handleCorrect = () => {
        if(getSettingsKey() === ""){
            alert("Your OpenAI API key is not set. Please configure it on the settings page that has just opened")
            handleGoToSettings()
        }

        setOutputText('')

        console.log("Correcting text: ", inputText)
        console.log(languageRef.current.getValue())
        console.log(correctionTypeRef.current.getValue())
        console.log(useGPT4Ref.current.getValue())


        let languageCode = languageRef.current.getValue()
        if (languageRef.current.getValue() === "auto") {
            languageCode = detect(inputText)
            let text = "**" + codeToLanguage(languageCode) + "** detected";
            setOutputText(<Markdown>{text}</Markdown>)
        }

        correct(inputText, correctionTypeRef.current.getValue(), useGPT4Ref.current.getValue() === "yes", languageCode,
            function (translation) {
                setOutputText(translation)
            },
            function (translation) {
                setOutputText(translation)
            },
            function (error) {
                setOutputText("Error: " + error)
            }
        )
    };

    let correctionTypeOptions = [
        {value: "grammar", title: "Just correct grammar"},
        {value: "natural", title: "Make more natural"},
    ]

    let useGPT4Options = [
        {value: "yes", title: "Yes"},
        {value: "no", title: "No"},
    ]

    console.log(getSettingsCorrectLanguage())

    return (
        <div className="correction-page">
            <div className="correction-page-controls">
                <img className={"cursor-pointer"} src={proofreadingPng} width={80} height={80} onClick={handleCorrect}/>
                <LanguageSelector title={"Language"} defaultLanguage={getSettingsCorrectLanguage()} addAutoValue={true}
                                  onLanguageSelect={onTargetLanguageSelect} isSorted={true} isEnglish={true}
                                  ref={languageRef}/>
                <Selector ref={useGPT4Ref} title={"Use GPT-4"} onSelect={onUseGPT4Select}
                          options={useGPT4Options}
                          defaultValue={getSettingsDoUseGPT4()}></Selector>
                <Selector ref={correctionTypeRef} title={"Correction type"} onSelect={onCorrectionTypeSelect}
                          options={correctionTypeOptions}
                          defaultValue={getSettingsCorrectionType()}></Selector>
                <img className={"cursor-pointer"} src={settingsPng} width={30} height={30} onClick={handleGoToSettings}/>
            </div>

            <div className="correction-page-container">
                <div className="correction-page-input">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter the text to correct"
                    />
                </div>
                <div className="correction-page-output">
                    {outputText}
                </div>
            </div>
        </div>
    );
};

export default CorrectionPage;