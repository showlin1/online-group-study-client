

import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";
import toast from "react-hot-toast";




export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
        
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            console.log('user in the auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false);

            //if user exists then issue a token
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('token response', res.data)
                    })
            }
            else {
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const handleGoogleSignIn = () => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
                toast.success('Login Successfully')
            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleGithubSignIn = () => {
        setLoading(true);
        signInWithPopup(auth, githubProvider)
            .then(result => {
                console.log(result.user)
                toast.success('Login Successfully')
            })
            .catch(error => {
                console.error(error);
            })
    }

    const authInfo = {
        user,
        loading,
        createUser,
        handleGoogleSignIn,
        handleGithubSignIn,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;