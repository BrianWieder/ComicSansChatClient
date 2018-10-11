import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from './util/firebase';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

class App extends Component {
    state = {
        user: {}
    };
    render() {
        return (
            <Router>
                <div>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <ChatPage {...props} user={this.state.user} />
                        )}
                    />
                    <Route
                        path="/login"
                        render={props => (
                            <LoginPage {...props} user={this.state.user} />
                        )}
                    />
                </div>
            </Router>
        );
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
                this.setState({ user });
            } else {
                // User is signed out.
                // ...
                this.setState({ user: {} });
            }
        });
    }
}

export default App;
