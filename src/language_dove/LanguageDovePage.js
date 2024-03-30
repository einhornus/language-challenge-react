import React, {useRef, useState} from 'react';
import './LanguageDovePage.css';
import {
    getSettingsLanguageDoveAlignment,
    getSettingsLanguageDoveDictionary,
    getSettingsLanguageDoveTTS,
    getSettingsNativeLanguage,
    getSettingsTargetLanguage,
    getSettingsLanguageDoveGenTextDifficulty,
    getSettingsLanguageDoveGenTextLength,
    getSettingsLanguageDoveGenTextTopic,
    getSettingsLanguageDoveIPA,
    setSettingsLanguageDoveAlignment,
    setSettingsLanguageDoveDictionary,
    setSettingsLanguageDoveTTS,
    setSettingsNativeLanguage,
    setSettingsTargetLanguage,
    setSettingsLanguageDoveGenTextDifficulty,
    setSettingsLanguageDoveGenTextTopic,
    setSettingsLanguageDoveIPA,
    setSettingsLanguageDoveGenTextLength
} from "../settings_manager/settings";
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import Selector from "../common_components/selectors/Selector"
import axios from "axios";
import {callGPT4} from "../gpt4/api";
import {genTextPrompt} from "../language_dove/generate_text";

const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};


const LanguageDovePage = () => {
    const textRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    let alignmentOptions = [
        {value: "no", title: "Disabled"},
        {value: "hover", title: "On hover"},
        {value: "top", title: "On top"}
    ]

    let dictionaryOptions = [
        {value: "no", title: "Disabled"},
        {value: "wiktionary", title: "Wiktionary (en)"},
        {value: "reverso", title: "Reverso"}
    ]

    let ipaOptions = [
        {value: "no", title: "Disabled"},
        {value: "hover", title: "On hover"},
        {value: "top", title: "On top"},
        {value: "replace", title: "Replace with IPA"}
    ]

    let ttsOptions = [
        {value: "no", title: "Disabled"},
        {value: "yes", title: "Enabled"}
    ]

    let difficultyOptions = [
        {value: "easy", title: "Easy"},
        {value: "medium", title: "Medium"},
        {value: "hard", title: "Hard"},
        {value: "very hard", title: "Very hard"}
    ]

    let topicOptions = [
        {value: "random", title: "Random"},
        {value: "travel and tourism", title: "Travel and Tourism"},
        {value: "history", title: "History"},
        {value: "art and culture", title: "Art and Culture"},
        {value: "languages", title: "Languages"},
        {value: "animals", title: "Animals"},
        {value: "science", title: "Science"},
        {value: "technology", title: "Technology"},
        {value: "medicine", title: "Medicine"},
        {value: "business", title: "Business"},
        {value: "politics", title: "Politics"},
        {value: "sports", title: "Sports"},
        {value: "style and beauty", title: "Style and Beauty"},
        {value: "food and drinks", title: "Food and Drinks"},
        {value: "health and fitness", title: "Health and Fitness"},
        {value: "law", title: "Law"}
    ]

    let lengthOptions = [
        //{value: "tiny (about 50 words long)", title: "Tiny (about 50 words long)"},
        {value: "short (about 100 words long)", title: "Short (about 100 words long)"},
        {value: "long (about 250 words long)", title: "Long (about 250 words long)"},
        //{value: "long (about 500 words long)", title: "Long (about 500 words long)"}
    ]

    const handleGenerateTextButton = () => {
        setIsModalOpen(true);
    };

    const handleGenerateText = () => {
        textRef.current.value = ""
        textRef.current.disabled = true
        let domain = getSettingsLanguageDoveGenTextTopic();
        let prompt = genTextPrompt(domain, getSettingsLanguageDoveGenTextLength(), getSettingsLanguageDoveGenTextDifficulty(), getSettingsTargetLanguage())
        callGPT4("gpt-4", prompt, 0.0, 4000, (response2) => {
                textRef.current.value = response2
                textRef.current.disabled = false
            },
            (response2) => {
                textRef.current.value = response2
            },
            (error) => {
                textRef.current.value = error
                textRef.current.disabled = false
            }, "guest"
        )
        setIsModalOpen(false);
    };

    const handleLanguageDove = () => {
        if (textRef.current.value.length === 0) {
            alert("Please enter some text")
            return
        }


        axios.post(process.env.REACT_APP_SERVER_URL + "/detect", {
            text: textRef.current.value,
        })
            .then((response) => {
                axios.post(process.env.REACT_APP_SERVER_URL + "/language_dove", {
                    source_text: textRef.current.value,
                    target_text: "",
                    source_lang: response.data.language,
                    target_lang: getSettingsNativeLanguage(),
                    tts: getSettingsLanguageDoveTTS(),
                    dictionary: getSettingsLanguageDoveDictionary(),
                    alignment: getSettingsLanguageDoveAlignment(),
                    ipa: getSettingsLanguageDoveIPA(),
                })
                    .then((response) => {
                        var newWindow = window.open('', '_blank');
                        newWindow.document.write(response.data.result_html);
                        newWindow.document.close();
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const onAlignmentSelect = (value) => {
        setSettingsLanguageDoveAlignment(value);
    }

    const onDictionarySelect = (value) => {
        setSettingsLanguageDoveDictionary(value);
    }

    const onSoundOutSelect = (value) => {
        setSettingsLanguageDoveTTS(value);
    }

    const onNativeLanguageSelect = (value) => {
        setSettingsNativeLanguage(value);
    }

    const onTargetLanguageSelect = (value) => {
        setSettingsTargetLanguage(value);
    }

    const onTopicSelect = (value) => {
        setSettingsLanguageDoveGenTextTopic(value);
    }

    const onDifficultySelect = (value) => {
        setSettingsLanguageDoveGenTextDifficulty(value);
    }

    const onLengthSelect = (value) => {
        setSettingsLanguageDoveGenTextLength(value);
    }

    const onIPASelect = (value) => {
        setSettingsLanguageDoveIPA(value);
    }

    return (
        <div>
            <div className="settings-container">
                <div className="settings-container">
                    <button onClick={handleGenerateTextButton}>Generate Text</button>
                </div>

                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <LanguageSelector title={"Language"} onLanguageSelect={onTargetLanguageSelect}
                                      isSorted={true}
                                      isEnglish={true} defaultLanguage={getSettingsTargetLanguage()}></LanguageSelector>

                    <Selector title={"Topic"} onSelect={onTopicSelect}
                              options={topicOptions}
                              defaultValue={getSettingsLanguageDoveGenTextTopic()}/>

                    <Selector title={"Difficulty"} onSelect={onDifficultySelect}
                              options={difficultyOptions}
                              defaultValue={getSettingsLanguageDoveGenTextDifficulty()}/>

                    <Selector title={"Length"} onSelect={onLengthSelect}
                              options={lengthOptions}
                              defaultValue={getSettingsLanguageDoveGenTextLength()}/>


                    <button onClick={handleGenerateText}>Generate Text</button>

                </Modal>

                <div className="selector-container">
                    <Selector title={"Alignment"} onSelect={onAlignmentSelect}
                              options={alignmentOptions}
                              defaultValue={getSettingsLanguageDoveAlignment()}/>
                </div>

                <div className="selector-container">
                    <Selector title={"Dictionary"} onSelect={onDictionarySelect}
                              options={dictionaryOptions}
                              defaultValue={getSettingsLanguageDoveDictionary()}/>
                </div>

                <div className="selector-container">
                    <Selector title={"IPA"} onSelect={onIPASelect}
                              options={ipaOptions}
                              defaultValue={getSettingsLanguageDoveIPA()}/>
                </div>

                <LanguageSelector title={"Native language"} onLanguageSelect={onNativeLanguageSelect}
                                  isSorted={true}
                                  isEnglish={true} defaultLanguage={getSettingsNativeLanguage()}></LanguageSelector>


                <div className="settings-container">
                    <button onClick={handleLanguageDove}>Linkify</button>
                </div>
            </div>

            <div className="text-field">
                <textarea
                    placeholder="Input your text"
                    ref={textRef}
                    rows={30}
                    style={{
                        width: '98%',
                        marginLeft: '1%',
                        marginRight: '1%'
                    }}
                />
            </div>

        </div>
    );

};

export default LanguageDovePage;