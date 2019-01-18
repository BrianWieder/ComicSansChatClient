import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    Card,
    Button,
    TextField
} from '@material-ui/core';

import firebase from '../util/firebase';
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

const stylesCard = {
    cardStyle: {
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: 500,
        paddingTop: 10,
        paddingBottom: 10
    },
    divStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    buttonStyle: {
        marginTop: 10
    },
    errorStyle: {
        color: 'red',
        marginBottom: 10
    }
};

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        name: '',
        profilePicture: '',
        signUpScreen: false
    };

    render() {
        const { classes } = this.props;

        if (Object.keys(this.props.user).length > 0) {
            this.props.history.push('/');
        }

        const containerStr = `${classes.content} main-content`;
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <main className={containerStr}>
                    <div className={classes.toolbar} />
                    <div style={stylesCard.divStyle}>
                        {this.renderContent()}
                    </div>
                </main>
            </div>
        );
    }

    renderContent() {
        var errorMsg =
            this.state.error !== '' && this.state.error !== undefined ? (
                <p style={stylesCard.errorStyle}>{this.state.error}</p>
            ) : null;
        if (!this.state.signUpScreen) {
            return (
                <Card style={stylesCard.cardStyle}>
                    <Typography variant="headline" component="h3">
                        Please Sign In
                    </Typography>
                    <TextField
                        id="email-input"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        value={this.state.email}
                        error={this.state.error !== ''}
                        onChange={event =>
                            this.emailChanged(event.target.value)
                        }
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="password"
                        margin="normal"
                        fullWidth
                        value={this.state.password}
                        error={this.state.error !== ''}
                        onChange={event =>
                            this.passwordChanged(event.target.value)
                        }
                    />
                    {errorMsg}
                    <div>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.signIn.bind(this)}
                            style={{
                                ...stylesCard.buttonStyle,
                                flex: 1,
                                float: 'right'
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.signUpScreen.bind(this)}
                            style={{ ...stylesCard.buttonStyle, float: 'left' }}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Card>
            );
        } else {
            return (
                <Card style={stylesCard.cardStyle}>
                    <Typography variant="headline" component="h3">
                        Please Sign Up
                    </Typography>
                    <TextField
                        id="email-input"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        fullWidth
                        value={this.state.email}
                        error={this.state.error !== ''}
                        onChange={event =>
                            this.emailChanged(event.target.value)
                        }
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="password"
                        margin="normal"
                        fullWidth
                        value={this.state.password}
                        error={this.state.error !== ''}
                        onChange={event =>
                            this.passwordChanged(event.target.value)
                        }
                    />
                    <TextField
                        id="password-input"
                        label="Name"
                        type="text"
                        autoComplete="name"
                        margin="normal"
                        fullWidth
                        value={this.state.name}
                        error={this.state.error !== ''}
                        onChange={event => this.nameChanged(event.target.value)}
                    />
                    <TextField
                        id="password-input"
                        label="Profile Picture"
                        type="text"
                        margin="normal"
                        fullWidth
                        value={this.state.profilePicture}
                        error={this.state.error !== ''}
                        onChange={event =>
                            this.profilePictureChanged(event.target.value)
                        }
                    />
                    {errorMsg}
                    <div>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.signUp.bind(this)}
                            style={{
                                ...stylesCard.buttonStyle,
                                flex: 1,
                                float: 'right'
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.loginScreen.bind(this)}
                            style={{ ...stylesCard.buttonStyle, float: 'left' }}
                        >
                            Log In
                        </Button>
                    </div>
                </Card>
            );
        }
    }

    emailChanged(email) {
        this.setState({
            email
        });
    }

    passwordChanged(password) {
        this.setState({ password });
    }

    nameChanged(name) {
        this.setState({ name });
    }

    profilePictureChanged(profilePicture) {
        this.setState({ profilePicture });
    }

    signIn() {
        const { email, password } = this.state;

        if (email === '' || email === undefined) {
            this.setState({ error: 'Email is required' });
            return;
        }

        if (password === '' || password === undefined) {
            this.setState({ error: 'Password is required' });
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                var errorMessage = error.message;
                this.setState({ error: errorMessage });
            });
    }

    signUp() {
        const { email, password, name, profilePicture } = this.state;

        if (email === '' || email === undefined) {
            this.setState({ error: 'Email is required' });
            return;
        }

        if (password === '' || password === undefined) {
            this.setState({ error: 'Password is required' });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .auth()
                    .currentUser.getIdToken(true)
                    .then(token => {
                        fetch(`${BASE_URL}/api/users`, {
                            method: 'POST',
                            body: JSON.stringify({
                                name,
                                profile_picture: profilePicture
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: token
                            }
                        });
                    });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    signUpScreen() {
        this.setState({ signUpScreen: true, error: '' });
    }

    loginScreen() {
        this.setState({ signUpScreen: false, error: '' });
    }
}

export default withStyles(styles)(LoginPage);
