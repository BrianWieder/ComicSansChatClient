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
    state = { shouldShowNewChat: false };

    render() {
        const { classes, user } = this.props;
        const { shouldShowNewChat } = this.state;

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
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 1.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 2.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 3.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 4.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 5.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 6.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 7.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 8.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 9.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 10.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 11.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 12.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 13.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 14.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 15.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 16.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 17.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 18.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 19.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 20.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 21.0'}
                        />
                        <Divider />
                        <ChatListItem
                            onChatItemClicked={() => this.onChatItemClicked()}
                            name={'Bob Saget 22.0'}
                        />
                        <Divider />
                    </List>
                </Drawer>
                {shouldShowNewChat ? this.renderNewChat() : this.renderChat()}
            </div>
        );
    }

    onChatItemClicked() {
        this.setState({ shouldShowNewChat: false });
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
                <NewChat />
            </main>
        );
    }

    renderChat() {
        const { classes } = this.props;

        const containerStr = `${classes.content} main-content`;
        return (
            <main className={containerStr}>
                <div />
                <ChatPanel />
                <div className="type_msg">
                    <div className="input_msg_write">
                        <input
                            type="text"
                            className="write_msg"
                            placeholder="Type a message"
                        />
                        <button className="msg_send_btn" type="button">
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
