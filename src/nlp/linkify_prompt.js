import {codeToLanguage} from "./language_utils";

let examples = [
    {
        "targetLanguage": "es",
        "nativeLanguage": "en",
        "sentence": "El gato saltó sobre el tejado y **desapareció** en la oscuridad de la noche",
        "word": "desapareció",
        "output": "1. **desapareció** is third-person singular of **desaparecer**\n" +
            "2. **desaparecer** here means **to disappear**\n" +
            "3. **desaparecer** can also mean *to vanish, to fade away, to go away, to be lost, to be gone, to be missing, to be absent*:\n" +
            "- Mis llaves han **desaparecido** [My keys have disappeared]\n" +
            "- El dinero **desapareció** [The money vanished]\n" +
            "4. **desaparecer** comes from des- (negative prefix) and aparecer (to appear)\n"
    },
    {
        "targetLanguage": "ru",
        "nativeLanguage": "en",
        "sentence": "Я **снял** 1000 долларов с банковского счета",
        "word": "снял",
        "output": "1. Translation: I have **withdrawn** 1000 dollars from my bank account\n" +
            "2. The dictionary form of **снял** is **снять**\n" +
            "3. **снять***:\n" +
            "- to take off: Я **снял** куртку [I **took off** my jacket]\n" +
            "- to take down: Мы вчера **снимали** котёнка с дерева [Yesterday we were **taking** a kitten **down** the tree]\n" +
            "- to withdraw (money): Я **снял** деньги [I have **withdrawn** the money]\n" +
            "- to film: Они **сняли** видео [They **filmed** a video]\n" +
            "- to rent (housing; also a prostitute): Мы **сняли** квартиру в Москве [We **rented** an apartment in Moscow]\n" +
            "4. Related words: **снятие**(withdrawal), **съёмка** (filming), **съёмный** (rented)\n"
    },
    {
        "targetLanguage": "en",
        "nativeLanguage": "ru",
        "sentence": "The declaration of human **rights** was adopted by the United Nations General Assembly on December 10, 1948",
        "word": "rights",
        "output": "1. Перевод: Декларация **прав** человека была принята Генеральной Ассамблеей ООН 10 декабря 1948 года\n\n" +
            "2. **rights** - множественное число слова **right**\n" +
            "3. **right*** может значить:\n" +
            "- право (юриспруденция): The **right** to live [Право на жизнь]\n" +
            "- право (направление): Look to the **right**! [Посмотри **направо**!]\n" +
            "- правильно/правильный: We did the **right** thing [Мы поступили правильно]\n" +
            "4. Связанные слова: **left**(лево), **correct** (правильно)\n"
    }
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
        "1. The translation of the context sentence\n" +
        "2. The dictionary form of the word\n" +
        "3. The possible meanings of the word with sentence examples\n" +
        "4. Some information on related words\n" +
        "Your reply should be mostly in " + codeToLanguage(nativeLanguage)

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