import {codeToLanguage} from "./language_utils";

let markingBegin = "**";
let markingEnd = "**";

let examples = [
    {
        "targetLanguage": "ru",
        "nativeLanguage": "en",
        "sentence": "Я **снял** 1000 долларов с банковского счета",
        "word": "снял",
        "output": "Meaning: [Я <mark>снял<mark> 1000 долларов ...] = (I have <mark>withdrawn</mark> 1000 dollars ...)\n\n" +
            "The dictionary form of [снял] is [снять]\n\n" +
            "[снять] (verb, perfective):\n\n" +
            "1. to take off: [Я <mark>снял</mark> куртку] (I <mark>took off</mark> my jacket)\n" +
            "2. to take down: [Мы вчера <mark>сняли</mark> котёнка с дерева] (Yesterday we <mark>took</mark> a kitten <mark>down</mark> the tree)\n" +
            "3. to withdraw (money): [Я <mark>снял</mark> деньги] (I have <mark>withdrawn</mark> the money)\n" +
            "4. to film: [Они <mark>сняли</mark> видео] (They <mark>filmed</mark> a video)\n" +
            "5. to rent (housing; also a prostitute): [Мы <mark>сняли</mark> квартиру в Москве] (We rented</mark> an apartment in Moscow)\n\n" +
            "Related words: [снимать] (same but imperfective), [снятие] (withdrawal), [съёмка] (filming), [съёмный] (rented)"
    },
    {
        "targetLanguage": "ru",
        "nativeLanguage": "en",
        "sentence": "Ко мне подошла **маленькая** девочка и попросила автограф",
        "word": "маленькая",
        "output": "Meaning: [Ко мне подошла <mark>маленькая</mark> девочка ...] = (A <mark>young</mark> girl approached me ...)<br>" +
            "The dictionary form of [маленькая] is [маленький]<br>" +
            "[маленький] (adjective):<br>" +
            "1. small, little: [<mark>маленький</mark> дом] (a <mark>small</mark> house)<br>" +
            "2. young: [<mark>маленький</mark> ребенок] (a <mark>young</mark> child)<br>" +
            "Related words: [малый] (small, minor)<br>"
    },
    {
        "targetLanguage": "en",
        "nativeLanguage": "ru",
        "sentence": "The declaration of human **rights** was adopted by the United Nations General Assembly on December 10, 1948",
        "word": "rights",
        "output": "Перевод: Декларация **прав** человека была принята Генеральной Ассамблеей ООН 10 декабря 1948 года\n\n" +
            "**rights** - множественное число слова **right**\n\n" +
            "**right*** может значить:\n\n" +
            "1. право (юриспруденция): The **right** to live [Право на жизнь]\n" +
            "2. право (направление): Look to the **right**! [Посмотри **направо**!]\n" +
            "3. правильно/правильный: We did the **right** thing [Мы поступили **правильно**]\n" +
            "\nСвязанные слова: **left**(лево), **correct** (правильно)\n"
    },
]

function makeLinkifyPrompt(sentence, index, targetLanguage, nativeLanguage) {
    let message = ""
    for (let i = 0; i < sentence.length; i++) {
        if (i === index) {
            message += "**" + sentence[i] + "**"
        } else {
            message += sentence[i]
        }
    }

    let systemMessage = "You're LangGPT\n" +
        "You're given a sentence in " + codeToLanguage(targetLanguage) +
        " with one word highlighted.\n" +
        "Your task is to give the concise explanation on the highlighted word\n" +
        "Your reply should contain:\n" +
        "The translation of the small part of the sentence which contain the word \n" +
        "The dictionary form of the word\n" +
        "The possible meanings of the word with sentence examples. Please group up similar meanings together\n" +
        //"Its conjugation/declension if applicable\n" +
        "Some information on related words\n" +
        "Your reply should be mostly in " + codeToLanguage(nativeLanguage) + "\n" +
        "Enclose " + codeToLanguage(targetLanguage) + " words, phrases and sentences in square brackets: [word/phrase/sentence]\n"



    if (markingBegin !== "") {
        if (markingBegin !== markingEnd) {
            systemMessage += "\nEnclose the word " + sentence[index] + " and its translation into " + markingBegin + " and " + markingEnd + " tags: " + markingBegin + sentence[index] + markingEnd
        } else {
            systemMessage += "\nEnclose the word " + sentence[index] + " and its translation into " + markingBegin + " tags: " + markingBegin + sentence[index] + markingEnd
        }
    }


    let prompt = []
    let relevantExamples = []

    prompt.push({
        "role": "system",
        "content": systemMessage
    });

    for (let i = 0; i < examples.length; i++) {
        let example = examples[i]
        if (example.targetLanguage === targetLanguage && example.nativeLanguage === nativeLanguage) {
            relevantExamples.push({
                "role": "system",
                "content": "Context: " + example.sentence + "\nThe highlighted word: " + example.word,
                "name": "example_user"
            })
            relevantExamples.push({
                "role": "system",
                "content": example.output.replaceAll("<mark>", markingBegin).replaceAll("</mark>", markingEnd),
                "name": "example_assistant"
            })
        }
    }

    for (let i = 0; i < relevantExamples.length; i++) {
        prompt.push(relevantExamples[i])
    }

    prompt.push({
        "role": "user",
        "content": "Context: " + message + "\nThe highlighted word: " + sentence[index]
    })
    return prompt
}

export {makeLinkifyPrompt};