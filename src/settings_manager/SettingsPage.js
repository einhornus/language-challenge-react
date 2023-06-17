import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
    const [apiKey, setApiKey] = useState('');

    const handleChange = (e) => {
        setApiKey(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('API Key:', apiKey);
        //setSettingsKey(apiKey)
    };

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit} className="settings-form">
                <label htmlFor="apiKey" className="api-key-label">
                    OpenAI API Key:
                </label>
                <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={handleChange}
                    className="api-key-input"
                />
                <button type="submit" className="submit-button">
                    Save
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;