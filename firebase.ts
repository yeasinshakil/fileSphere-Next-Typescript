// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGiWry8Vbpx9buE6nOz9JeoJtV34_xPVE",
    authDomain: "dropbox-clone-cdb51.firebaseapp.com",
    projectId: "dropbox-clone-cdb51",
    storageBucket: "dropbox-clone-cdb51.appspot.com",
    messagingSenderId: "19314507576",
    appId: "1:19314507576:web:fa7f98eb76ad789c94cbcd"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }