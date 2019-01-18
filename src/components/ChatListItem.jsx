import React, { Component } from 'react';
import { ListItem, Avatar, ListItemText } from '@material-ui/core';

class ChatListItem extends Component {
    render() {
        return (
            <ListItem
                button
                onClick={() => this.props.onChatItemClicked(this.props.chat_id)}
            >
                <Avatar src="/resources/BobSaget.jpg" />
                <ListItemText primary={this.props.name} />
            </ListItem>
        );
    }
}

export default ChatListItem;
