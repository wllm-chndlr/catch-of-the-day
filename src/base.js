import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCMWG0qFiRbtQyX8H6IR9w3hO8Er3W6edQ",
    authDomain: "catch-of-the-day-wchandler.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-wchandler.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;