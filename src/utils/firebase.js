 import firebase from 'firebase'
// import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAOP2Mzsko0WjSEP0heA_9k_VXqgyP24o0",
    authDomain: "firefly-chatb0t.firebaseapp.com",
    databaseURL: "https://firefly-chatb0t-default-rtdb.firebaseio.com",
    projectId: "firefly-chatb0t",
    storageBucket: "firefly-chatb0t.appspot.com",
    messagingSenderId: "416267685090",
    appId: "1:416267685090:web:4cd43dbac93272c1ac62bb",
    measurementId: "G-KDNK4N0L4W"
});

var db = firebaseApp.firestore();
var storage = firebase.storage();
export default storage;
export { db };