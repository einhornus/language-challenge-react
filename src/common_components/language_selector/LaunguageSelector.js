import React, {useState} from 'react';
import './LanguageSelector.css';
import Select from 'react-select';


const customStyles = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    control: (provided) => ({
        ...provided,
        width: 200,
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
};

const languageOptions = [
    {value: 'en', flag: <img src="https://flagpedia.net/data/flags/mini/us.png" alt="English"/>, title: 'English', englishTitle: 'English'},
    {value: 'zh', flag: <img src="https://flagpedia.net/data/flags/mini/cn.png" alt="普通话"/>, title: '普通话', englishTitle: 'Mandarin'},
    {value: 'es', flag: <img src="https://flagpedia.net/data/flags/mini/es.png" alt="Español"/>, title: 'Español', englishTitle: 'Spanish'},
    {value: 'fr', flag: <img src="https://flagpedia.net/data/flags/mini/fr.png" alt="Français"/>, title: 'Français', englishTitle: 'French'},
    {value: 'de', flag: <img src="https://flagpedia.net/data/flags/mini/de.png" alt="Deutsch"/>, title: 'Deutsch', englishTitle: 'German'},
    {value: 'ar', flag: <img src="https://flagpedia.net/data/flags/mini/sa.png" alt="العربية"/>, title: 'العربية', englishTitle: 'Arabic'},
    {value: 'hi', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="हिन्दी"/>, title: 'हिन्दी', englishTitle: 'Hindi'},
    {value: 'ja', flag: <img src="https://flagpedia.net/data/flags/mini/jp.png" alt="日本語"/>, title: '日本語', englishTitle: 'Japanese'},
    {value: 'pt', flag: <img src="https://flagpedia.net/data/flags/mini/pt.png" alt="Português"/>, title: 'Português', englishTitle: 'Portuguese'},
    {value: 'ru', flag: <img src="https://flagpedia.net/data/flags/mini/ru.png" alt="Русский"/>, title: 'Русский', englishTitle: 'Russian'},
    {value: 'eme', flag: <img src="https://flagpedia.net/data/flags/mini/gb-eng.png" alt="EM English"/>, title: 'EM English', englishTitle: 'EM English'},
    {value: 'id', flag: <img src="https://flagpedia.net/data/flags/mini/id.png" alt="Bah. Indonesia"/>, title: 'B. Indonesia', englishTitle: 'Indonesian'},
    {value: 'ko', flag: <img src="https://flagpedia.net/data/flags/mini/kr.png" alt="한국어"/>, title: '한국어', englishTitle: 'Korean'},
    {value: 'ur', flag: <img src="https://flagpedia.net/data/flags/mini/pk.png" alt="اردو"/>, title: 'اردو', englishTitle: 'Urdu'},
    {value: 'it', flag: <img src="https://flagpedia.net/data/flags/mini/it.png" alt="Italiano"/>, title: 'Italiano', englishTitle: 'Italian'},
    {value: 'fa', flag: <img src="https://flagpedia.net/data/flags/mini/ir.png" alt="فارسی"/>, title: 'فارسی', englishTitle: 'Persian'},
    {value: 'nl', flag: <img src="https://flagpedia.net/data/flags/mini/nl.png" alt="Nederlands"/>, title: 'Nederlands', englishTitle: 'Dutch'},
    {value: 'yue', flag: <img src="https://flagpedia.net/data/flags/mini/cn.png" alt="廣東話"/>, title: '廣東話', englishTitle: 'Cantonese'},
    {value: 'pa', flag: <img src="https://flagpedia.net/data/flags/mini/pk.png" alt="ਪੰਜਾਬੀ"/>, title: 'ਪੰਜਾਬੀ', englishTitle: 'Punjabi'},
    {value: 'ta', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="தமிழ்"/>, title: 'தமிழ்', englishTitle: 'Tamil'},
    {value: 'mr', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="मराठी"/>, title: 'मराठी', englishTitle: 'Marathi'},
    {value: 'gu', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="ગુજરાતી"/>, title: 'ગુજરાતી', englishTitle: 'Gujarati'},
    {value: 'bn', flag: <img src="https://flagpedia.net/data/flags/mini/bd.png" alt="বাংলা"/>, title: 'বাংলা', englishTitle: 'Bengali'},
    {value: 'kn', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="ಕನ್ನಡ"/>, title: 'ಕನ್ನಡ', englishTitle: 'Kannada'},
    {value: 'ms', flag: <img src="https://flagpedia.net/data/flags/mini/my.png" alt="Bah. Melayu"/>, title: 'B. Melayu', englishTitle: 'Malay'},
    {value: 'tr', flag: <img src="https://flagpedia.net/data/flags/mini/tr.png" alt="Türkçe"/>, title: 'Türkçe', englishTitle: 'Turkish'},
    {value: 'pl', flag: <img src="https://flagpedia.net/data/flags/mini/pl.png" alt="Polski"/>, title: 'Polski', englishTitle: 'Polish'},
    {
        value: 'uk',
        flag: <img src="https://flagpedia.net/data/flags/mini/ua.png" alt="Українська"/>,
        title: 'Українська',
        englishTitle: 'Ukrainian'
    },
    {value: 'el', flag: <img src="https://flagpedia.net/data/flags/mini/gr.png" alt="Ελληνικά"/>, title: 'Ελληνικά', englishTitle: 'Greek'},
    {value: 'te', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="తెలుగు"/>, title: 'తెలుగు', englishTitle: 'Telugu'},
    {value: 'ml', flag: <img src="https://flagpedia.net/data/flags/mini/in.png" alt="മലയാളം"/>, title: 'മലയാളം', englishTitle: 'Malayam'},
    {value: 'si', flag: <img src="https://flagpedia.net/data/flags/mini/lk.png" alt="සිංහල"/>, title: 'සිංහල', englishTitle: 'Sinhala'},
    {value: 'sv', flag: <img src="https://flagpedia.net/data/flags/mini/se.png" alt="Svenska"/>, title: 'Svenska', englishTitle: 'Swedish'},
    {value: 'no', flag: <img src="https://flagpedia.net/data/flags/mini/no.png" alt="Norsk"/>, title: 'Norsk', englishTitle: 'Norwegian'},
    {value: 'da', flag: <img src="https://flagpedia.net/data/flags/mini/dk.png" alt="Dansk"/>, title: 'Dansk', englishTitle: 'Danish'},
    {value: 'is', flag: <img src="https://flagpedia.net/data/flags/mini/is.png" alt="Íslenska"/>, title: 'Íslenska', englishTitle: 'Icelandic'},
    {value: 'he', flag: <img src="https://flagpedia.net/data/flags/mini/il.png" alt="עברית"/>, title: 'עברית', englishTitle: 'Hebrew'},
    {value: 'ca', flag: <img src="https://flagpedia.net/data/flags/mini/es.png" alt="Català"/>, title: 'Català', englishTitle: 'Catalan'},
    {value: 'ro', flag: <img src="https://flagpedia.net/data/flags/mini/ro.png" alt="Română"/>, title: 'Română', englishTitle: 'Romanian'},
    {value: 'tl', flag: <img src="https://flagpedia.net/data/flags/mini/ph.png" alt="Tagalog"/>, title: 'Tagalog', englishTitle: 'Tagalog'},
    {value: 'vi', flag: <img src="https://flagpedia.net/data/flags/mini/vn.png" alt="Tiếng Việt"/>, title: 'Tiếng Việt', englishTitle: 'Vietnamese'},
    {value: 'th', flag: <img src="https://flagpedia.net/data/flags/mini/th.png" alt="ไทย"/>, title: 'ไทย', englishTitle: 'Thai'},
    {value: 'km', flag: <img src="https://flagpedia.net/data/flags/mini/kh.png" alt="ភាសាខ្មែរ"/>, title: 'ភាសាខ្មែរ', englishTitle: 'Khmer'},
    {value: 'af', flag: <img src="https://flagpedia.net/data/flags/mini/za.png" alt="Afrikaans"/>, title: 'Afrikaans', englishTitle: 'Afrikaans'},
    {value: 'hu', flag: <img src="https://flagpedia.net/data/flags/mini/hu.png" alt="Magyar"/>, title: 'Magyar', englishTitle: 'Hungarian'},
    {value: 'kk', flag: <img src="https://flagpedia.net/data/flags/mini/kz.png" alt="Қазақша"/>, title: 'Қазақша', englishTitle: 'Kazakh'},
    {value: 'bg', flag: <img src="https://flagpedia.net/data/flags/mini/bg.png" alt="Български"/>, title: 'Български', englishTitle: 'Bulgarian'},
    {value: 'cs', flag: <img src="https://flagpedia.net/data/flags/mini/cz.png" alt="Čeština"/>, title: 'Čeština', englishTitle: 'Czech'},
    {value: 'hy', flag: <img src="https://flagpedia.net/data/flags/mini/am.png" alt="Հայերեն"/>, title: 'Հայերեն', englishTitle: 'Armenian'},
    {value: 'hr', flag: <img src="https://flagpedia.net/data/flags/mini/hr.png" alt="Hrvatski"/>, title: 'Hrvatski', englishTitle: 'Croatian'},
    {value: 'fi', flag: <img src="https://flagpedia.net/data/flags/mini/fi.png" alt="Suomi"/>, title: 'Suomi', englishTitle: 'Finnish'},
    {value: 'sr', flag: <img src="https://flagpedia.net/data/flags/mini/rs.png" alt="Srpski"/>, title: 'Srpski', englishTitle: 'Serbian'},
    {value: 'sk', flag: <img src="https://flagpedia.net/data/flags/mini/sk.png" alt="Slovenčina"/>, title: 'Slovenčina', englishTitle: 'Slovak'},
    {value: 'sl', flag: <img src="https://flagpedia.net/data/flags/mini/si.png" alt="Slovenščina"/>, title: 'Slovenščina', englishTitle: 'Slovenian'},
    {value: 'ka', flag: <img src="https://flagpedia.net/data/flags/mini/ge.png" alt="ქართული"/>, title: 'ქართული', englishTitle: 'Georgian'},
    {value: 'et', flag: <img src="https://flagpedia.net/data/flags/mini/ee.png" alt="Eesti"/>, title: 'Eesti', englishTitle: 'Estonian'},
    {value: 'lt', flag: <img src="https://flagpedia.net/data/flags/mini/lt.png" alt="Lietuvių"/>, title: 'Lietuvių', englishTitle: 'Lithuanian'},
    {value: 'lv', flag: <img src="https://flagpedia.net/data/flags/mini/lv.png" alt="Latviešu"/>, title: 'Latviešu', englishTitle: 'Latvian'},
    {value: 'la', flag: <img src="https://flagpedia.net/data/flags/mini/va.png" alt="Latina"/>, title: 'Latina', englishTitle: 'Latin'},
];

const LanguageSelector = ({title, onLanguageSelect, isSorted, isEnglish}) => {
    if(isEnglish){
        languageOptions.forEach((option) => {
            option.title = option.englishTitle;
        });
    }

    let langs = languageOptions.slice();

    if (isSorted) {
        let fixedLangs = 11
        let portionToSort = languageOptions.slice(fixedLangs, languageOptions.length);

        portionToSort = portionToSort.sort((a, b) => {
            return a.title.localeCompare(b.title)
        });


        /*
        let langs = []
        for(let i = 0; i<fixedLangs; i++){
            langs.push(languageOptions[i])
        }
        for()
        */

        langs = [...languageOptions.slice(0, fixedLangs), ...portionToSort];
    }

    console.log(langs.length)

    langs.forEach((option) => {
        option.label = (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <div style={{textAlign: 'left'}}>
                    <span>{option.title}</span>
                </div>

                <div style={{textAlign: 'right', marginRight: 8}}>
                    {option.flag}
                </div>
            </div>
        );
    });

    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

    const handleLanguageChange = (option) => {
        setSelectedLanguage(option);
        if (onLanguageSelect) {
            onLanguageSelect(option.value);
        }
    };

    return (
        <div className="language-selector">
            <span>{title}</span>
            <Select
                styles={customStyles}
                value={selectedLanguage}
                onChange={handleLanguageChange}
                options={langs}
            />
        </div>
    );
};

export default LanguageSelector;
