import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyDEHY-O0NAFZm7izVzUGNdMe-ShUEwjuZM",
//   authDomain: "clone-7d40c.firebaseapp.com",
//   projectId: "clone-7d40c",
//   storageBucket: "clone-7d40c.appspot.com",
//   messagingSenderId: "501685416287",
//   appId: "1:501685416287:web:533ef5f7279cf178d2c6ea",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCpz7N83mSb4Rop6a6WvgVb3DZo8bCcZ8E",
  authDomain: "fir-92dfa.firebaseapp.com",
  projectId: "fir-92dfa",
  storageBucket: "fir-92dfa.appspot.com",
  messagingSenderId: "943817146627",
  appId: "1:943817146627:web:810503725eb277d60aa936",
  measurementId: "G-4VFHKVQL68",
};
//Initialize firebase
export let app = initializeApp(firebaseConfig);
//db ref
export let db = getFirestore();

//auth ref
export let auth = getAuth();

export let storage = getStorage(app);
