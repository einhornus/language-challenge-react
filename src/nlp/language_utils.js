let languageCodes = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "pt": "Portuguese",
    "ru": "Russian",
    "zh": "Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "ar": "Arabic",
    "hi": "Hindi",
    "bn": "Bengali",
    "pa": "Punjabi",
    "ta": "Tamil",
    "te": "Telugu",
    "ml": "Malayalam",
    "mr": "Marathi",
    "gu": "Gujarati",
    "el": "Greek",
    "he": "Hebrew",
    "tr": "Turkish",
    "th": "Thai",
    "sw": "Swahili",
    "vi": "Vietnamese",
    "uk": "Ukrainian",
    "cy": "Welsh",
    "pl": "Polish",
    "ro": "Romanian",
    "hu": "Hungarian",
    "sv": "Swedish",
    "no": "Norwegian",
    "da": "Danish",
    "fi": "Finnish",
    "sk": "Slovak",
    "cs": "Czech",
    "bg": "Bulgarian",
    "sl": "Slovenian",
    "lt": "Lithuanian",
    "lv": "Latvian",
    "hr": "Croatian",
    "et": "Estonian",
    "is": "Icelandic",
    "ga": "Irish",
    "mt": "Maltese",
    "id": "Indonesian",
    "tl": "Tagalog",
    "ms": "Malay",
    "kk": "Kazakh",
    "uz": "Uzbek",
    "ky": "Kyrgyz",
    "tg": "Tajik",
    "tk": "Turkmen",
    "ps": "Pashto",
    "sd": "Sindhi",
    "ur": "Urdu",
    "fa": "Persian",
    "am": "Amharic",
    "ti": "Tigrinya",
    "or": "Odia",
    "kn": "Kannada",
    "ne": "Nepali",
    "si": "Sinhalese",
    "my": "Burmese",
    "km": "Khmer",
    "lo": "Lao",
    "ka": "Georgian",
    "hy": "Armenian",
    "iw": "Hebrew",
    "yi": "Yiddish",
    "af": "Afrikaans",
    "ha": "Hausa",
    "eu": "Basque",
    "zu": "Zulu",
    "xh": "Xhosa",
    "st": "Southern Sotho",
    "tn": "Tswana",
    "nso": "Northern Sotho",
    "ts": "Tsonga",
    "ss": "Swazi",
    "ve": "Venda",
    "ny": "Chichewa",
    "ku": "Kurdish",
    "fy": "Frisian",
    "mn": "Mongolian",
    "lb": "Luxembourgish",
    'la': 'Latin',
    'eo': 'Esperanto',
    'sr': 'Serbian (Latin)',
    'sq': 'Albanian',
    'bs': 'Bosnian',
    'mk': 'Macedonian',
    'ca': 'Catalan',
    'eme': 'Shakespearian English (KJV Bible English)',
    'nl': 'Dutch'
}

function codeToLanguage(languageCode){
    if (languageCode === undefined || !(languageCode in languageCodes)){
        return "Unknown"
    }
    return languageCodes[languageCode];
}


export {codeToLanguage, languageCodes}