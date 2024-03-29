import axios from "axios";

function detect(text, onResponse, onError) {
    axios.post(process.env.REACT_APP_SERVER_URL + "/tokenize", {
        text: text,
    })
        .then((response) => {
            if (response.status === 200) {
                let data = response.data;
                if (data["status"] === "ok") {
                    onResponse(data["language"])
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

export {detect};