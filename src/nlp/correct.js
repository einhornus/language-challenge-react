import {callGPT4APIJSStreaming} from "./../gpt4/api.js"
import {codeToLanguage} from "./language_utils";
import {getSettingsKey, getSettingsDoUseGPT4} from "../settings_manager/settings";
import {tokenize} from "./linkify";
import {detect} from "./detect_language";
import Markdown from "markdown-to-jsx";

function isSameWord(user, actual) {
    const identicalLetters = {
        "š": "s",
        "ž": "z",
        "č": "c",
        "ć": "c",
        "đ": "d",
    };
    user = user.toLowerCase();
    actual = actual.toLowerCase();
    for (const letter in identicalLetters) {
        if (user.includes(letter)) {
            user = user.replace(new RegExp(letter, 'g'), identicalLetters[letter]);
        }
        if (actual.includes(letter)) {
            actual = actual.replace(new RegExp(letter, 'g'), identicalLetters[letter]);
        }
    }
    return user === actual;
}

function shortestWay(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
        }
    }

    let i = m, j = n;
    const operations = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1]) {
            i--;
            j--;
        } else {
            if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
                let operation = {
                    'type': "remove",
                    'word': s1[i - 1],
                    'index': i - 1,
                }
                operations.push(operation);
                i--;
            } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
                let operation = {
                    'type': "add",
                    'word': s2[j - 1],
                    'index': j - 1,
                }
                operations.push(operation);
                j--;
            } else {
                let operation = {
                    'type': "change",
                    'word': s2[j - 1],
                    'index': j - 1,
                    'oldIndex': i - 1,
                    'oldWord': s1[i - 1],
                }
                operations.push(operation);
                i--;
                j--;
            }
        }
    }

    return operations;
}

function compareText(user, actual, language = "en") {
    if (actual.endsWith('.') && !user.endsWith('.')) {
        actual = actual.slice(0, -1);
    }

    const userWords = tokenize(user, language);
    const actualWords = tokenize(actual, language);

    let nonSpaceUserTokens = [];
    let nonSpaceActualTokens = [];
    let userTokensMap = {}
    let actualTokensMap = {}
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] !== " ") {
            userTokensMap[nonSpaceUserTokens.length] = i;
            nonSpaceUserTokens.push(userWords[i]);
        }
    }
    for (let i = 0; i < actualWords.length; i++) {
        if (actualWords[i] !== " ") {
            actualTokensMap[nonSpaceActualTokens.length] = i;
            nonSpaceActualTokens.push(actualWords[i]);
        }
    }

    let operations = shortestWay(nonSpaceUserTokens, nonSpaceActualTokens);
    for (let i = 0; i < operations.length; i++) {
        operations[i].index = actualTokensMap[operations[i].index];
        if (operations[i].oldIndex !== undefined) {
            operations[i].oldIndex = userTokensMap[operations[i].oldIndex];
        }
    }

    const goodWords = Array(actualWords.length).fill(true);
    operations.forEach(operation => {
        if (operation.type === "add") {
            let index = operation.index;
            goodWords[index] = false;
        }
        if (operation.type === "change") {
            let index = operation.index;
            goodWords[index] = false;
        }
    });

    const newRes = goodWords.map((goodWord, i) => {
        if (actualWords[i] === "\n") {
            return <br key={i}/>
        } else {
            if (goodWord) {
                return <span key={i}>{actualWords[i]}</span>;
            } else {
                return (
                    <span key={i} style={{backgroundColor: 'yellow'}}>
                        {actualWords[i]}
                    </span>
                );
            }
        }
    });


    return newRes;
}

function getLanguageCorrectionSystemMessage(language, correctionType) {
    if (correctionType === "grammar") {
        return "You're CorrectGPT.\n" +
            "You fix grammar and spelling mistakes in " + codeToLanguage(language) + "\n" +
            "Please only fix grammar and spelling mistakes in the user message\n" +
            "Your reply should contain ONLY the corrected text, nothing else." +
            "Please use exactly the same formatting as the original text.\n"
    }
    if (correctionType === "professional") {
        return "You're ImproveGPT.\n" +
            "You improve the provided " + codeToLanguage(language) + " text language-wise: improve the vocabulary, make it look more professional" + "\n" +
            "Your reply should contain ONLY the corrected text, nothing else."
    }
}

