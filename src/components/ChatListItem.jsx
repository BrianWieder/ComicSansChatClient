import React, { Component } from 'react';
import { Card, ListItem, Avatar, ListItemText } from '@material-ui/core';

const styles = {
    divStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameStyle: {
        marginLeft: 80,
        marginTop: 35,
        height: 45
    },
    profilePictureStyle: {
        position: 'absolute',
        float: 'left',
        marginTop: 0,
        marginLeft: 10,
        marginBottom: 20
    }
};

class ChatListItem extends Component {
    render() {
        return (
            <ListItem button>
                <Avatar src="/resources/BobSaget.jpg" />
                <ListItemText primary={`Bob Saget`} />
            </ListItem>
        );
    }
}

export default ChatListItem;
