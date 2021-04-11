import { createContext, useState } from "react";
import { logoutUser, checkAuth, getUsername } from "../utils/user";
import { useRouter } from "next/router";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Config
    const router = useRouter()
    // State
    const [user, setUser] = useState({
        username: getUsername(),
        auth: checkAuth()
    });

    // Login updates the user data with a name parameter
    const login = (user) => {
        setUser(() => ({
            username: user.username,
            auth: true,
        }));
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser(() => ({
            username: null,
            auth: false,
        }));
        logoutUser();
        router.replace("/account/signin")
    };

    return (
        <UserContext.Provider
            value={{ user, login, logout }
            }>
            { children}
        </UserContext.Provider>
    );
}