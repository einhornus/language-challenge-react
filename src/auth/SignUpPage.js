import React, {useState} from 'react';
import './SignUpPage.css';
import {
    setSettingsLogin,
    getSettingsLogin,
    setSettingsPassword,
    getSettingsPassword, setSettingsSignedUp
} from "./../settings_manager/settings.js"
import './SignUpPage.css';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {callGPT4} from "../gpt4/api";

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let previousPage = searchParams.get('from');
    if (previousPage === null) {
        previousPage = ""
    }

    /*
    callGPT4("gpt-3.5-turbo", [
            {
                "role": "system",
                "content": "You translate user messages from English to Dutch. Please make the translation sound as natural as possible."
            },
            {
                "role": "user",
                "content": "Underneath the majestic canopy of the old oak tree, a young girl named Lucy sat reading. The pages of her book fluttered gently in the warm summer breeze. The sun was setting, painting the sky with hues of pink and gold, transforming the day into a captivating tableau. Nearby, a stream gurgled merrily, its melody harmonizing with the occasional trills of birds. The world seemed to be steeped in a tranquil symphony, inviting Lucy deeper into her story, creating an enchanting haven from the chaos of life.\""
            }
        ], 0, -1, (response) => {
            console.log("full", response);
        },
        (progress) => {
            console.log("progress: " + progress);
        },
        (error) => {
            console.log("error: " + error);
        });
    */

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const handleConfirmationCodeChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const sendConfirmationCode = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/send_confirmation_code?email=${email}`)
            .then(response => {
                console.log(response.data);
                if (response.data["status"] === "success") {
                    alert("Confirmation code sent to " + email);
                } else {
                    alert(response.data["error"])
                }
            })
            .catch(error => {
                alert("Error: " + error)
            });
    };

    const signUp = () => {
        if (!isValidPassword(password)) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }
        axios.get(`${process.env.REACT_APP_SERVER_URL}/sign_up?email=${email}&password=${password}&confirmation_code=${confirmationCode}`)
            .then(response => {
                if (response.data["status"] === "ok") {
                    alert("Signed up successfully");
                    setSettingsLogin(email);
                    setSettingsPassword(password);
                    setSettingsSignedUp(true)
                    window.location.assign("/" + previousPage);
                } else {
                    alert(response.data["error"])
                }
            })
            .catch(error => {
                alert("Error: " + error)
            });
    };

    return (
        <div className="sign-up-page">
            <input type="email" id="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
            <br></br>
            <button disabled={!isValidEmail(email)} onClick={sendConfirmationCode}>Get the confirmation code</button>
            <input type="text" placeholder="Email confirmation code" value={confirmationCode}
                   onChange={handleConfirmationCodeChange}/>
            <br></br>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
            <input type="password" placeholder="Confirm password" value={passwordConfirmation}
                   onChange={handlePasswordConfirmationChange}/>
            <br></br>
            <button onClick={signUp}>Sign Up</button>
            <br></br>
            <p>Already have an account? <a href={"/sign_in?from=" + previousPage}>Sign in</a></p>
        </div>
    );
}

export default SignUpPage;