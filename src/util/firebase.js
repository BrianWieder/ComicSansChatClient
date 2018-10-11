import firebase from 'firebase';
var config = {
    apiKey: 'AIzaSyB7780W1NWElLt08G9K8AxakK29ocEVwNs',
    authDomain: 'independent-studies-2018-2019.firebaseapp.com',
    databaseURL: 'https://independent-studies-2018-2019.firebaseio.com',
    projectId: 'independent-studies-2018-2019',
    storageBucket: 'independent-studies-2018-2019.appspot.com',
    messagingSenderId: '523918752724'
};
var fire = firebase.initializeApp(config);
export default fire;
