import React, { Component } from 'react';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';

class ChatPanel extends Component {
    componentDidMount() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className="mesgs">
                <div>
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="How are you?"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Good, Bob Saget, I'm having a great day"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="I'm glad!"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="How is your day?"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="My day is great, just working on some programming!"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Awesome! What are you programming?"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="I'm programming a cool chat application!!"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Does it use Comics Sans?"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="No, it uses Times New Roman"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Then my chat application is better, it is Comic Sans or nothing"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Ah you're right, I am going to change it to Comic Sans right away!"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Good, I am looking forward to trying your app!"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Thanks!! I think your Comic Sans Chat app is great!"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Thanks, I appreciate it!"
                        date={new Date()}
                    />
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
