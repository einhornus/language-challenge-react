import {codeToLanguage} from "./language_utils";

let examples = [
    {
        "targetLanguage": "ru",
        "nativeLanguage": "en",
        "sentence": "Я **снял** 1000 долларов с банковского счета",
        "word": "снял",
        "output": "Meaning: [Я **снял** 1000 долларов ...] = (I have **withdrawn** 1000 dollars ...)\n\n" +
            "The dictionary form of [**снял**] is [**снять**]\n\n" +
            "[**снять**] (verb, perfective, corresponding imperfective verb is [снимать]):\n\n" +
            "1. to take off: [Я **снял** куртку] (I **took off** my jacket)\n" +
            "2. to take down: [Мы вчера **сняли** котёнка с дерева] (Yesterday we **took** a kitten **down** the tree)\n" +
            "3. to withdraw (money): [Я **снял** деньги] (I have **withdrawn** the money)\n" +
            "4. to film: [Они **сняли** видео] (They **filmed** a video)\n" +
            "5. to rent (housing; also a prostitute): [Мы **сняли** квартиру в Москве] (We **rented** an apartment in Moscow)\n\n" +
            "Related words: [**снятие**] (withdrawal), [**съёмка**] (filming), [**съёмный**] (rented)\n\n"
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
                "content": example.output,
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