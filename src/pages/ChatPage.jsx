import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, ListItem, ListItemText, Avatar } from '@material-ui/core';

import ChatListItem from '../components/ChatListItem';
import ChatPanel from '../components/ChatPanel';
import NewChat from '../components/NewChat';
import firebase from '../util/firebase';
import { sendChat } from '../util/websocket';
import { BASE_URL } from '../util/settings';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        height: '100vh',
        flex: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

const drawerWidth = 240;

class ClippedDrawer extends Component {
    state = {
        shouldShowNewChat: false,
        chats: [],
        current_chat_id: undefined,
        gotChats: false
    };

    getChats() {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                fetch(`${BASE_URL}/api/chats`, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    }
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(json => {
                        let current_chat = undefined;
                        if (json.length > 0) {
                            current_chat = json[0].Chat_ID;
                        }
                        this.setState({
                            chats: json,
                            current_chat_id: current_chat
                        });
                    });
            });
    }

    render() {
        const { classes, user } = this.props;
        const { shouldShowNewChat } = this.state;

        if (firebase.auth().currentUser && !this.state.gotChats) {
            this.setState({ gotChats: true });
            this.getChats();
        }

        if (Object.keys(user).length === 0) {
            this.props.history.push('/Login');
        }

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            noWrap
                            style={{ flex: 1 }}
                        >
                            Comic Sans Chat
                        </Typography>

                        <Button
                            label="Default"
                            style={{ textTransform: 'none', color: 'white' }}
                            onClick={this.signOut.bind(this)}
                        >
                            {user.email || ''}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <List style={{ marginTop: 60 }}>
                        <ListItem
                            button
                            onClick={() =>
                                this.setState({ shouldShowNewChat: true })
                            }
                        >
                            <Avatar>
                                <ChatIcon />
                            </Avatar>
                            <ListItemText primary={`Create new Chat`} />
                        </ListItem>
                        <Divider />
                        {this.renderChats()}
                    </List>
                </Drawer>
                {shouldShowNewChat ? this.renderNewChat() : this.renderChat()}
            </div>
        );
    }

    onChatCreated() {
        this.setState({ shouldShowNewChat: false });
        this.getChats();
    }

    renderChats() {
        let chats = [];
        for (let i = 0; i < this.state.chats.length; i++) {
            chats.push(
                <div key={this.state.chats[i]['Chat_ID']}>
                    <ChatListItem
                        chat_id={this.state.chats[i]['Chat_ID']}
                        onChatItemClicked={chat_id =>
                            this.onChatItemClicked(chat_id)
                        }
                        name={this.state.chats[i]['chat_name']}
                    />
                    <Divider />
                </div>
            );
        }
        return chats;
    }

    onChatItemClicked(chat_id) {
        this.setState({ shouldShowNewChat: false, current_chat_id: chat_id });
    }

    signOut() {
        firebase.auth().signOut();
    }

    navigateToLogin() {
        this.props.history.push('/Login');
    }

    renderNewChat() {
        const { classes } = this.props;

        const containerStr = `${classes.content} main-content`;
        return (
            <main className={containerStr}>
                <NewChat onNewChat={this.onChatCreated.bind(this)} />
            </main>
        );
    }

    sendChatTest() {
        const { inputText, current_chat_id } = this.state;

        if (inputText) {
            sendChat(current_chat_id, inputText);
            this.setState({ inputText: '' });
        }
    }

    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.sendChatTest();
        }
    };

    renderChat() {
        const { classes } = this.props;

        const containerStr = `${classes.content} main-content`;
        return (
            <main className={containerStr}>
                <div />
                <ChatPanel chat_id={this.state.current_chat_id} />
                <div className="type_msg">
                    <div className="input_msg_write">
                        <input
                            type="text"
                            className="write_msg"
                            placeholder="Type a message"
                            onChange={text => {
                                this.setState({ inputText: text.target.value });
                            }}
                            value={this.state.inputText}
                            onKeyPress={this._handleKeyPress.bind(this)}
                        />
                        <button
                            className="msg_send_btn"
                            type="button"
                            onClick={() => this.sendChatTest()}
                        >
                            <i
                                className="far fa-paper-plane"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </main>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
