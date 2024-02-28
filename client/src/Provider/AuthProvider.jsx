import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../hooks/UseAxiosPublic";


// provider
export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        displayName: ""
    });
    const [loading, setLoading] = useState(true)
    const axiosPublic = UseAxiosPublic();


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
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    console.log(res.data.token);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                }) 
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false)
            }
        })
        return () => {
            return unSubscribe()
        }
    }, [axiosPublic])

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