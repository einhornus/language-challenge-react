//import detectBrowserLanguage from 'detect-browser-language'
import {useState, useEffect} from 'react';

const IS_LOCAL = false;
const IS_LOCAL_CONVERTER = false;
const IS_LOCAL_CHAT = true;

/*
export let getLanguageMode = (subtitlesMode) => {
    let language = 'og';
    let nativeLanguage = getLanguage();//detectBrowserLanguage();
    if (subtitlesMode === "tr") {
        language = nativeLanguage;
    }
    if (subtitlesMode === "du") {
        language = "og_" + nativeLanguage;
    }
    return language;
}
*/

export function getLanguageIcon(language) {
    let exceptionsDictionary = {
        "en": "us",
        "ja": "jp",
        "zh": "cn",
        "ko": "kr",
        "uk": "ua",
        "cs": "cz",
        "sv": "se",
        "da": "dk"
    }

    let link = "https://flagpedia.net/data/flags/mini/"
    if (exceptionsDictionary[language] !== undefined) {
        link += exceptionsDictionary[language];
    } else {
        link += language;
    }
    link += ".png";
    return link;
}

export function getLanguageByCode(languageCode) {
    let language = "";
    switch (languageCode) {
        case "en":
            language = "English";
            break;
        case "es":
            language = "Spanish";
            break;
        case "ja":
            language = "Japanese";
            break;
        case "fr":
            language = "French";
            break;
        case "de":
            language = "German";
            break;
        case "pt":
            language = "Portuguese";
            break;
        case "ru":
            language = "Russian";
            break;
        case "it":
            language = "Italian";
            break;
        case "ko":
            language = "Korean";
            break;
        case "nl":
            language = "Dutch";
            break;
        case "pl":
            language = "Polish";
            break;
        case "hr":
            language = "Croatian";
            break;
        case "uk":
            language = "Ukrainian";
            break;
        case "tr":
            language = "Turkish";
            break;
        case "id":
            language = "Indonesian";
            break;
        case "cs":
            language = "Czech";
            break;
        case "sk":
            language = "Slovak";
            break;
        case "sv":
            language = "Swedish";
            break;
        case "no":
            language = "Norwegian";
            break;
        case "da":
            language = "Danish";
            break;
        case "fi":
            language = "Finnish";
            break;
        case "th":
            language = "Thai";
            break;
        case "ar":
            language = "Arabic";
            break;
        case "zh":
            language = "Chinese";
            break;
    }
    return language;
}

export function getServerUrl() {
    if (IS_LOCAL) {
        return "http://localhost:8009";
    } else {
        return "http://128.199.46.26:8009";
    }
}


export function getConverterServerUrl() {
    if (IS_LOCAL_CONVERTER) {
        return "http://localhost:8019";
    } else {
        return "http://128.199.46.26:8019";
    }
}

export function getChatServerUrl() {
    if (IS_LOCAL_CHAT) {
        return "http://localhost:8020";
    } else {
        return "https://language-challenge-fastapi.herokuapp.com"
    }
}