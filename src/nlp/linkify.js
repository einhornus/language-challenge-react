//import translationPrompt from '../..//assets/nlp_task_prompts/translate.json';
import {callGPT4} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import './styles.css';
import {romanize} from "./romanize.js";
import {getSettingsKey, getSettingsDoUseGPT4} from "../settings_manager/settings";

function getArticle(sentence, index, targetLanguage, nativeLanguage, onPartialResponse, onFullResponse, onError) {
    let message = ""
    for (let i = 0; i < sentence.length; i++) {
        if (i === index) {
            message += "*" + sentence[i] + "*"
        } else {
            message += sentence[i]
        }
    }
    message += "\n" + sentence[index]

    let prompt = [
        {
            "role": "system",
            "content": "You're LangGPT\n" +
                "You're given a sentence in " + codeToLanguage(targetLanguage) +
                " with one word highlighted.\n" +
                "Your task is to give the concise explanation on the highlighted word\n" +
                "Your reply should contain:\n" +
                "1. The dictionary form of the word and its grammatical categories\n" +
                "2. The meaning of the word in the context of the sentence\n" +
                "3. The possible meanings of the word in general with sentence examples\n" +
                "4. Some information on related words\n" +
                "The structure of the user message:\n" +
                "The first line contains the sentence with the the word highlighted\n" +
                "The second line contains the word itself\n"
        },
        {
            "role": "user",
            "content": "El gato saltó sobre el tejado y **desapareció** en la oscuridad de la noche\n" +
                "desapareció"
        },
        {
            "role": "assistant",
            "content": "1. **desapareció** is third-person singular of **desaparecer**\n" +
                "2. **desaparecer** here means **to disappear**\n" +
                "3. **desaparecer** can also mean *to vanish, to fade away, to go away, to be lost, to be gone, to be missing, to be absent*:\n" +
                "- Mis llaves han **desaparecido**: My keys have disappeared\n" +
                "- El dinero **desapareció**: The money vanished\n" +
                "4. **desaparecer** comes from des- (negative prefix) and aparecer (to appear)\n"
        },
        {
            "role": "user",
            "content": message
        }
    ]


    if(nativeLanguage !== "en"){
        message += "\n" + codeToLanguage(nativeLanguage)


        prompt = [
            {
                "role": "system",
                "content": "You're LangGPT\n" +
                    "You're given a sentence in " + codeToLanguage(targetLanguage) +
                    " with one word highlighted.\n" +
                    "Your task is to give the concise explanation on the highlighted word in\n"+codeToLanguage(nativeLanguage) +
                    "Your reply should contain:\n" +
                    "1. The dictionary form of the word and its grammatical categories\n" +
                    "2. The meaning of the word in the context of the sentence\n" +
                    "3. The possible meanings of the word in general with sentence examples\n" +
                    "4. Some information on related words\n" +
                    "The structure of the user message:\n" +
                    "The first line contains the sentence with the the word highlighted\n" +
                    "The second line contains the word itself\n"+
                    "The third line contains the language ypu should present the explanation in\n"+
                    "Your explanations must be in \n"+codeToLanguage(nativeLanguage)
            },
            {
                "role": "user",
                "content": "El gato saltó sobre el tejado y **desapareció** en la oscuridad de la noche\n" +
                    "desapareció\nEnglish"
            },
            {
                "role": "assistant",
                "content": "1. **desapareció** is third-person singular of **desaparecer**\n" +
                    "2. **desaparecer** here means **to disappear**\n" +
                    "3. **desaparecer** can also mean *to vanish, to fade away, to go away, to be lost, to be gone, to be missing, to be absent*:\n" +
                    "- Mis llaves han **desaparecido**\n My keys have disappeared\n" +
                    "- El dinero **desapareció**\n The money vanished\n" +
                    "4. **desaparecer** comes from **des-** (negative prefix) and **aparecer** (to appear)\n"
            },
            {
                "role": "user",
                "content": "Despite facing numerous challenges, the dedicated team of scientists continued to make significant progress in their pursuit of discovering innovative solutions to combat climate change.\nfacing\nRussian"
            },
            {
                "role": "assistant",
                "content": "1. **facing** - третья форма глагола *to face*\n" +
                    "2. **facing** в данном контексте дословно означает **встретив** (многочисленные трудности). Однако, более правильным решением будет просто не переводить это слово: *Несмотря на многочисленные трудности...*\n" +
                    "3. **to face** также может переводиться как *сталкиваться с, стоять лицом к, смело встречать что-либо*:\n" +
                    "- **Face** the sun\n Встань лицом к солнцу\n" +
                    "- I'm going to have *to **face** this sooner or later\n Рано или поздно мне придется с этим столкнуться.\n" +
                    "4. Глагол **to face** однокоренной с существительным **face** (лицо)\n"
            },
            {
                "role": "user",
                "content": message
            }
        ]
    }

    let key = getSettingsKey()
    let doUseGPT4 = getSettingsDoUseGPT4()
    let m = "gpt-3.5-turbo"
    callGPT4(m, prompt, 0, -1, onFullResponse, onPartialResponse, onError);
}

function tokenize(text, languageCode = "en", granularity = 'word') {
    const segmenter = new Intl.Segmenter(languageCode, {granularity: granularity});
    const segments = segmenter.segment(text);
    const words = [];
    for (const segment of segments) {
        words.push(segment.segment);
    }
    return words;
}

function linkify(text, tl, nl, tp, ep, onPartialResponse, onFullResponse, onError, clickHandler) {
    const handleClick = (event, woc) => {
        event.preventDefault();
        clickHandler(woc)
    };

    let sentences = tokenize(text, tl, 'sentence');
    let words_in_content = []
    for (let i = 0; i < sentences.length; i++) {
        let words = tokenize(sentences[i], tl, 'word');
        let romanized = romanize(words, tl)
        for (let j = 0; j < words.length; j++) {
            let obj = {
                word: words[j],
                sentence: sentences[i],
                transliterated: romanized[j],
                words: words,
                index: j
            }
            words_in_content.push(obj)
        }
    }

    const links = words_in_content.map((word_in_content, index) => (
        word_in_content['word'] === ' ' ? (
            ' '
        ) : (
            <a
                key={index}
                href="#"
                onClick={(event) => handleClick(event, word_in_content)}
                className="link"
            >
                {tp === "top" ? (
                    <ruby>
                        {word_in_content['word']}
                        <rt>
                            {word_in_content['transliterated']}
                        </rt>
                    </ruby>
                ) : (
                    tp === "replace" ? word_in_content['transliterated'] : word_in_content['word']
                )}
            </a>
        )
    ));

    let res = <div style={{fontSize: 20}}>{links}</div>;
    onFullResponse(res)
}


export {tokenize, getArticle, linkify};
