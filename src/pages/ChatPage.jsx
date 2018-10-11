import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import firebase from '../util/firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ChatListItem from '../components/ChatListItem';
import ChatPanel from '../components/ChatPanel';
import { Button } from '@material-ui/core';

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
    render() {
        const { classes, user } = this.props;

        const containerStr = `${classes.content} main-content`;

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
                            {user.email}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <List>
                        <ChatListItem />
                        <Divider />
                        <ChatListItem />
                        <Divider />
                        <ChatListItem />
                        <Divider />
                        <ChatListItem />
                        <Divider />
                        <ChatListItem />
                        <Divider />
                        <ChatListItem />
                        <Divider />
                    </List>
                </Drawer>
                <main className={containerStr}>
                    <div />
                    <ChatPanel />
                </main>
            </div>
        );
    }

    signOut() {
        firebase.auth().signOut();
    }

    navigateToLogin() {
        this.props.history.push('/Login');
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
