import axios from "axios";
import { IAuthenticationData } from "./interfaces";
import Cookies from "cookie"

export const getCookie = (name: string): string => {
    if (typeof window !== 'undefined') {
        const cookies = Cookies.parse(document.cookie)
        return cookies[name]
    }
}

export const getUsername = (type?: string): string => {
    let username = "";
    if (typeof window !== 'undefined') {
        username = localStorage.getItem("TBN-Username");
    }

    if (type === "possessive") {
        if (username.substr(username.length - 1, 1) === "s") {
            return `${username}'`
        }
        return `${username}'s`
    }

    return username
}

export const authenticateUser = async (authData: IAuthenticationData, signUp: boolean) => {
    const authResult = await axios({
        method: "POST",
        url: "/api/user",
        data: {
            ...authData,
            signUp: signUp
        }
    })
        .then(result => {
            // Save Credentials
            document.cookie = `TBN-Token=${result.data.token};path=/;Max-Age=43200;Secure;SameSite=Strict`;
            localStorage.setItem("TBN-Username", result.data.user.username);
            return result.data
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return authResult
}

export const logoutUser = () => {
    localStorage.clear();
    let tokenCookie = getCookie("TBN-Token");
    document.cookie = `TBN-Token=${tokenCookie}; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/`
}

export const checkAuth = (): boolean => {
    const loggedIn = getCookie("TBN-Token");
    if (!loggedIn) {
        return false
    }
    return true
}
