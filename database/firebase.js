import * as firebase from "firebase";

/*
const firebaseConfig = {
    apiKey: "AIzaSyCoffKnW9bllzuaaWlYix_0LuNdBfZ3Lp0",
    authDomain: "logintest-72c0c.firebaseapp.com",
    projectId: "logintest-72c0c",
    storageBucket: "logintest-72c0c.appspot.com",
    messagingSenderId: "842023553604",
    appId: "1:842023553604:web:117c285836cd28136c0a11",
    measurementId: "G-EQZG991295"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyBVJemfjD5-wOxFiT9TfeXHqFBAAnYUZM0",
  authDomain: "filmapp-bb7d3.firebaseapp.com",
  databaseURL: "https://filmapp-bb7d3.firebaseio.com",
  projectId: "filmapp-bb7d3",
  storageBucket: "filmapp-bb7d3.appspot.com",
  messagingSenderId: "643933918059",
  appId: "1:643933918059:web:2c716c24ed6c0ad039722e",
};

/*try {
  firebase.initializeApp({
    apiKey: "AIzaSyBVJemfjD5-wOxFiT9TfeXHqFBAAnYUZM0",
    authDomain: "filmapp-bb7d3.firebaseapp.com",
    databaseURL: "https://filmapp-bb7d3.firebaseio.com",
    projectId: "filmapp-bb7d3",
    storageBucket: "filmapp-bb7d3.appspot.com",
    messagingSenderId: "643933918059",
    appId: "1:643933918059:web:2c716c24ed6c0ad039722e",
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error raised", err.stack);
  }
}
const firebaseApp = firebase;*/

firebase.initializeApp(firebaseConfig);

export default firebase;
