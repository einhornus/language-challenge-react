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
        return "ru";
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


function getSettingsDoUseGPT4() {
    let val = Cookies.get('doUseGPT4');
    if (val === undefined) {
        return "yes";
    }
    return val
}

function getSettingsModel() {
    let doUseGPT4 = getSettingsDoUseGPT4()
    let m = "gpt-3.5-turbo"
    if (doUseGPT4 === "yes") {
        m = "gpt-4"
    }
    return m
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

function setSettingsDoUseGPT4(key) {
    Cookies.set('doUseGPT4', key);
}

function getSettingsLogin() {
    let val = Cookies.get('login');
    if (val === undefined) {
        return "guest"
    }
    return val
}

function setSettingsLogin(login) {
    Cookies.set('login', login);
}

function getSettingsPassword() {
    let val = Cookies.get('password');
    if (val === undefined) {
        return ""
    }
    return val
}

function getSettingsSignedUp() {
    let val = Cookies.get('signedUp');
    if (val === undefined) {
        return false
    }
    return val === "true"
}

function setSettingsSignedUp(signedUp) {
    Cookies.set('login', signedUp ? "true" : "false");
}

function setSettingsPassword(password) {
    Cookies.set('password', password);
}

function getSettingsLanguageDoveAlignment() {
    let val = Cookies.get('languageDoveAlignment');
    if (val === undefined) {
        return "hover";
    }
    return val
}

function getSettingsLanguageDoveDictionary() {
    let val = Cookies.get('languageDoveDictionary');
    if (val === undefined) {
        return "wiktionary_en";
    }
    return val
}

function getSettingsLanguageDoveIPA() {
    let val = Cookies.get('languageDoveIPA');
    if (val === undefined) {
        return "no";
    }
    return val
}

function getSettingsLanguageDoveTTS() {
    let val = Cookies.get('languageDoveTTS');
    if (val === undefined) {
        return "yes";
    }
    return val
}

function getSettingsLanguageDoveGenTextTopic() {
    let val = Cookies.get('languageDoveGenTextTopic');
    if (val === undefined) {
        return "random";
    }
    return val
}

function getSettingsLanguageDoveGenTextLength() {
    let val = Cookies.get('languageDoveGenTextLength');
    if (val === undefined) {
        return "short";
    }
    return val
}

function getSettingsLanguageDoveGenTextDifficulty() {
    let val = Cookies.get('languageDoveGenTextDifficulty');
    if (val === undefined) {
        return "medium";
    }
    return val
}

function setSettingsLanguageDoveAlignment(key) {
    Cookies.set('languageDoveAlignment', key);
}

function setSettingsLanguageDoveDictionary(key) {
    Cookies.set('languageDoveDictionary', key);
}

function setSettingsLanguageDoveTTS(key) {
    Cookies.set('languageDoveTTS', key);
}

function setSettingsLanguageDoveIPA(key) {
    Cookies.set('languageDoveIPA', key);
}

function setSettingsLanguageDoveGenTextTopic(key) {
    Cookies.set('languageDoveGenTextTopic', key);
}

function setSettingsLanguageDoveGenTextDifficulty(key) {
    Cookies.set('languageDoveGenTextDifficulty', key);
}

function setSettingsLanguageDoveGenTextLength(key) {
    Cookies.set('languageDoveGenTextLength', key);
}


export {
    getSettingsNativeLanguage,
    getSettingsTargetLanguage,
    getSettingsDoUseGPT4,
    setSettingsNativeLanguage,
    setSettingsTargetLanguage,
    setSettingsTransliterationPolicy,
    setSettingsDoUseGPT4,
    getSettingsCorrectLanguage,
    setSettingsCorrectLanguage,
    getSettingsCorrectionType,
    setSettingsCorrectionType,
    getSettingsLogin,
    setSettingsLogin,
    getSettingsPassword,
    setSettingsPassword,
    getSettingsSignedUp,
    setSettingsSignedUp,
    getSettingsModel,

    getSettingsLanguageDoveAlignment,
    getSettingsLanguageDoveDictionary,
    getSettingsLanguageDoveTTS,
    getSettingsLanguageDoveIPA,
    getSettingsLanguageDoveGenTextTopic,
    getSettingsLanguageDoveGenTextLength,
    getSettingsLanguageDoveGenTextDifficulty,
    setSettingsLanguageDoveGenTextDifficulty,
    setSettingsLanguageDoveAlignment,
    setSettingsLanguageDoveDictionary,
    setSettingsLanguageDoveTTS,
    setSettingsLanguageDoveIPA,
    setSettingsLanguageDoveGenTextTopic,
    setSettingsLanguageDoveGenTextLength,
}