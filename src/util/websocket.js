import firebase from '../util/firebase';
import { BASE_URL } from './settings';
let socket = {};

let chat_callback = function() {};

export const socketConnect = () => {
    firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(token => {
            socket = require('socket.io-client')(`${BASE_URL}`, {
                query: { token }
            });
            socket.on('connect', function() {
                console.log('connected!');
            });
            socket.on('disconnect', function() {});
            socket.on('chat', function(msg) {
                console.log('CHAT!');
                console.log(msg);
                chat_callback(msg);
            });
        });
};

export const setupChatCallback = callback => {
    chat_callback = callback;
};

export const sendChat = (chat_id, message) => {
    socket.emit('chat', { chat_id, message });
};
