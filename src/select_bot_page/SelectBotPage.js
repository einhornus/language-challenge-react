import React, {Component} from 'react';
import axios from 'axios';
import './SelectBotPage.css'; // Import the stylesheet
import LanguageSelector from "../common_components/selectors/LanguageSelector"
import {useRef, useState} from 'react';

class SelectBoxPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatbots: [],
            selectedChatbotId: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTargetLanguageSelect = this.handleTargetLanguageSelect.bind(this);
        this.handleNativeLanguageSelect = this.handleNativeLanguageSelect.bind(this);
        this.targetLanguageRef = React.createRef()
        this.nativeLanguageRef = React.createRef()
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER_URL + '/get_all_chatbots')
            .then(response => {
                this.setState({chatbots: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({selectedChatbotId: event.target.value});
    }

    handleTargetLanguageSelect(language) {
        console.log('target', language)
    }

    handleNativeLanguageSelect(language) {
        console.log('native', language)
    }

    render() {
        const state = this.state;
        let self = this

        return (
            <div className="chatbot-selector">
                <div className="language-selectors">
                    <div>
                        <LanguageSelector ref = {self.targetLanguageRef} title={"Target language"} onLanguageSelect={this.handleTargetLanguageSelect} isSorted={true} isEnglish={true}/>
                    </div>
                    <div>
                        <LanguageSelector  ref = {self.nativeLanguageRef} title={"Native language"} onLanguageSelect={this.handleNativeLanguageSelect} isSorted={true} isEnglish={true}/>
                    </div>
                </div>

                <div className="chatbot-grid">
                    {state.chatbots.map((chatbot) => (
                        <div
                            key={chatbot.id}
                            className={`chatbot-item ${
                                state.selectedChatbotId === chatbot.id ? 'selected' : ''
                            }`}
                            onClick={() => self.setState({selectedChatbotId: chatbot.id})}
                            onDoubleClick={() => {
                                let url = "/chat?bot_name="
                                url += state.chatbots[state.selectedChatbotId].name
                                if (state.targetLanguage !== null) {
                                    url += "&language=" + self.targetLanguageRef.current.getValue()
                                }
                                if (state.nativeLanguage !== null) {
                                    url += "&native=" + self.nativeLanguageRef.current.getValue()
                                }
                                url += "&max_tokens=500"
                                url += "&temperature=1.0"
                                url += "&correct=true"
                                console.log(url)
                                window.open(url, '_blank');
                            }}
                        >
                            <img src={process.env.REACT_APP_SERVER_URL + "/images/" + chatbot.name} alt={chatbot.name}/>
                            <span className="chatbot-name">{chatbot.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SelectBoxPage;