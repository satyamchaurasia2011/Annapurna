import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBYLRhmoHvhSUcZ2ljs90w8gDXLNHBW964",
  authDomain: "annapurna-restaurent.firebaseapp.com",
  projectId: "annapurna-restaurent",
  storageBucket: "annapurna-restaurent.appspot.com",
  messagingSenderId: "1018831092944",
  appId: "1:1018831092944:web:c9e74e116ae2f72452f2d5",
};

// const app = !firebase.apps.length
//   ? initializeApp(firebaseConfig)
//   : firebase.app();
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
export { auth, app,  db };