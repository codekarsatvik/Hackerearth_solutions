import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBB53Dv7AW-X9K_dfOHjZUAovuk-oXrkTo",
  authDomain: "hackerearth-soln.firebaseapp.com",
  projectId: "hackerearth-soln",
  storageBucket: "hackerearth-soln.appspot.com",
  messagingSenderId: "954466779338",
  appId: "1:954466779338:web:766aae40a69d71bda2f433",
  measurementId: "G-W5QD5JNT7B"
};

const app=initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const storage = getStorage(app);