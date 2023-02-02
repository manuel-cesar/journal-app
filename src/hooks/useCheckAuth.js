import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
      
      const auth = getAuth();
      onAuthStateChanged( auth, ( user ) => {
        console.log(user);
        if( !user ) return dispatch( logout({ status}) );
  
        const { uid, email, displayName, photoURL } = user;
        
        dispatch( login({ uid, email, displayName, photoURL }) );
      });
  
    }, []);

    return status;
}
