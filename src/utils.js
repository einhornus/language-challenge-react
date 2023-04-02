//import detectBrowserLanguage from 'detect-browser-language'
import {useState, useEffect} from 'react';
import React from 'react';

const IS_LOCAL = false;

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

export function getChatServerUrl() {
    return process.env.REACT_APP_SERVER_URL;
}