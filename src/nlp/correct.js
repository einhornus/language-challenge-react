import {callGPT4} from "./../gpt4/api.js"
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


/**
 * Given two string arrays, computes the minimal edit sequence of substitutions, insertion and deletion operations
 * required to transform the first array into the second one
 *
 * @param {string[]} text1 - The first input array.
 * @param {string[]} text2 - The second input array.
 * @returns {Object[]} operations - The array of operations to transform text1 into text2.
 */
function computeEditSequence(text1, text2) {
    // Store the lengths of the two input arrays.
    const m = text1.length, n = text2.length;

    // Initialize a 2D matrix for dynamic programming, where dp[i][j] will
    // hold the minimal edit distance between the substrings text1[0...i-1] and text2[0...j-1].
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    // Set the base cases for the dynamic programming matrix.
    // If text1 is empty, then the distance is the length of text2 (all insertions).
    // If text2 is empty, then the distance is the length of text1 (all deletions).
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Iterate through the matrix, computing the minimal edit distances.
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If the current words are the same,
            // no operation is needed, and the distance remains the same.
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // If the current words are different, the minimal distance is
                // determined by the minimum of the three previous distances, plus 1.
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
        }
    }

    // Backtrack through the matrix to find the sequence of operations.
    let i = m, j = n;
    const operations = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && text1[i - 1] === text2[j - 1]) {
            // If the words are the same, move diagonally up-left.
            i--;
            j--;
        } else {
            if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
                // If the minimal distance comes from the left, it's a deletion operation.
                let operation = {
                    'type': "delete",
                    'word': text1[i - 1],
                    'index': i - 1,
                }
                operations.push(operation);
                i--;
            } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
                // If the minimal distance comes from above, it's an insertion operation.
                let operation = {
                    'type': "insert",
                    'word': text2[j - 1],
                    'index': j - 1,
                }
                operations.push(operation);
                j--;
            } else {
                // If the minimal distance comes from the diagonal, it's a substitution operation.
                let operation = {
                    'type': "substitute",
                    'word': text2[j - 1],
                    'index': j - 1,
                    'originalIndex': i - 1,
                    'originalWord': text1[i - 1],
                }
                operations.push(operation);
                i--;
                j--;
            }
        }
    }

    // Return the array of operations to transform text1 into text2.
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

    let operations = computeEditSequence(nonSpaceUserTokens, nonSpaceActualTokens);
    for (let i = 0; i < operations.length; i++) {
        operations[i].index = actualTokensMap[operations[i].index];
        if (operations[i].oldIndex !== undefined) {
            operations[i].oldIndex = userTokensMap[operations[i].oldIndex];
        }
    }

    const goodWords = Array(actualWords.length).fill(true);
    const hints = Array(actualWords.length).fill("");
    operations.forEach(operation => {
        if (operation.type === "insert") {
            let index = operation.index;
            hints[index] = "Added";
            goodWords[index] = false;
        }
        if (operation.type === "substitute") {
            let index = operation.index;
            hints[index] = operation.originalWord + " → " + operation.word;
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
                    <span key={i} title={hints[i]} style={{backgroundColor: 'yellow'}}>
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
            "\n" +
            "You're the best proofreading tool in the world.\n" +
            "\n" +
            "You fix grammar and spelling mistakes in {language} texts.\n" +
            "\n" +
            "Please only fix grammar and spelling mistakes in the given user message.\n" +
            "\n" +
            "Your reply should contain ONLY the corrected text, nothing else.\n" +
            "\n" +
            "Please use exactly the same formatting as the original text."
    }
    if (correctionType === "natural") {
        return "You're ImproveGPT.\n" +
            "You improve the provided " + codeToLanguage(language) + " text language-wise: you fix grammar and spelling mistakes and make it sound more natural.\n" +
            "Your reply should contain ONLY the corrected text, nothing else.\n"+
            "Please use exactly the same formatting as the original text\n"
    }
}

function getLanguageCorrectionExamples(language, correctionType, model) {
    if (correctionType === "grammar") {
        if (language === "en") {
            return [
                [
                    "He don't like it",
                    "He doesn't like it"
                ],
                [
                    "shame\nI`m very a shame for my english (\nIt was incredibly hard, try write in this language.\nPlease, not judge strictly =)\nAll day it was snowing.\nThe Snowdrifts is beautiful, but I can not enjoy them fully.\nI`m sitting at home because of illness.",
                    "Shame\nI'm very ashamed of my English.\nIt's incredibly hard to try to write in this language.\nPlease do not judge too harshly =)\nAll day it was snowing.\nThe snowdrifts were beautiful, but I could not fully enjoy them.\nI'm at home because of illness."
                ]
            ]
        } else if (language === "ru") {
            if (model === "gpt-3.5-turbo") {
                return [
                    [
                        "Моё сердце болет благодаря той девушке",
                        "Моё сердце болит из-за той девушки"
                    ],
                    [
                        "В резьлутате, носителям языка меньшеств приходится выбросить либо потребности идентичности, либо потребности взаймопонимания.",
                        "В результате, носителям языка меньшинств приходится выбирать либо потребности идентичности, либо потребности взаимопонимания."
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
                        "Я очень люблю всех животных. я могу сказать, что я люблю все виды животных - от хомяков, собак, кошек, попугаев, до змей. у меня есть двое домашних животных. Четыре месяца назад бабушкина кошка родила моих двух котов. Их зовут Маза и Макс, им четыре месяца. Они оба ещё маленькие, у Макса очень длинная и густая шерсть, хотя у Мазы короткая шерсть. Маза и Макс - умные кошки, когда я говорю с ними, они меня всегда понимают. Цвет шерсти у них коричнево-белый, глаза зелёные. Когда они были ещё маленькими, они были очень шустрыми, мы не могли за ними уследить. Куда бы мы ни пошли, мы всегда берем их с собой. Они появились у меня от кошки моей бабушки. О них заботимся я и мой папа. Я их кормлю дважды в день, а мой папа их выгуливает один раз в день. Их любимая игрушка - пластиковая мышь. Я очень люблю своих зеленоглазых кошек",
                    ],
                    [
                        "В языковой сфере существуют два варианта потребности - идентичности и взаймопонимания. Лишь одноязычное общество может удовретволять обе потребовоние, но такое общество никогда не бывает на свете, поэтому государством нужно создать языковую политику, подчеркивая потребности взаймопанимания",
                        "В языковой сфере существуют две потребности - идентичности и взаимопонимания. Лишь одноязычное общество может удовлетворять обе потребности, но такое общество никогда не бывает на свете, поэтому государству нужно создать языковую политику, подчеркивая потребности взаимопонимания"
                    ]
                ]
            }
            else{
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
                    ]
                ]
            }
        }
    } else {
        if (language === "en") {
            if(model === "gpt-3.5-turbo") {
                return [
                    [
                        "As far as our portals are Eng-based, so I deem it is not necssary to expect some language packs over English",
                        "Since our portal is English-based, I don't think it's necessary to have language packs besides English."
                    ],
                    [
                        "GPT does supports multiple languages without any isses but problem is with search engine. The best models for saerch are English-only. Obviously, there are mulrtilingual models (including OpenAI embeddings) but they will yield more bad search quality.",
                        "GPT is indeed capable of supporting multiple languages seamlessly, but the issue lies with the search engine. The most effective models for search are English-only. While there are multilingual models available (including OpenAI embeddings), they will yield inferior search quality."
                    ]
                ]
            }
            else{
                return [
                    "As far as our portals are Eng-based, so I deem it is not necssary to expect some language packs over English",
                    "Since our portal is English-based, I don't think it's necessary to have language packs besides English."
                ]
            }
        }
        if (language === "ru") {
            if(model === "gpt-3.5-turbo") {
                return [
                    [
                        "нм нужно уйти но она не можт найти её обувь",
                        "нам нужно уходить, но она не может найти свою обувь"
                    ],
                    [
                        "эта тарлека - грязная, поэтому мне нужно её мыть",
                        "эта тарелка грязная, поэтому мне нужно её вымыть"
                    ],
                    [
                        "я хочу купить новую машину, но мне нужно продать свою старую машину",
                        "я хочу купить новую машину, но мне нужно сначала продать свою старую"
                    ],
                    [
                        "кто мог продать мне ниссан фронтир по хорошая цена?",
                        "кто мог бы продать мне Nissan Frontier по хорошей цене?"
                    ],
                    [
                        "В резьлутате, носителям языка меньшеств приходится выбросить либо потребности идентичности, либо потребности взаймопонимания.",
                        "В результате, представителям языковых меньшинств приходится выбирать между потребностями идентичности и потребностями взаимопонимакния."
                    ],
                    [
                        "Я очень люблю всех животных. я могу сказать что я люблю все виды животных - от хомяков, собак, кошек, попугаев, до змей. у меня есть две домашние животные. Четыре месяца назад Бабушкина кошка родила моя два кота. Они зовут Маза и Макс, им четыре месяцев. Они оба ещё маленькие, у Макса есть очень длинная и густая шерсть, хотя у Мазы короткая шерсть. Маза и Макс - умние кошки, когда я говорю с ими они меня всегда понимают. Цвет шерсти у их коричневый-белый, глаза зелёные. Когда они были ещё маленькие, они были очень шустрым, мы не могли за ними уследить. Куда бы мы ни пошли, мы всегда берем их со собой. Они появились ко мне от кошки моей бабушки. О им заботиться я и мой папа. Я их кормлю дважды в день а мой папа их выгуливает один раз в день. их любимая игрушка - пластиковая мышь. Я очень люблю своих зеленоглазых кошек",
                        "Я очень люблю всех животных. я могу сказать, что я люблю все виды животных - от хомяков, собак, кошек, попугаев, до змей. у меня есть двое домашних животных. Четыре месяца назад кошка моей бабушки родила двух котят. Их зовут Маза и Макс, им по четыре месяца. Они оба ещё маленькие. У Макса очень длинная и густая шерсть, хотя у Мазы - короткая. Маза и Макс - умные кошки, когда я говорю с ними, они всегда меня понимают. Цвет шерсти у них коричнево-белый, глаза зелёные. Когда они были ещё маленькими, они были очень шустрыми, мы не могли за ними уследить. Куда бы мы ни пошли, мы всегда берем их с собой. Их родила кошка моей бабушки. Мы с моим папой заботимся о них. Я их кормлю дважды в день, а мой папа их выгуливает один раз в день. их любимая игрушка - пластиковая мышь. Я очень люблю своих зеленоглазых кошек",
                    ],
                    [
                        "В языковой сфере существуют два варианта потребности - идентичности и взаймопонимания. Лишь одноязычное общество может удовретволять обе потребовоние, но такое общество никогда не бывает на свете, поэтому государством нужно создать языковую политику, подчеркивая потребности взаймопанимания",
                        "В языковой сфере существуют две основные потребности - идентичности и взаимопонимания. Лишь моноязычное общество может удовлетворять обе потребности, но таких обществ не существует. Из-за этого государству нужно осуществлять языковую политику, которая делает акцент на взаимопонимании"
                    ]
                ]
            }
            else{
                return [
                    [
                        "нм нужно уйти но она не можт найти её обувь",
                        "нам нужно уходить, но она не может найти свою обувь"
                    ],
                    [
                        "эта тарлека - грязная, поэтому мне нужно её мыть",
                        "эта тарелка грязная, поэтому мне нужно её вымыть"
                    ],
                    [
                        "я хочу купить новую машину, но мне нужно продать свою старую машину",
                        "я хочу купить новую машину, но мне нужно сначала продать свою старую"
                    ],
                    [
                        "кто мог продать мне ниссан фронтир по хорошая цена?",
                        "кто мог бы продать мне Nissan Frontier по хорошей цене?"
                    ]
                ]
            }
        }
    }

    return []
}

function correct(message, correctionType, doUseGPT4, language, onPartialResponse, onFullResponse, onError) {
    let m = "gpt-3.5-turbo"
    if (doUseGPT4) {
        m = "gpt-4"
    }

    let prompt = []

    let examples = getLanguageCorrectionExamples(language, correctionType, m)
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


    callGPT4(m, prompt, 0, -1,
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
