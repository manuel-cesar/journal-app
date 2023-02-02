// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// import { get } from "immer/dist/internal";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbohAzC-3XUG0Wp7B4llZfVM4RJfAeUN8",
  authDomain: "react-cursos-f9ea7.firebaseapp.com",
  projectId: "react-cursos-f9ea7",
  storageBucket: "react-cursos-f9ea7.appspot.com",
  messagingSenderId: "486531687845",
  appId: "1:486531687845:web:dcd3957f152cd1f38cb44c"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );