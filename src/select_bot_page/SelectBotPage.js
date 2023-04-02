import React, { Component } from 'react';
import axios from 'axios';
import './SelectBotPage.css'; // Import the stylesheet

class SelectBoxPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatbots: [],
            selectedChatbotId: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_SERVER_URL + '/get_all_chatbots')
            .then(response => {
                this.setState({ chatbots: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        this.setState({ selectedChatbotId: event.target.value });
    }

    render() {
        const { chatbots, selectedChatbotId } = this.state;

        return (
            <div className="chatbot-selector">
                <h2>Choose a chatbot to talk to:</h2>
                <div className="chatbot-grid">
                    {chatbots.map((chatbot) => (
                        <div
                            key={chatbot.id}
                            className={`chatbot-item ${
                                selectedChatbotId === chatbot.id ? 'selected' : ''
                            }`}
                            onClick={() => this.setState({ selectedChatbotId: chatbot.id })}
                        >
                            <img src={chatbot.imageUrl} alt={chatbot.name} />
                            <span className="chatbot-name">{chatbot.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SelectBoxPage;