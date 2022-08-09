import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyB7eoylJmHyS-9xrsJlSLb_TyzfZmoPVbc",
    authDomain: "newstube-d729e.firebaseapp.com",
    projectId: "newstube-d729e",
    storageBucket: "newstube-d729e.appspot.com",
    messagingSenderId: "96256845956",
    appId: "1:96256845956:web:733746782a95111357fad1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://newstube-d729e.appspot.com")

export default storage