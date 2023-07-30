import React, {useRef, useState, useEffect} from 'react';
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
    setSettingsCorrectionType, getSettingsLogin, getSettingsPassword,
    getSettingsSignedUp
} from "./../settings_manager/settings.js"
import {getBalance} from "../auth/SignInPage";
import {detect} from "../nlp/detect_language";
import LanguageSelector from "../common_components/selectors/LanguageSelector";

const CorrectionPage = () => {
    const [inputText, setInputText] = useState('');
    const [balance, setBalance] = useState(0);
    const [outputText, setOutputText] = useState('');
    const correctionTypeRef = useRef(null);
    const useGPT4Ref = useRef(null);
    const languageRef = useRef(null);


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
    }, []);


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
        window.open(newUrl, "_blank")
    };

    function performCorrection(languageCode){
        correct(inputText, correctionTypeRef.current.getValue(), useGPT4Ref.current.getValue() === "yes", languageCode,
            function (translation) {
                setOutputText(translation)
            },
            function (translation) {
                setOutputText(translation)

                getBalance(getSettingsLogin(), getSettingsPassword(), (balance) => {
                    setBalance(balance);
                }, (error) => {
                    alert(error);
                });
            },
            function (error) {
                setOutputText("Error: " + error)
            }
        )
    }

    const handleCorrect = () => {
        setOutputText('')
        let languageCode = languageRef.current.getValue()
        if (languageRef.current.getValue() === "auto") {
            detect(inputText, (languageCode) => {
                let text = "**" + codeToLanguage(languageCode) + "** detected";
                setOutputText(<Markdown>{text}</Markdown>)
                performCorrection(languageCode)
            }, (error) => {
                setOutputText("Detecting rrror: " + error)
            })
        }
        else{
            performCorrection(languageCode)
        }
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

                <div>
                    {getSettingsLogin()}<br></br>{balance}💰
                </div>
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