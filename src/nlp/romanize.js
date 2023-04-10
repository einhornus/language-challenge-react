const {transliterate} = require('transliteration');


function romanize(wordArray, languageCode) {
    let romanized = []
    for (let i = 0; i < wordArray.length; i++) {
        romanized.push(transliterate(wordArray[i], {unknown: '?'}))
    }
    return romanized
}

export {romanize};