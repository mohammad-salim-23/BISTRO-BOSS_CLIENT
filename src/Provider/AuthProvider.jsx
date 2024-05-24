import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createUser=(email,password)=>{
         setLoading(true);
         return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile=(profile)=>{
      return  updateProfile(auth.currentUser,profile)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{

            setUser(currentUser);
            if(currentUser){
            //  get token and store client
            }
            else{
                // TODO: remove token (if token stored in the client side:Local Storage, caching,in memory)
            }
            setLoading(false);
        });
        return ()=>{
            return unSubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }
    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;