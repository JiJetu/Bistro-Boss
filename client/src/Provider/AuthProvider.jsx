import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext();
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState({
        displayName: ""
    });
    const [loading, setLoading] = useState(true)

    // create an account for user
    const createUser = (name, email, password) => {
        setLoading(true)

        return createUserWithEmailAndPassword(auth, email, password);
    }

    // logIn user with email and password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update profile
    const profileUpdate = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // Authenticate Using Google / signIn using google
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    // logout user
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // manage user for state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log("current user", currentUser);
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        profileUpdate,
        signIn,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;