// AuthContext - Manages authentication state across the app
// TODO: Implement authentication context provider 
import React, { useContext, useState, useEffect} from "react";
import {auth} from "/src/firebase/firebase.js"
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user){
        if (user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }
    
    const value = {
        currentUser,
        userLoggedIn,
        setUserLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}