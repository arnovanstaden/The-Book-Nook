import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import nookies from 'nookies';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Config
    const router = useRouter();

    // State
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signUp = async (authData) => {
        const authResult = await auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                const user = { ...result.user }
                auth.currentUser.updateProfile({
                    displayName: authData.displayName
                })
                user.displayName = authData.displayName;
                return user
            })
            .catch((error) => {
                throw error
            });
        return authResult
    }

    const signIn = async (authData) => {
        const authResult = await auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                return result.user
            })
            .catch((error) => {
                throw error
            });
        return authResult
    };

    const signOut = async () => {
        return await auth.signOut()
    };

    const resetPassword = async (email) => {
        return await auth.sendPasswordResetEmail(email)
    }

    // Set user on Auth Change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, []);

    // Set Cookies for SSR
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                nookies.set(undefined, 'TBN-Token', '', { path: '/' });
            } else {
                const token = await user.getIdToken();
                setCurrentUser(user);
                nookies.set(undefined, 'TBN-Token', token, { path: '/' });
            }
        });
    }, []);

    // Context Value
    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword
    }

    return (
        <UserContext.Provider
            value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}