import React, { Component } from 'react';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import firebase from '../util/firebase';
import { setupChatCallback } from '../util/websocket';

import { BASE_URL } from '../util/settings';

class ChatPanel extends Component {
    state = { messages: [] };

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.startTime !== this.state.startTime) {
            this.setState({ startTime: nextProps.startTime });
        }

        if (nextProps.chat_id && firebase.auth().currentUser) {
            firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(token => {
                    fetch(
                        `${BASE_URL}/api/chats/messages/${nextProps.chat_id}`,
                        {
                            headers: {
                                authorization: token
                            }
                        }
                    )
                        .then(res => {
                            return res.json();
                        })
                        .then(json => {
                            this.setState({ messages: json });
                            this.messagesEnd.scrollIntoView({
                                behavior: 'smooth'
                            });
                        });
                });
        }
    }

    componentDidMount() {
        setupChatCallback(message => {
            const { messages } = this.state;
            messages.push(message);
            this.setState({ messages });
            this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
        });
    }

    renderMessages() {
        if (firebase.auth().currentUser) {
            const { messages } = this.state;
            let messagesObj = [];
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].Owner === firebase.auth().currentUser.uid) {
                    messagesObj.push(
                        <OutgoingMessage
                            message={messages[i].Message}
                            date={
                                new Date(
                                    messages[i].Time_Sent.replace(' ', 'T')
                                )
                            }
                        />
                    );
                } else {
                    messagesObj.push(
                        <IncomingMessage
                            message={messages[i].Message}
                            date={
                                new Date(
                                    messages[i].Time_Sent.replace(' ', 'T')
                                )
                            }
                            name={messages[i].name}
                            profilePicture={messages[i].profile_picture}
                        />
                    );
                }
            }

            return messagesObj;
        }
    }

    render() {
        return (
            <div className="mesgs">
                <div>
                    {this.renderMessages()}
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ChatPanel;
