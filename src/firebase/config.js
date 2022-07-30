import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDEHY-O0NAFZm7izVzUGNdMe-ShUEwjuZM",
  authDomain: "clone-7d40c.firebaseapp.com",
  projectId: "clone-7d40c",
  storageBucket: "clone-7d40c.appspot.com",
  messagingSenderId: "501685416287",
  appId: "1:501685416287:web:533ef5f7279cf178d2c6ea",
};

//Initialize firebase
initializeApp(firebaseConfig);

//db ref
export let db = getFirestore();

//auth ref
export let auth = getAuth();
