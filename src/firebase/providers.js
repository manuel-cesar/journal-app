import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            //User Info
            displayName, email, photoURL, uid,
        }
    }
    catch( error ) {

        const errorCode = error.code;
        const errorMessage = error.message;
        // //The email of the users account used.
        // const email = error.customData.email;
        // //The AuthCredential type that was sued.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorMessage, errorCode,

        }
    }
}

export const registerUserWithEmailPass = async ({ email, password, displayName })=> {

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //Actualizar displayname en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName,
        }

    }
    catch(error) {
        return{ ok: false, errorMessage: error.message }
    }
}


export const loginWithEmailPass = async({ email, password }) => {

    signInWithEmailAndPassword

    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName,
        }

    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage, errorCode,
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}