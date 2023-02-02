import { loginWithEmailPass, logoutFirebase, registerUserWithEmailPass, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";

export const checkingAuthentication = ( email, password ) =>{
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( ) =>{
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok )  return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPass = ({ email, password, displayName }) => {

    return  async( dispatch ) => {
        
        dispatch( checkingCredentials() );
        
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPass({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) );
    }
}

export const startLoginWithEmailPass = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPass({ email, password });
        if( !result.ok )  return dispatch( logout( result ) );

        dispatch( login( result ) );
    }
}

export const startLogout = () => {

    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
    }
}