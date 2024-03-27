// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyIZjL_vchG75l76n0A0jYf3pjJ8F8zGE",
    authDomain: "link-management-server.firebaseapp.com",
    projectId: "link-management-server",
    storageBucket: "link-management-server.appspot.com",
    messagingSenderId: "46548268868",
    appId: "1:46548268868:web:c7423e61af1a8052708911"
};

// Initialize Firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { firebaseConfig, app }