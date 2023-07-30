import axios from "axios";

function tokenize(text, onResponse, onError) {
    axios.post(process.env.REACT_APP_SERVER_URL + "/tokenize", {
        text: text,
    })
        .then((response) => {
            if (response.status === 200) {
                let data = response.data;
                if (data["status"] === "ok") {
                    onResponse(data["tokens"])
                } else {
                    onError(data["error"])
                }
            } else {
                onError(response.status.toString())
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 500) {
                onError("Server error");
            } else {
                // Handle any other errors here
                onError("Unexpected error");
            }
        });
}

function tokenizeLocal(text, languageCode = "en", granularity = 'word') {
    const segmenter = new Intl.Segmenter(languageCode, {granularity: granularity});
    const segments = segmenter.segment(text);
    const words = [];
    for (const segment of segments) {
        words.push(segment.segment);
    }
    return words;
}

export {tokenize, tokenizeLocal};