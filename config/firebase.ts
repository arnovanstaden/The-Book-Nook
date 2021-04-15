import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// Authentication
let firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();

export default app;
export const auth = firebase.auth();
export const db = firebase.firestore();

// 
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const images = storageRef.child('image');
export const userProfileRef = storageRef.child('image/users');
export const clubsProfileRef = storageRef.child('image/clubs');



