import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyASbPDObOysiaBQk2LoTsP1EVoHhxGY7Ks",
  authDomain: "albumapp-9c7a9.firebaseapp.com",
  databaseURL: "https://albumapp-9c7a9.firebaseio.com",
  projectId: "albumapp-9c7a9",
  storageBucket: "albumapp-9c7a9.appspot.com",
  messagingSenderId: "241784260295",
  appId: "1:241784260295:web:37b97abc639a5ed620e0e2"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
