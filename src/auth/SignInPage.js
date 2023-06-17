import React, {useState} from 'react';
import './SignInPage.css';

import {
    setSettingsLogin,
    getSettingsLogin,
    setSettingsPassword,
    getSettingsPassword
} from "./../settings_manager/settings.js"

import axios from "axios";
import {useLocation} from 'react-router-dom';

function getBalance(email = "", password = "", onSuccess, onFailure) {
    if (email === "") {
        email = getSettingsLogin();
    }
    if (password === "") {
        password = getSettingsPassword();
    }
    axios.get(`${process.env.REACT_APP_SERVER_URL}/get_balance?email=${email}&password=${password}`)
        .then(response => {
            console.log(response.data);
            if (response.data["status"] === "ok") {
                onSuccess(response.data["balance"]);
            } else {
                onFailure(response.data["error"])
            }
        })
        .catch(error => {
            onFailure(error)
        });
}

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let previousPage = searchParams.get('from');
    if (previousPage === null) {
        previousPage = ""
    }

    const handleSubmit = (e) => {
        getBalance(email, password, (balance) => {
            setSettingsLogin(email);
            setSettingsPassword(password);
            window.location.assign("/" + previousPage);
        }, (error) => {
            alert(error);
        });
        e.preventDefault();
    }

    return (
        <div className="sign-in-page">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>

                <p>Don't have an account? <a href={"/sign_up?from=" + previousPage}>Sign up</a></p>
            </form>
        </div>
    );
}

export {SignInPage, getBalance};