function getLanguageCorrectionExamples(language, correctionType) {
    if (correctionType === "grammar") {
        if (language === "en") {
            return [
                [
                    "He don't like it",
                    "He doesn't like it"
                ],
                [
                    "GPT does supports multiple languages without any isses but problem is with search engine. The best models for saerch are English-only. Obviously, there are mulrtilingual models (including OpenAI embeddings) but they will yield more bad search quality.",
                    "GPT does support multiple languages without any issues but the problem is with the search engine. The best models for search are English-only. Obviously there are multilingual models (including OpenAI embeddings) but they will yield worse search quality. "
                ]
            ]
        } else if (language === "ru") {
            return [
                [
                    "Моё сердце болет благодаря той девушке",
                    "Моё сердце болит из-за той девушки"
                ],
                [
                    "нм нужно уйти но она не можт найти её обувь",
                    "нам нужно уходить, но она не может найти свою обувь"
                ],
                [
                    "эта тарлека - грязная, поэтому мне нужно её мыть",
                    "эта тарелка грязная, поэтому мне нужно её вымыть"
                ],
                [
                    "ятромеханика, это старый вид физики но учёные больше не её исследовают",
                    "ятромеханика - это старый вид физики, но учёные больше ей не занимаются"
                ],
                [
                    "Я очень люблю всех животных. я могу сказать что я люблю все виды животных - от хомяков, собак, кошек, попугаев, до змей. у меня есть две домашние животные. Четыре месяца назад Бабушкина кошка родила моя два кота. Они зовут Маза и Макс, им четыре месяцев. Они оба ещё маленькие, у Макса есть очень длинная и густая шерсть, хотя у Мазы короткая шерсть. Маза и Макс - умние кошки, когда я говорю с ими они меня всегда понимают. Цвет шерсти у их коричневый-белый, глаза зелёные. Когда они были ещё маленькие, они были очень шустрым, мы не могли за ними уследить. Куда бы мы ни пошли, мы всегда берем их со собой. Они появились ко мне от кошки моей бабушки. О им заботиться я и мой папа. Я их кормлю дважды в день а мой папа их выгуливает один раз в день. их любимая игрушка - пластиковая мышь. Я очень люблю своих зеленоглазых кошек",
                    "Я очень люблю всех животных. я могу сказать что я люблю все виды животных - от хомяков, собак, кошек, попугаев, до змей. у меня есть двое домашних животных. Четыре месяца назад бабушкина кошка родила моих двух котов. Их зовут Маза и Макс, им четыре месяца. Они оба ещё маленькие, у Макса очень длинная и густая шерсть, хотя у Мазы короткая шерсть. Маза и Макс - умные кошки, когда я говорю с ними они меня всегда понимают. Цвет шерсти у их коричнево-белый, глаза зелёные. Когда они были ещё маленькими, они были очень шустрыми, мы не могли за ними уследить. Куда бы мы ни пошли, мы всегда берем их с собой. Они появились у меня от кошки моей бабушки. О них заботимся я и мой папа. Я их кормлю дважды в день, а мой папа их выгуливает один раз в день. Их любимая игрушка - пластиковая мышь. Я очень люблю своих зеленоглазых кошек",
                ]
            ]
        }
    } else {
        if (language === "en") {
            return [
                [
                    "You must use a neural network for this problem",
                    "I believe it would be better to employ some deep learning techniques to tackle this problem"
                ],
                [
                    "wow, my first thought was \"i want to 3d print that\" but i wouldnt know the first thing about doing this myself, generating an .stl file (or any other, .obj, .step, etc.) using javascript sounds kinda hard lmao",
                    "Upon encountering the object, my initial inclination was to create a 3D printed replica; however, I lack the expertise required to generate an .stl, .obj, or .step file using JavaScript, which seems to be a rather complex endeavor."
                ]
            ]
        }
        if(language === "ru"){
            return [
                [
                    "я обожаю кодить на питоне всякие прикольные ML-штуки",
                    "Мне очень нравится разрабатывать интересные приложения с использованием машинного обучения на языке Python"
                ],
                [
                    "wow, my first thought was \"i want to 3d print that\" but i wouldnt know the first thing about doing this myself, generating an .stl file (or any other, .obj, .step, etc.) using javascript sounds kinda hard lmao",
                    "Upon encountering the object, my initial inclination was to create a 3D printed replica; however, I lack the expertise required to generate an .stl, .obj, or .step file using JavaScript, which seems to be a rather complex endeavor."
                ]
            ]
        }
    }

    return []
}

function correct(message, correctionType, doUseGPT4, language, onPartialResponse, onFullResponse, onError) {
    let key = getSettingsKey()
    let m = "gpt-3.5-turbo"
    if (doUseGPT4) {
        m = "gpt-4"
    }

    let prompt = []

    let examples = getLanguageCorrectionExamples(language, correctionType)
    for (let i = 0; i < examples.length; i++) {
        prompt.push(
            {
                "role": "user",
                "content": examples[i][0]
            }
        )
        prompt.push(
            {
                "role": "assistant",
                "content": examples[i][1]
            }
        )
    }

    prompt.push(
        {
            "role": "system",
            "content": getLanguageCorrectionSystemMessage(language, correctionType)
        }
    )

    prompt.push(
        {
            "role": "user",
            "content": message
        }
    )


    callGPT4APIJSStreaming(m, key, prompt, 0, 1000,
        (response) => {
            let comparison = compareText(message, response)
            let res = comparison
            onFullResponse(res)
        },
        (response) => {
            let targetLanguage = codeToLanguage(language)
            //let div1 = <Markdown>{`Detected language: **${targetLanguage}**`}</Markdown>

            let actualWords = tokenize(response)
            const newRes = actualWords.map((goodWord, i) => {
                if (actualWords[i] === "\n") {
                    return <br key={i}/>
                } else {

                    return (
                        <span key={i}>
                        {actualWords[i]}
                    </span>
                    );

                }
            });


            //let div2 = <Markdown>{response}</Markdown>
            let res = <div>{newRes}</div>
            onPartialResponse(res)
        }
        , onError);
}


export default correct;
