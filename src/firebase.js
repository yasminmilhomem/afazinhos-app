import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_CREDENTIAL_APIKEY,
  authDomain: import.meta.env.VITE_CREDENTIAL_AUTHDOMAIN,
  projectId: import.meta.env.VITE_CREDENTIAL_PROJECTID,
  storageBucket: import.meta.env.VITE_CREDENTIAL_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_CREDENTIAL_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_CREDENTIAL_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



