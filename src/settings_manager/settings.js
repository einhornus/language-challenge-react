import Cookies from 'js-cookie';

function getSettingsNativeLanguage() {
    let val = Cookies.get('nativeLanguage');
    if (val === undefined) {
        return "en";
    }
    return val
}

function getSettingsTargetLanguage() {
    let val = Cookies.get('targetLanguage');
    if (val === undefined) {
        return "en";
    }
    return val
}

function getSettingsCorrectLanguage() {
    let val = Cookies.get('correctLanguage');
    if (val === undefined) {
        return "auto";
    }
    return val
}

function getSettingsCorrectionType() {
    let val = Cookies.get('correctionType');
    if (val === undefined) {
        return "grammar";
    }
    return val
}

function getSettingsTransliterationPolicy() {
    let val = Cookies.get('transliterationPolicy');
    if (val === undefined) {
        return "no";
    }
    return val
}

function getSettingsDoProvideGrammarExplanations() {
    let val = Cookies.get('doProvideGrammarExplanations');
    if (val === undefined) {
        return "no";
    }
    return val
}

function getSettingsKey() {
    let val = Cookies.get('openaiAPIKey');
    if (val === undefined) {
        return ""
    }
    return val
}

function getSettingsDoUseGPT4() {
    let val = Cookies.get('doUseGPT4');
    if (val === undefined) {
        return "no";
    }
    return val
}

function setSettingsNativeLanguage(nativeLanguage) {
    Cookies.set('nativeLanguage', nativeLanguage);
}

function setSettingsCorrectionType(correctionType) {
    Cookies.set('correctionType', correctionType);
}

function setSettingsTargetLanguage(targetLanguage) {
    Cookies.set('targetLanguage', targetLanguage);
}

function setSettingsCorrectLanguage(correctLanguage) {
    Cookies.set('correctLanguage', correctLanguage);
}


function setSettingsTransliterationPolicy(transliterationPolicy) {
    Cookies.set('transliterationPolicy', transliterationPolicy);
}

function setSettingsDoProvideGrammarExplanations(doGrammarExplanations) {
    Cookies.set('doProvideGrammarExplanations', doGrammarExplanations);
}

function setSettingsKey(key) {
    Cookies.set('openaiAPIKey', key);
}

function setSettingsDoUseGPT4(key) {
    Cookies.set('doUseGPT4', key);
}

export {
    getSettingsNativeLanguage,
    getSettingsTargetLanguage,
    getSettingsTransliterationPolicy,
    getSettingsDoProvideGrammarExplanations,
    getSettingsKey,
    getSettingsDoUseGPT4,
    setSettingsNativeLanguage,
    setSettingsTargetLanguage,
    setSettingsTransliterationPolicy,
    setSettingsDoProvideGrammarExplanations,
    setSettingsKey,
    setSettingsDoUseGPT4,
    getSettingsCorrectLanguage,
    setSettingsCorrectLanguage,
    getSettingsCorrectionType,
    setSettingsCorrectionType
}