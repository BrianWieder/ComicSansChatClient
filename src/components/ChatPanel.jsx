import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';

const styles = {
    msgHistory: {
        flex: 1,
        overflow: 'scroll'
    }
};

class ChatPanel extends Component {
    render() {
        return (
            <div className="mesgs">
                <div>
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Boi you think u funny but your hairline is lookin like the Mc.Donalds Symbol"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Ted Cruz ate my family"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                    <IncomingMessage
                        profilePicture="/resources/BobSaget.jpg"
                        message="Testing Testing 123"
                        name="Bob Saget"
                        date={new Date()}
                    />
                    <OutgoingMessage
                        message="Hello Bob Saget"
                        date={new Date()}
                    />
                </div>
            </div>
        );
    }
}

export default ChatPanel;
