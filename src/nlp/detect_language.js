import {tokenize} from "./linkify"
import {getCommonWords} from "./common_words";

let punctuation = ['！', '。', '，', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function charactersPercentage(text, pattern) {
    const characters = text.match(pattern);
    const percentage = (characters ? characters.length : 0) / text.length;
    let punctuationPercentage = 0
    for (let i = 0; i < text.length; i++) {
        if (punctuation.includes(text[i])) {
            punctuationPercentage += 1 / text.length
        }
    }
    return percentage + punctuationPercentage;
}

function chineseCharactersPercentage(text) {
    const chineseCharactersPattern = /[\u4e00-\u9fa5]/g;
    return charactersPercentage(text, chineseCharactersPattern);
}

function kanaCharactersPercentage(text) {
    const kanaCharactersPattern = /[\u3040-\u309F\u30A0-\u30FF]/g;
    return charactersPercentage(text, kanaCharactersPattern);
}

function devanagariCharactersPercentage(text) {
    const devanagariCharactersPattern = /[\u0900-\u097F]/g;
    return charactersPercentage(text, devanagariCharactersPattern);
}

function koreanCharactersPercentage(text) {
    const koreanCharactersPattern = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/g;
    return charactersPercentage(text, koreanCharactersPattern);
}

function armenianCharactersPercentage(text) {
    const armenianCharactersPattern = /[\u0530-\u058F]/g;
    return charactersPercentage(text, armenianCharactersPattern);
}

function georgianCharactersPercentage(text) {
    const georgianCharactersPattern = /[\u10A0-\u10FF]/g;
    return charactersPercentage(text, georgianCharactersPattern);
}

function thaiCharactersPercentage(text) {
    const thaiCharactersPattern = /[\u0E00-\u0E7F]/g;
    return charactersPercentage(text, thaiCharactersPattern);
}


let bonuses = {
    "ru": "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    "de": "äöüß",
    "fr": "àâçéèêëîïôùûüÿœæ",
    "es": "áéíóúñü",
    "it": "àèéìòù",
    "pt": "áàãâéêíóôõúç",
}

function detect(text) {
    if (text.length === 0) {
        return null;
    }

    if (chineseCharactersPercentage(text) > 0.7) {
        return 'zh';
    }

    if (chineseCharactersPercentage(text) + kanaCharactersPercentage(text) > 0.7) {
        return 'ja';
    }

    if (devanagariCharactersPercentage(text) > 0.7) {
        return 'hi';
    }

    if (armenianCharactersPercentage(text) > 0.7) {
        return 'hy';
    }

    if (georgianCharactersPercentage(text) > 0.7) {
        return 'ka';
    }

    if (koreanCharactersPercentage(text) > 0.7) {
        return 'ko';
    }

    if (thaiCharactersPercentage(text) > 0.7) {
        return 'th';
    }

    let punctuation = [
        '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ' '
    ]

    let commonWords = getCommonWords()
    let languages = Object.keys(commonWords);
    let logSums = [];

    for (let i = 0; i < languages.length; i++) {
        let language = languages[i];
        let tokens = tokenize(text, language);
        let words = tokens.filter(token => punctuation.indexOf(token) === -1);
        let logs = []
        for (let j = 0; j < words.length; j++) {
            let word = words[j].toLowerCase();
            let logProba = 0
            if (word in commonWords[language]) {
                logProba = commonWords[language][word];
            } else {
                logProba = commonWords[language]["%%%"];
            }

            if (language in bonuses) {
                let containsBonus = false
                for (let k = 0; k < word.length; k++) {
                    if (bonuses[language].includes(word[k])) {
                        containsBonus = true
                    }
                }
                if (containsBonus) {
                    logProba += 4
                }
            }

            logs.push(logProba)
        }

        let sum = logs.reduce((a, b) => a + b, 0);
        logSums.push(
            {
                language: language,
                sum: sum,
                average: sum / words.length
            }
        );
    }

    logSums.sort((a, b) => b.average - a.average);
    console.log(logSums)

    return logSums[0].language;
}

export {detect};