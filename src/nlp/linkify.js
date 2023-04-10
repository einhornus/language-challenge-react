//import translationPrompt from '../..//assets/nlp_task_prompts/translate.json';
import {callGPT4APIJSStreaming} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import './styles.css';
import {romanize} from "./romanize.js";

function getArticle(key, model, message, targetLanguage, nativeLanguage, onPartialResponse, onFullResponse, onError) {
    let prompt = [
        {
            "role": "system",
            "content": "You're TranslateGPT.\nYou translate the text to " + codeToLanguage(targetLanguage) + ".\nYour reply should contain ONLY the translated text, nothing else.\nIf the text contains a profanity word please replace it with *** in the translation."
        },
        {
            "role": "user",
            "content": message
        }
    ]

    if (targetLanguage === "eme") {
        prompt = [
            {
                "role": "system",
                "content": "You are ShakespeareGPT.\nYou are a Shakespearean translator.\nYou rewrite the text in a style of 17 century English\nPlease apply a very heavy stylization\nFeel free to use the vocabulary found in the KJV Bible\n.Your reply should contain ONLY the translated text, nothing else."
            },
            {
                "role": "user",
                "content": message
            }
        ]
    }

    callGPT4APIJSStreaming(model, key, prompt, 0, 1000, onFullResponse, onPartialResponse, onError);
}

function tokenize(text, languageCode, granularity = 'word') {
    const segmenter = new Intl.Segmenter(languageCode, {granularity: granularity});
    const segments = segmenter.segment(text);
    const words = [];

    for (const segment of segments) {
        words.push(segment.segment);
    }

    return words;
}

function linkify(text, targetLanguage, doRomanize = false) {
    const handleClick = (event, word_in_context) => {
        event.preventDefault();
        console.log('Link clicked:', word_in_context);
    };

    let sentences = tokenize(text, targetLanguage, 'sentence');
    let words_in_content = []
    for(let i = 0; i < sentences.length; i++) {
        let words = tokenize(sentences[i], targetLanguage, 'word');
        let romanized = romanize(words, targetLanguage)
        for(let j = 0; j< words.length; j++) {
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
                <ruby>
                    {word_in_content['word']} <rt>
                        {word_in_content['transliterated']}
                        <br></br>
                            {word_in_content['transliterated']}

                </rt>
                </ruby>
            </a>
        )
    ));

    return <div style={{fontSize : 20}}>{links}</div>;
}

export {tokenize, getArticle, linkify};
